/**
 * Formats various image link formats (including Google Drive sharing links)
 * into high-reliability direct image CDN URLs.
 */
export function getDirectImageUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Match Google Drive file ID from various sharing formats:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?id=FILE_ID
  const driveFileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = driveFileMatch?.[1] || driveIdMatch?.[1];

  if (fileId) {
    // Google CDN direct render format (fast, bypasses download warnings)
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

export function getDriveFallbackUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  const driveFileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = driveFileMatch?.[1] || driveIdMatch?.[1];

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return trimmed;
}

/**
 * Format bytes into human-readable file size (KB / MB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Compresses and converts an image file selected from the user's hard drive
 * into an optimized Data URL.
 * Automatically scales down massive camera photos (e.g. 5-15MB) to max 1600px,
 * ensuring high retina sharpness while keeping the document size well under Firestore's 1MB limit.
 */
export async function processImageFromFile(file: File, maxDimension = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    // For SVGs, read directly as Data URL
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data URL if canvas cannot parse
        resolve(readerEvent.target?.result as string);
      };
      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale dimensions proportionally if larger than maxDimension
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve(readerEvent.target?.result as string);
            return;
          }

          // Draw the image
          ctx.drawImage(img, 0, 0, width, height);

          // Determine optimal export format
          // If PNG and small, keep PNG or WebP to preserve transparent backgrounds
          const isPng = file.type === 'image/png';
          
          if (isPng) {
            try {
              const webpData = canvas.toDataURL('image/webp', quality);
              if (webpData.startsWith('data:image/webp')) {
                resolve(webpData);
                return;
              }
            } catch {
              // Ignore and fallback
            }
            resolve(canvas.toDataURL('image/png'));
            return;
          }

          // Default for photos: WebP (best compression) or JPEG
          try {
            const webpData = canvas.toDataURL('image/webp', quality);
            if (webpData.startsWith('data:image/webp') && webpData.length < (readerEvent.target?.result as string).length) {
              resolve(webpData);
              return;
            }
          } catch {
            // Ignore
          }

          const jpegData = canvas.toDataURL('image/jpeg', quality);
          resolve(jpegData);
        } catch {
          // Fallback to raw data URL if any canvas operation fails
          resolve(readerEvent.target?.result as string);
        }
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
