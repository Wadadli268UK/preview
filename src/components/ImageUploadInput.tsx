import React, { useState, useRef } from 'react';
import { 
  Upload, 
  HardDrive, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  RefreshCw, 
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';
import { getDirectImageUrl, getDriveFallbackUrl, processImageFromFile, formatFileSize } from '../utils/imageUtils';

export interface ImageUploadInputProps {
  id?: string;
  label?: string;
  sublabel?: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  required?: boolean;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  helperText?: string;
  compact?: boolean;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  id,
  label,
  sublabel,
  value,
  onChange,
  placeholder = 'Paste Google Drive link, direct image URL, or upload from your computer',
  required = false,
  aspectRatio = 'auto',
  helperText,
  compact = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ filename: string; originalSize: string; compressedSize: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if current value is a Data URL uploaded from hard drive
  const isLocalDataUrl = value?.startsWith('data:image/');

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WebP, SVG).');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setImageError(false);

    try {
      const originalBytes = file.size;
      const optimizedDataUrl = await processImageFromFile(file);
      
      // Calculate approximate size of base64 data
      const base64Length = optimizedDataUrl.length - (optimizedDataUrl.indexOf(',') + 1);
      const approximateBytes = Math.ceil(base64Length * 0.75);

      onChange(optimizedDataUrl);
      setUploadStatus({
        filename: file.name,
        originalSize: formatFileSize(originalBytes),
        compressedSize: formatFileSize(approximateBytes),
      });
    } catch (err) {
      console.error('Failed to process image file:', err);
      setErrorMessage('Failed to read and process image file from hard drive.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
    // Reset file input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClear = () => {
    onChange('');
    setUploadStatus(null);
    setErrorMessage(null);
    setImageError(false);
  };

  const directImageUrl = getDirectImageUrl(value);
  const fallbackUrl = getDriveFallbackUrl(value);

  return (
    <div className="space-y-2 font-sans" id={id ? `${id}-container` : undefined}>
      {/* Label and Sublabel */}
      {(label || sublabel) && (
        <div className="flex items-center justify-between">
          <div>
            {label && (
              <label 
                htmlFor={id} 
                className="block font-semibold text-[#4A4036] text-xs"
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            )}
            {sublabel && (
              <p className="text-[11px] text-[#7A6F64]">{sublabel}</p>
            )}
          </div>
          {isLocalDataUrl && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
              <HardDrive className="w-3 h-3 text-emerald-600" />
              <span>Loaded from Hard Drive</span>
            </span>
          )}
        </div>
      )}

      {/* Main Upload / Input Box */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg border transition-all ${
          isDragging 
            ? 'border-[#2C2723] bg-[#EFE9DF] ring-2 ring-[#2C2723]/20' 
            : 'border-[#D0C5B4] bg-white'
        } ${compact ? 'p-2.5' : 'p-3'}`}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileInputChange}
          className="hidden"
          id={id ? `${id}-file-input` : undefined}
        />

        {/* Primary Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Upload Button */}
          <button
            type="button"
            id={id ? `${id}-upload-btn` : undefined}
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="shrink-0 px-3.5 py-2 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E8DCC4]" />
                <span>Optimizing file...</span>
              </>
            ) : (
              <>
                <HardDrive className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <span className="font-semibold">Upload from Computer</span>
                <Upload className="w-3 h-3 opacity-70" />
              </>
            )}
          </button>

          {/* Text input for URL or Google Drive link */}
          <div className="relative grow flex items-center">
            <input
              id={id}
              type="text"
              required={required && !value}
              value={isLocalDataUrl ? '(Image uploaded from hard drive)' : value}
              placeholder={placeholder}
              onChange={(e) => {
                setImageError(false);
                setUploadStatus(null);
                onChange(e.target.value);
              }}
              readOnly={isLocalDataUrl}
              className={`w-full py-1.5 pl-8 pr-8 text-xs rounded border transition-colors ${
                isLocalDataUrl 
                  ? 'bg-[#FAF8F5] text-emerald-800 font-medium italic border-emerald-200 cursor-default' 
                  : 'bg-[#FAF8F5]/60 focus:bg-white border-[#E0D7C9] text-[#2C2723] font-mono text-[11px]'
              }`}
            />
            <div className="absolute left-2.5 text-[#8A7F73] pointer-events-none">
              {isLocalDataUrl ? (
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <LinkIcon className="w-3.5 h-3.5" />
              )}
            </div>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 text-[#8A7F73] hover:text-[#1F1B18] p-1 rounded-full hover:bg-gray-200/60 transition-colors"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dropzone Hint & Drag Status */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#7A6F64] px-1">
          <span className="flex items-center gap-1">
            <span>Or drag & drop photo here</span>
            <span className="text-[#A89E93]">• Supports JPEG, PNG, WebP (auto-optimized for web)</span>
          </span>
          {uploadStatus && (
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{uploadStatus.filename} ({uploadStatus.compressedSize})</span>
            </span>
          )}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-[11px] flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Live Preview Bar if Image is Loaded */}
        {value && (
          <div className="mt-3 pt-3 border-t border-[#EAE3D5] flex items-center gap-3">
            <div className={`rounded-md bg-[#FAF8F5] overflow-hidden border border-[#D0C5B4] shadow-xs shrink-0 flex items-center justify-center ${
              aspectRatio === 'banner' ? 'w-28 h-14' : 
              aspectRatio === 'square' ? 'w-14 h-14' : 
              'w-20 h-14'
            }`}>
              {!imageError ? (
                <img
                  src={directImageUrl}
                  alt="Selected upload preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl;
                    } else {
                      setImageError(true);
                    }
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#8A7F73] text-[9px] p-1 text-center">
                  <ImageIcon className="w-4 h-4 mb-0.5 opacity-50" />
                  <span>Preview unavail</span>
                </div>
              )}
            </div>

            <div className="grow text-[11px] space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 font-medium text-[#2C2723]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">
                  {isLocalDataUrl 
                    ? (uploadStatus?.filename || 'Uploaded image file ready to save') 
                    : 'External Image URL ready'}
                </span>
              </div>
              <p className="text-[#7A6F64] text-[10px] truncate">
                {isLocalDataUrl 
                  ? `Optimized for fast loading & stored directly in your database` 
                  : (value.length > 50 ? `${value.substring(0, 50)}...` : value)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-[#4A4036] hover:text-[#1F1B18] bg-[#EFE9DF] hover:bg-[#E2D8C9] rounded border border-[#D9CFBF] transition-colors"
            >
              Replace
            </button>
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-[11px] text-[#7A6F64] px-0.5">{helperText}</p>
      )}
    </div>
  );
};
