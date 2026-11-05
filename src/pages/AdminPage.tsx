import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Product, 
  MadeToOrderProduct,
  PortfolioProject, 
  UpholsteryEnquiry, 
  FAQItem, 
  EnquiryStatus, 
  ProductCategory, 
  ProductAvailability,
  SiteSettings
} from '../types';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { isProductActive, isMadeToOrderActive } from '../utils/productUtils';
import { ImageUploadInput } from '../components/ImageUploadInput';
import { 
  Package, 
  Layers, 
  MessageSquareText, 
  Settings, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Image as ImageIcon, 
  Phone, 
  Mail, 
  Cloud, 
  CloudCheck, 
  Globe, 
  Sparkles, 
  HelpCircle, 
  ExternalLink,
  UploadCloud,
  FileText,
  Clock,
  MapPin,
  Lock,
  LogOut,
  ShieldCheck,
  Key,
  UserCheck,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Ruler,
  Tag,
  HardDrive,
  Upload,
  Copy,
  CheckCircle2,
  Search,
  Scissors
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    toggleProductActive,
    togglePastUpholstery,
    madeToOrderProducts,
    addMadeToOrderProduct,
    updateMadeToOrderProduct,
    deleteMadeToOrderProduct,
    toggleMadeToOrderProductActive,
    portfolioProjects, 
    addPortfolioProject, 
    updatePortfolioProject, 
    deletePortfolioProject,
    enquiries, 
    updateEnquiryStatus, 
    updateEnquiryNotes, 
    deleteEnquiry,
    faqs, 
    addFAQ, 
    updateFAQ, 
    deleteFAQ,
    settings, 
    updateSettings,
    analyticsEvents,
    isFirestoreConnected,
    isSyncing,
    syncAllToFirestore,
    setCurrentPage,
    isAdminAuthenticated,
    adminUser,
    adminLogout,
    updateStudioPasscode
  } = useApp();

  const [newPasscode, setNewPasscode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'content' | 'products' | 'past_upholstery' | 'made_to_order' | 'portfolio' | 'enquiries' | 'faqs' | 'analytics'>('content');

  // Shop Catalog Filtering & Search
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'active' | 'deactivated' | 'past_upholstery'>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');

  const filteredCatalogProducts = useMemo(() => {
    return products.filter((p) => {
      const active = isProductActive(p);
      if (catalogFilter === 'past_upholstery') {
        if (!p.isPastUpholstery) return false;
      } else {
        if (p.isPastUpholstery) return false;
        if (catalogFilter === 'active' && !active) return false;
        if (catalogFilter === 'deactivated' && active) return false;
      }
      if (catalogSearch.trim()) {
        const query = catalogSearch.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(query);
        const matchesCat = p.category?.toLowerCase().includes(query);
        const matchesFabric = p.fabricAndWeave?.toLowerCase().includes(query) || p.fabric?.toLowerCase().includes(query);
        const matchesColour = p.colourPalette?.toLowerCase().includes(query) || p.colour?.toLowerCase().includes(query);
        return Boolean(matchesTitle || matchesCat || matchesFabric || matchesColour);
      }
      return true;
    });
  }, [products, catalogFilter, catalogSearch]);

  // Made to Order Filtering & Search
  const [mtoFilter, setMtoFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [mtoSearch, setMtoSearch] = useState<string>('');
  const [mtoCollectionTab, setMtoCollectionTab] = useState<string>('all');

  const getMtoCollectionKey = (p: MadeToOrderProduct): string => {
    const cat = (p.category || '').toLowerCase().trim();
    const name = (p.productName || '').toLowerCase().trim();
    const code = (p.productCode || '').toLowerCase().trim();

    // 1. Footstool Collection: explicitly mentions footstool or FS code
    if (name.includes('footstool') || code.includes('-fs-') || code.startsWith('fs') || cat === 'footstool collection' || (cat.includes('footstool') && !name.includes('bench') && !name.includes('ottoman'))) {
      return 'Footstool Collection';
    }

    // 2. Pouffe Collection: mentions pouffe or cylinder or PF code
    if (cat.includes('pouffe') || name.includes('pouffe') || name.includes('cylinder') || code.includes('-pf-') || code.startsWith('pf') || cat === 'pouffes & cylinders') {
      return 'Pouffe Collection';
    }

    // 3. Pet Collection: mentions pet, dog, cat or PC code
    if (cat.includes('pet') || name.includes('pet') || name.includes('dog') || name.includes('cat') || code.includes('-pc-') || code.startsWith('pc') || cat === 'pet furniture') {
      return 'Pet Collection';
    }

    // 4. Ottoman & Bench Collection: mentions ottoman, bench or OT code
    if (name.includes('ottoman') || name.includes('bench') || code.includes('-ot-') || code.startsWith('ot') || cat.includes('bench') || cat === 'ottomans & benches' || (cat.includes('ottoman') && !cat.includes('footstool'))) {
      return 'Ottoman & Bench Collection';
    }

    if (p.category && p.category.trim()) {
      return p.category.trim();
    }
    return 'Footstool Collection';
  };

  const filteredMtoProducts = useMemo(() => {
    return madeToOrderProducts.filter((p) => {
      const active = isMadeToOrderActive(p);
      if (mtoFilter === 'active' && !active) return false;
      if (mtoFilter === 'deactivated' && active) return false;
      if (mtoSearch.trim()) {
        const query = mtoSearch.toLowerCase();
        const matchesName = p.productName?.toLowerCase().includes(query);
        const matchesCode = p.productCode?.toLowerCase().includes(query);
        const matchesDesc = p.productDescription?.toLowerCase().includes(query);
        const matchesSize = p.size?.toLowerCase().includes(query);
        const matchesDimensions = p.finishedDimensions?.toLowerCase().includes(query);
        const matchesLegs = p.legOptions?.toLowerCase().includes(query);
        return Boolean(matchesName || matchesCode || matchesDesc || matchesSize || matchesDimensions || matchesLegs);
      }
      return true;
    });
  }, [madeToOrderProducts, mtoFilter, mtoSearch]);

  const mtoCollectionCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'all': madeToOrderProducts.length,
      'Footstool Collection': 0,
      'Pouffe Collection': 0,
      'Ottoman & Bench Collection': 0,
      'Pet Collection': 0,
    };
    madeToOrderProducts.forEach((p) => {
      const key = getMtoCollectionKey(p);
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [madeToOrderProducts]);

  const groupedMtoCollections = useMemo(() => {
    const groupsMap = new Map<string, MadeToOrderProduct[]>();

    const orderedKeys = [
      'Footstool Collection',
      'Pouffe Collection',
      'Ottoman & Bench Collection',
      'Pet Collection'
    ];

    filteredMtoProducts.forEach((p) => {
      const key = getMtoCollectionKey(p);
      if (!groupsMap.has(key)) {
        groupsMap.set(key, []);
      }
      groupsMap.get(key)!.push(p);
    });

    const result: { key: string; title: string; count: number; items: MadeToOrderProduct[] }[] = [];

    orderedKeys.forEach((key) => {
      const items = groupsMap.get(key) || [];
      if (items.length > 0 || mtoCollectionTab === key) {
        result.push({
          key,
          title: key,
          count: items.length,
          items
        });
      }
      groupsMap.delete(key);
    });

    groupsMap.forEach((items, key) => {
      if (items.length > 0 || mtoCollectionTab === key) {
        result.push({
          key,
          title: key,
          count: items.length,
          items
        });
      }
    });

    if (mtoCollectionTab !== 'all') {
      return result.filter((g) => g.key === mtoCollectionTab);
    }

    return result;
  }, [filteredMtoProducts, mtoCollectionTab]);

  const [showQuickUploaderModal, setShowQuickUploaderModal] = useState(false);
  const [quickUploadedImage, setQuickUploadedImage] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const [contentForm, setContentForm] = useState<SiteSettings>(settings);
  useEffect(() => {
    setContentForm(settings);
  }, [settings]);

  // Made to Order Product Form State
  const [editingMadeToOrderId, setEditingMadeToOrderId] = useState<string | null>(null);
  const [showMadeToOrderModal, setShowMadeToOrderModal] = useState(false);
  const [madeToOrderForm, setMadeToOrderForm] = useState<Omit<MadeToOrderProduct, 'id' | 'createdAt'>>({
    productName: '',
    productDescription: '',
    productCode: '',
    size: '',
    finishedDimensions: '',
    legOptions: 'Turned Oak, Stained Walnut, Tapered Brass',
    imageUrl: '/images/made_to_order_hero.png',
    startingPrice: 'From £295',
    leadTime: '3–4 Weeks',
    category: 'Footstools & Ottomans',
    isActive: true,
  });

  const handleOpenNewMadeToOrder = (presetCollection?: string) => {
    setEditingMadeToOrderId(null);
    let defaultCat = 'Footstool Collection';
    let codePrefix = 'FS';
    let defaultSize = 'Medium (90 x 60 cm)';

    if (presetCollection === 'Pouffe Collection' || presetCollection?.toLowerCase().includes('pouffe')) {
      defaultCat = 'Pouffe Collection';
      codePrefix = 'PF';
      defaultSize = 'Standard Round (48 cm diameter)';
    } else if (presetCollection === 'Ottoman & Bench Collection' || presetCollection?.toLowerCase().includes('bench') || presetCollection?.toLowerCase().includes('ottoman')) {
      defaultCat = 'Ottoman & Bench Collection';
      codePrefix = 'OT';
      defaultSize = 'Grand (120 x 45 cm)';
    } else if (presetCollection === 'Pet Collection' || presetCollection?.toLowerCase().includes('pet')) {
      defaultCat = 'Pet Collection';
      codePrefix = 'PC';
      defaultSize = 'Pet Standard (70 x 45 cm)';
    }

    setMadeToOrderForm({
      productName: '',
      productDescription: '',
      productCode: `MTO-${codePrefix}-${Math.floor(100 + Math.random() * 900)}`,
      size: defaultSize,
      finishedDimensions: '',
      legOptions: 'Turned English Oak, Smoked Walnut, Brass Tapered Ferrule, Raw Beech',
      imageUrl: '/images/made_to_order_hero.png',
      startingPrice: 'From £295',
      leadTime: '3–4 Weeks',
      category: defaultCat,
      isActive: true,
    });
    setShowMadeToOrderModal(true);
  };

  const handleEditMadeToOrder = (item: MadeToOrderProduct) => {
    setEditingMadeToOrderId(item.id);
    const resolvedCat = getMtoCollectionKey(item);
    setMadeToOrderForm({
      productName: item.productName,
      productDescription: item.productDescription,
      productCode: item.productCode,
      size: item.size,
      finishedDimensions: item.finishedDimensions,
      legOptions: item.legOptions,
      imageUrl: item.imageUrl || '',
      startingPrice: item.startingPrice || '',
      leadTime: item.leadTime || '',
      category: resolvedCat,
      isActive: item.isActive ?? true,
    });
    setShowMadeToOrderModal(true);
  };

  const handleSaveMadeToOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMadeToOrderId) {
      await updateMadeToOrderProduct(editingMadeToOrderId, madeToOrderForm);
    } else {
      await addMadeToOrderProduct(madeToOrderForm);
    }
    setShowMadeToOrderModal(false);
    setEditingMadeToOrderId(null);
  };

  // Product Form State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [materialsInput, setMaterialsInput] = useState<string>('');
  const [productForm, setProductForm] = useState<Omit<Product, 'id' | 'createdAt'>>({
    title: '',
    subtitle: '',
    category: 'preloved_restored',
    price: 680,
    currency: '£',
    availability: 'one_of_one',
    images: ['https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'],
    description: '',
    storyBehindThePiece: '',
    story: '',
    specificationsAndDimensions: 'W: 68 cm • D: 74 cm • H: 78 cm',
    dimensions: { width: '68 cm', depth: '74 cm', height: '78 cm' },
    materials: ['Restored Solid Teak frame with Danish oil finish', 'Bute Fabrics Scottish Wool/Flax blend', 'Renewed Pirelli rubber webbing system', 'Reflex foam with feather-wrapped top cushion'],
    materialsUsed: ['Restored Solid Teak frame with Danish oil finish', 'Bute Fabrics Scottish Wool/Flax blend', 'Renewed Pirelli rubber webbing system', 'Reflex foam with feather-wrapped top cushion'],
    fabric: 'Bute Isle Wool Blend (Forest Moss)',
    fabricAndWeave: 'Bute Isle Wool Blend (Forest Moss)',
    colour: 'Forest Moss & Rich Amber Teak',
    colourPalette: 'Forest Moss & Rich Amber Teak',
    style: 'Mid-Century Scandinavian',
    finish: 'Danish Teak Oil (Satin Sheen)',
    timberFinish: 'Danish Teak Oil (Satin Sheen)',
    marketplace: 'etsy',
    marketplaceUrl: settings.etsyShopUrl,
    featured: true,
    isActive: true,
    leadTime: 'Unique single piece — Ready for immediate delivery',
    sku: `WF-${Math.floor(100 + Math.random() * 900)}`
  });

  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      subtitle: '',
      category: 'preloved_restored',
      price: 680,
      currency: '£',
      availability: 'one_of_one',
      images: ['https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'],
      description: '',
      storyBehindThePiece: '',
      story: '',
      specificationsAndDimensions: 'W: 68 cm • D: 74 cm • H: 78 cm',
      dimensions: { width: '68 cm', depth: '74 cm', height: '78 cm' },
      materials: [
        'Restored Solid Teak frame with Danish oil finish',
        'Bute Fabrics Scottish Wool/Flax blend',
        'Renewed Pirelli rubber webbing system',
        'Reflex foam with feather-wrapped top cushion'
      ],
      materialsUsed: [
        'Restored Solid Teak frame with Danish oil finish',
        'Bute Fabrics Scottish Wool/Flax blend',
        'Renewed Pirelli rubber webbing system',
        'Reflex foam with feather-wrapped top cushion'
      ],
      fabric: 'Bute Isle Wool Blend (Forest Moss)',
      fabricAndWeave: 'Bute Isle Wool Blend (Forest Moss)',
      colour: 'Forest Moss & Rich Amber Teak',
      colourPalette: 'Forest Moss & Rich Amber Teak',
      style: 'Mid-Century Scandinavian',
      finish: 'Danish Teak Oil (Satin Sheen)',
      timberFinish: 'Danish Teak Oil (Satin Sheen)',
      marketplace: 'etsy',
      marketplaceUrl: settings.etsyShopUrl,
      featured: true,
      isActive: true,
      isPastUpholstery: false,
      leadTime: 'Unique single piece — Ready for immediate delivery',
      sku: `WF-${Math.floor(100 + Math.random() * 900)}`
    });
    setMaterialsInput(
      'Restored Solid Teak frame with Danish oil finish\nBute Fabrics Scottish Wool/Flax blend\nRenewed Pirelli rubber webbing system\nReflex foam with feather-wrapped top cushion'
    );
    setShowProductModal(true);
  };

  const handleOpenNewPastUpholsteryProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      subtitle: 'Past Studio Restoration',
      category: 'preloved_restored',
      price: 650,
      currency: '£',
      availability: 'sold',
      images: ['https://images.unsplash.com/photo-1580481077195-c3a8245559a1?auto=format&fit=crop&w=1000&q=80'],
      description: 'Handcrafted restoration of a vintage piece, reupholstered in luxury British wool with hand-stitched detailing.',
      storyBehindThePiece: 'Rescued and lovingly restored with renewed webbing and traditional springs in our workshop.',
      story: 'Rescued and lovingly restored with renewed webbing and traditional springs in our workshop.',
      specificationsAndDimensions: 'W: 75 cm • D: 80 cm • H: 88 cm',
      dimensions: { width: '75 cm', depth: '80 cm', height: '88 cm' },
      materials: [
        'Restored solid hardwood carcass',
        'Abraham Moon British Melton Wool',
        'Renewed hand-tied copper spring system'
      ],
      materialsUsed: [
        'Restored solid hardwood carcass',
        'Abraham Moon British Melton Wool',
        'Renewed hand-tied copper spring system'
      ],
      fabric: 'British Wool',
      fabricAndWeave: 'British Wool',
      colour: 'Ochre & Natural Beeswax Timber',
      colourPalette: 'Ochre & Natural Beeswax Timber',
      style: 'Mid-Century Restored',
      finish: 'Natural Beeswax finish',
      timberFinish: 'Natural Beeswax finish',
      marketplace: 'direct',
      marketplaceUrl: '',
      featured: true,
      isActive: true,
      isPastUpholstery: true,
      leadTime: 'Past Commission — Enquire to source similar frame',
      sku: `WF-PST-${Math.floor(100 + Math.random() * 900)}`
    });
    setMaterialsInput('Restored solid hardwood carcass\nAbraham Moon British Melton Wool\nRenewed hand-tied copper spring system');
    setShowProductModal(true);
  };

  const [selectedEnquiry, setSelectedEnquiry] = useState<UpholsteryEnquiry | null>(null);
  const [enquiryAdminNote, setEnquiryAdminNote] = useState('');

  // Portfolio Project Form State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<PortfolioProject, 'id'>>({
    title: '',
    category: 'Armchairs',
    furnitureType: 'Wingback Armchair',
    beforeImage: 'https://drive.google.com/file/d/1k-j1DT5crE__Rr6n7PmGWMt3cz4Xuial/view?usp=drive_link',
    afterImage: 'https://drive.google.com/file/d/1VfFYhG6R7k5QLx8-pUHHan-r2m9KFUmP/view?usp=drive_link',
    shortStory: '',
    workCompleted: ['Full frame re-gluing & joint stabilization', 'Hand-tied copper coil springs renewed', 'Upholstered in Abraham Moon wool'],
    fabricUsed: 'British Wool',
    clientLocation: 'West London',
    featured: true,
  });

  // FAQ Form State
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqForm, setFaqForm] = useState<Omit<FAQItem, 'id'>>({
    category: 'upholstery',
    question: '',
    answer: ''
  });

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(contentForm);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedMaterials = materialsInput
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const finalMaterials = parsedMaterials.length > 0 
      ? parsedMaterials 
      : (productForm.materialsUsed && productForm.materialsUsed.length > 0 ? productForm.materialsUsed : productForm.materials || []);

    const payload: Omit<Product, 'id' | 'createdAt'> = {
      ...productForm,
      storyBehindThePiece: productForm.storyBehindThePiece || productForm.story || '',
      story: productForm.storyBehindThePiece || productForm.story || '',
      specificationsAndDimensions: productForm.specificationsAndDimensions || '',
      fabricAndWeave: productForm.fabricAndWeave || productForm.fabric || '',
      fabric: productForm.fabricAndWeave || productForm.fabric || '',
      colourPalette: productForm.colourPalette || productForm.colour || '',
      colour: productForm.colourPalette || productForm.colour || '',
      timberFinish: productForm.timberFinish || productForm.finish || '',
      finish: productForm.timberFinish || productForm.finish || '',
      materialsUsed: finalMaterials,
      materials: finalMaterials,
      isActive: productForm.isActive === true || (productForm.isActive !== false && (productForm.isActive as any) !== 'false'),
      isPastUpholstery: productForm.isPastUpholstery === true
    };

    if (editingProductId) {
      await updateProduct(editingProductId, payload);
    } else {
      await addProduct(payload);
    }
    setShowProductModal(false);
    setEditingProductId(null);
  };

  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    const specs = p.specificationsAndDimensions || [
      p.dimensions?.width && `W: ${p.dimensions.width}`,
      p.dimensions?.depth && `D: ${p.dimensions.depth}`,
      p.dimensions?.height && `H: ${p.dimensions.height}`
    ].filter(Boolean).join(' • ');

    const mats = (p.materialsUsed && p.materialsUsed.length > 0) 
      ? p.materialsUsed 
      : (p.materials || []);

    setProductForm({
      title: p.title,
      subtitle: p.subtitle || '',
      category: p.category,
      price: p.price,
      currency: p.currency,
      availability: p.availability,
      images: p.images || [],
      description: p.description,
      storyBehindThePiece: p.storyBehindThePiece || p.story || '',
      story: p.storyBehindThePiece || p.story || '',
      specificationsAndDimensions: specs,
      dimensions: p.dimensions || {},
      materials: mats,
      materialsUsed: mats,
      fabric: p.fabricAndWeave || p.fabric || '',
      fabricAndWeave: p.fabricAndWeave || p.fabric || '',
      colour: p.colourPalette || p.colour || '',
      colourPalette: p.colourPalette || p.colour || '',
      style: p.style || 'Modern Country',
      finish: p.timberFinish || p.finish || '',
      timberFinish: p.timberFinish || p.finish || '',
      marketplace: p.marketplace,
      marketplaceUrl: p.marketplaceUrl,
      featured: p.featured,
      isActive: isProductActive(p),
      isPastUpholstery: p.isPastUpholstery === true,
      leadTime: p.leadTime || '',
      sku: p.sku || ''
    });
    setMaterialsInput(mats.join('\n'));
    setShowProductModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      await updatePortfolioProject(editingProjectId, projectForm);
    } else {
      await addPortfolioProject(projectForm);
    }
    setShowProjectModal(false);
    setEditingProjectId(null);
  };

  const handleEditProject = (proj: PortfolioProject) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      furnitureType: proj.furnitureType,
      beforeImage: proj.beforeImage,
      afterImage: proj.afterImage,
      shortStory: proj.shortStory,
      workCompleted: proj.workCompleted || [],
      fabricUsed: proj.fabricUsed,
      clientLocation: proj.clientLocation || '',
      featured: proj.featured
    });
    setShowProjectModal(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaqId) {
      await updateFAQ(editingFaqId, faqForm);
    } else {
      await addFAQ(faqForm);
    }
    setShowFaqModal(false);
    setEditingFaqId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans pb-28">
      {/* Top Header */}
      <div className="bg-[#2C2723] text-[#FAF8F5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#453D35] text-[#E8DCC4] text-[10px] font-mono uppercase tracking-wider">
              Studio Content Management System
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1A1715] text-[11px] text-[#A7F3D0] border border-[#059669]/30">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Cloud Firestore Connected</span>
            </div>
            {adminUser && (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3D352E] text-[11px] text-[#E8DCC4] border border-[#574E44]">
                <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                <span className="font-medium">Owner Authenticated</span>
              </div>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white">
            {settings.businessName} — Website CMS & Hub
          </h1>
          <p className="text-xs text-[#BDB2A6]">
            Every change made here updates your live website and is safely persisted to your Google Cloud Firestore database.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="admin-quick-image-upload-btn"
            onClick={() => setShowQuickUploaderModal(true)}
            className="px-3.5 py-2 bg-[#EFE9DF] hover:bg-white text-[#2C2723] text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#D9CFBF]"
            title="Upload any image directly from your computer's hard drive"
          >
            <HardDrive className="w-3.5 h-3.5 text-[#8B6B48]" />
            <span>Upload from Hard Drive</span>
          </button>
          <button
            onClick={syncAllToFirestore}
            disabled={isSyncing}
            className="px-3.5 py-2 bg-[#453D35] hover:bg-[#574E44] text-[#FAF8F5] text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Push and synchronize all current website data to Cloud Firestore"
          >
            <UploadCloud className={`w-3.5 h-3.5 ${isSyncing ? 'animate-bounce' : ''}`} />
            <span>{isSyncing ? 'Syncing to Cloud...' : 'Sync to Firestore'}</span>
          </button>
          <button
            onClick={adminLogout}
            className="px-3.5 py-2 bg-red-950/70 hover:bg-red-900 border border-red-800/40 text-red-200 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ml-1"
            title="Lock and sign out of admin dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>
          <a
            href="https://privateemail.com/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={async () => {
              await adminLogout();
            }}
            className="px-3.5 py-2 bg-[#1E293B] hover:bg-[#334155] border border-slate-700/60 text-slate-100 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Lock admin dashboard and open Private Email login (privateemail.com)"
          >
            <Mail className="w-3.5 h-3.5 text-sky-300" />
            <span>Lock & Check Email</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E0D7C9] text-xs font-medium scrollbar-none">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'content'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <Globe className="w-4 h-4 text-[#8B6B48]" />
          <span>Website Content & Copy</span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <Package className="w-4 h-4 text-[#8B6B48]" />
          <span>Shop Catalog ({products.filter(p => !p.isPastUpholstery).length})</span>
        </button>
        <button
          onClick={() => setActiveTab('past_upholstery')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'past_upholstery'
              ? 'bg-[#FAF8F5] border-t-2 border-[#8B6B48] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <Scissors className="w-4 h-4 text-[#8B6B48]" />
          <span>Past Upholstery Carousel ({products.filter(p => p.isPastUpholstery).length})</span>
        </button>
        <button
          onClick={() => setActiveTab('made_to_order')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'made_to_order'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#8B6B48]" />
          <span>Made to Order ({madeToOrderProducts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'portfolio'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#8B6B48]" />
          <span>Portfolio Transformations ({portfolioProjects.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'enquiries'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <MessageSquareText className="w-4 h-4 text-[#8B6B48]" />
          <span>Quote Leads ({enquiries.filter(e => e.status === 'new').length} New)</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'faqs'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#8B6B48]" />
          <span>FAQs ({faqs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-[#FAF8F5] border-t-2 border-[#2C2723] text-[#1F1B18] font-bold shadow-xs'
              : 'text-[#7A6F64] hover:text-[#1F1B18] hover:bg-[#EFE9DF]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#8B6B48]" />
          <span>Live Conversions</span>
        </button>
      </div>

      {/* Tab Contents: Content */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-[#1F1B18]">Website Content Management</h2>
            <p className="text-xs text-[#7A6F64]">
              Control the headlines, artisan story, studio contacts, marketplace links, and announcement banners displayed across the site.
            </p>
          </div>
          <form onSubmit={handleSaveContent} className="space-y-6 text-xs font-sans">
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3">
                <h3 className="font-serif text-lg text-[#1F1B18]">1. Studio Identity & Logos</h3>
                <p className="text-[#7A6F64]">Business naming, taglines, and brand visual assets.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Studio / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={contentForm.businessName}
                    onChange={(e) => setContentForm({ ...contentForm, businessName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Studio Tagline</label>
                  <input
                    type="text"
                    value={contentForm.tagline}
                    onChange={(e) => setContentForm({ ...contentForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-lg">
                <ImageUploadInput
                  id="admin-brand-logo-input"
                  label="Brand Logo"
                  sublabel="Upload logo directly from your computer's hard drive or paste a Google Drive link (PNG with transparency recommended)"
                  value={contentForm.logoUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, logoUrl: newVal })}
                  placeholder="Choose file from computer or enter URL"
                  aspectRatio="auto"
                />
              </div>

              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-lg">
                <ImageUploadInput
                  id="admin-footer-logo-input"
                  label="Footer Logo (Optional)"
                  sublabel="Optional custom footer variation. Choose from computer or enter URL."
                  value={contentForm.footerLogoUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, footerLogoUrl: newVal })}
                  placeholder="Choose file from computer or enter URL"
                  aspectRatio="auto"
                />
              </div>

              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-lg">
                <ImageUploadInput
                  id="admin-hero-banner-input"
                  label="Homepage Hero Banner Image"
                  sublabel="Upload a high-resolution workshop photo from your computer hard drive or enter a link"
                  value={contentForm.heroBannerUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, heroBannerUrl: newVal })}
                  placeholder="Upload banner photo or enter URL"
                  aspectRatio="banner"
                />
              </div>

              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-lg">
                <ImageUploadInput
                  id="admin-mto-hero-input"
                  label="Made to Order Hero Image"
                  sublabel="Upload a bespoke furniture workshop photo from your computer or enter a link"
                  value={contentForm.madeToOrderHeroUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, madeToOrderHeroUrl: newVal })}
                  placeholder="Upload photo or enter URL"
                  aspectRatio="banner"
                />
              </div>

              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-lg">
                <ImageUploadInput
                  id="admin-story-hero-input"
                  label="Our Story Hero Image"
                  sublabel="Upload artisan studio or portrait photo from your computer or enter a link"
                  value={contentForm.ourStoryHeroImageUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, ourStoryHeroImageUrl: newVal })}
                  placeholder="Upload studio photo or enter URL"
                  aspectRatio="banner"
                />
              </div>
            </div>

            {/* Section 2: Upholstery Page Hero */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B6B48]" />
                    <span>2. Upholstery Page Hero & Before / After Slider</span>
                  </h3>
                  <p className="text-[#7A6F64]">Configure the before and after transformation comparison images and headline featured in the Upholstery page hero.</p>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E0D7C9] text-[10px] font-mono uppercase tracking-wider text-[#8B6B48]">
                  Hero Showcase
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Upholstery Hero Headline</label>
                  <input
                    type="text"
                    value={contentForm.upholsteryHeroHeading || ''}
                    placeholder="e.g. Bespoke upholstery for furniture with a story."
                    onChange={(e) => setContentForm({ ...contentForm, upholsteryHeroHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Upholstery Hero Subheading</label>
                  <input
                    type="text"
                    value={contentForm.upholsteryHeroSubheading || ''}
                    placeholder="e.g. Transform a loved chair, chaise, footstool or statement piece..."
                    onChange={(e) => setContentForm({ ...contentForm, upholsteryHeroSubheading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
                <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#4A4036] text-xs">
                      1. Before Restoration Photo
                    </span>
                    <span className="text-[10px] text-amber-900 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded font-medium">
                      Before Restoration
                    </span>
                  </div>
                  <ImageUploadInput
                    id="admin-upholstery-before-input"
                    value={contentForm.upholsteryHeroBeforeImage || ''}
                    onChange={(newVal) => setContentForm({ ...contentForm, upholsteryHeroBeforeImage: newVal })}
                    placeholder="Choose file from computer or enter URL"
                    aspectRatio="video"
                    required
                  />
                  <div>
                    <label className="block text-[11px] text-[#7A6F64] mb-1">Before Label Badge</label>
                    <input
                      type="text"
                      value={contentForm.upholsteryHeroBeforeLabel || ''}
                      placeholder="Before: Faded Antique Chaise"
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryHeroBeforeLabel: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#4A4036] text-xs">
                      2. After Reupholstery Photo
                    </span>
                    <span className="text-[10px] text-emerald-900 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                      After Reupholstery
                    </span>
                  </div>
                  <ImageUploadInput
                    id="admin-upholstery-after-input"
                    value={contentForm.upholsteryHeroAfterImage || ''}
                    onChange={(newVal) => setContentForm({ ...contentForm, upholsteryHeroAfterImage: newVal })}
                    placeholder="Choose file from computer or enter URL"
                    aspectRatio="video"
                    required
                  />
                  <div>
                    <label className="block text-[11px] text-[#7A6F64] mb-1">After Label Badge</label>
                    <input
                      type="text"
                      value={contentForm.upholsteryHeroAfterLabel || ''}
                      placeholder="After: Restored Velvet Transformation"
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryHeroAfterLabel: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {contentForm.upholsteryHeroBeforeImage && contentForm.upholsteryHeroAfterImage && (
                <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#1F1B18] flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#8B6B48]" />
                      <span>Live Interactive Slider Test:</span>
                    </span>
                  </div>
                  <div className="max-w-md mx-auto p-2.5 bg-white border border-[#E0D7C9] rounded-xl shadow-xs">
                    <BeforeAfterSlider
                      beforeImage={contentForm.upholsteryHeroBeforeImage}
                      afterImage={contentForm.upholsteryHeroAfterImage}
                      beforeLabel={contentForm.upholsteryHeroBeforeLabel || 'Before: Faded Antique Chaise'}
                      afterLabel={contentForm.upholsteryHeroAfterLabel || 'After: Restored Velvet Transformation'}
                      aspectRatio="aspect-4/3"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 2b: Past Upholstery Carousel */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#8B6B48]" />
                    <span>2b. Homepage Past Upholstery Carousel</span>
                  </h3>
                  <p className="text-[#7A6F64]">Configure the title and descriptive intro displayed above the scrolling product carousel on your homepage.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Carousel Section Title</label>
                  <input
                    type="text"
                    value={contentForm.pastUpholsteryHeading || ''}
                    placeholder="e.g. Past Upholstery & Bespoke Restorations"
                    onChange={(e) => setContentForm({ ...contentForm, pastUpholsteryHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Carousel Subtitle / Archive Story</label>
                  <input
                    type="text"
                    value={contentForm.pastUpholsterySubheading || ''}
                    placeholder="e.g. A curated archive of bespoke commissions, one-of-a-kind vintage transformations..."
                    onChange={(e) => setContentForm({ ...contentForm, pastUpholsterySubheading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              {/* Section Banner Photo Field */}
              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                <ImageUploadInput
                  id="admin-past-upholstery-banner-input"
                  label="Carousel Section Banner / Feature Photo (Optional)"
                  sublabel="Upload a workshop restoration photo or showcase banner from your computer or enter a URL"
                  value={contentForm.pastUpholsteryImageUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, pastUpholsteryImageUrl: newVal })}
                  placeholder="Choose image from computer or enter URL"
                  aspectRatio="video"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EAE3D5]">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Full-Width Section Background Colour</label>
                  <select
                    value={contentForm.pastUpholsteryBgColor || 'dark'}
                    onChange={(e) => setContentForm({ ...contentForm, pastUpholsteryBgColor: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs cursor-pointer"
                  >
                    <option value="dark">Heritage Dark Charcoal (#241F1C) — Matches Upholstery Service</option>
                    <option value="cream">Alabaster Cream (#FAF8F5) — Matches Website Body</option>
                    <option value="linen">Warm Studio Biscuit (#EFE9DF) — Subtle Contrast</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg">
                  <div>
                    <span className="block font-semibold text-xs text-[#1F1B18]">Show Past Upholstery on Homepage</span>
                    <span className="text-[11px] text-[#7A6F64]">Display this full-width showcase carousel</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contentForm.showPastUpholsteryCarousel !== false}
                      onChange={(e) => setContentForm({ ...contentForm, showPastUpholsteryCarousel: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2C2723]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2c: Upholstery Fabric & Textile Consultation Section */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8B6B48]" />
                    <span>2c. Upholstery Page - Fabric & Textile Consultation Section</span>
                  </h3>
                  <p className="text-[#7A6F64]">Customize the photo, title, intro paragraph, button label, and fabric swatch feature cards on the Upholstery page.</p>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E0D7C9] text-[10px] font-mono uppercase tracking-wider text-[#8B6B48]">
                  Textile Sourcing
                </span>
              </div>

              {/* Image Upload Input */}
              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                <ImageUploadInput
                  id="admin-upholstery-fabric-image-input"
                  label="Fabric & Swatches Section Photo"
                  sublabel="Upload an image from your computer or paste a Google Drive / web image link (recommended ratio 4:3)"
                  value={contentForm.upholsteryFabricImageUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, upholsteryFabricImageUrl: newVal })}
                  placeholder="Choose image from computer or enter URL"
                  aspectRatio="video"
                />
              </div>

              {/* Section Header Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Eyebrow / Category Tagline</label>
                  <input
                    type="text"
                    value={contentForm.upholsteryFabricEyebrow || ''}
                    placeholder="e.g. Textile Sourcing"
                    onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricEyebrow: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Main Section Headline</label>
                  <input
                    type="text"
                    value={contentForm.upholsteryFabricHeading || ''}
                    placeholder="e.g. Curated British & European Fabrics"
                    onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Introductory Description</label>
                <textarea
                  rows={3}
                  value={contentForm.upholsteryFabricDescription || ''}
                  placeholder="e.g. Choosing the right fabric is essential for both aesthetic harmony and long-term durability..."
                  onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Consultation CTA Button Text</label>
                <input
                  type="text"
                  value={contentForm.upholsteryFabricButtonText || ''}
                  placeholder="e.g. Request Complimentary Fabric Swatches"
                  onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricButtonText: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                />
              </div>

              {/* 4 Fabric Swatches / Highlights */}
              <div className="space-y-3 pt-2 border-t border-[#EAE3D5]">
                <h4 className="font-semibold text-xs text-[#1F1B18] uppercase tracking-wider">
                  Fabric Swatch Cards (4 Highlights)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Swatch 1 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Card 1: Wool / Textile Title</label>
                    <input
                      type="text"
                      value={contentForm.upholsteryFabricItem1Title || ''}
                      placeholder="e.g. Pure British Wool (Abraham Moon & Bute)"
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem1Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Card 1: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.upholsteryFabricItem1Desc || ''}
                      placeholder="e.g. Naturally fire-retardant, exceptionally hardwearing (50,000+ Martindale rubs), and thermoregulating."
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem1Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Swatch 2 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Card 2: Linen Title</label>
                    <input
                      type="text"
                      value={contentForm.upholsteryFabricItem2Title || ''}
                      placeholder="e.g. Heavyweight Belgian & European Flax Linen"
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem2Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Card 2: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.upholsteryFabricItem2Desc || ''}
                      placeholder="e.g. Relaxed, breathable, tactile luxury that softens beautifully with age."
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem2Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Swatch 3 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Card 3: Velvet Title</label>
                    <input
                      type="text"
                      value={contentForm.upholsteryFabricItem3Title || ''}
                      placeholder="e.g. Cotton & Mohair Velvet (Designers Guild & Romo)"
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem3Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Card 3: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.upholsteryFabricItem3Desc || ''}
                      placeholder="e.g. Sumptuous lustre and deep light-reflecting richness for period armchairs and statement chaise lounges."
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem3Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Swatch 4 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Card 4: Performance / Bouclé Title</label>
                    <input
                      type="text"
                      value={contentForm.upholsteryFabricItem4Title || ''}
                      placeholder="e.g. Pet-Friendly Stain-Resistant Bouclé (FibreGuard)"
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem4Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Card 4: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.upholsteryFabricItem4Desc || ''}
                      placeholder="e.g. Repels liquid spills, resists pet claws, and cleans easily with just water while retaining tactile softness."
                      onChange={(e) => setContentForm({ ...contentForm, upholsteryFabricItem4Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2d: Homepage Made-to-Order Section */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B6B48]" />
                    <span>2d. Homepage Made-to-Order Showcase Section</span>
                  </h3>
                  <p className="text-[#7A6F64]">
                    Update the headline, subheading, bespoke description, 3 feature bullet points, showcase photos, and commission card quotes on the homepage.
                  </p>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E0D7C9] text-[10px] font-mono uppercase tracking-wider text-[#8B6B48]">
                  Homepage Made to Order
                </span>
              </div>

              {/* Main Headings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Section Title (Line 1)</label>
                  <input
                    type="text"
                    value={contentForm.madeToOrderHeading || ''}
                    placeholder="e.g. Made for you."
                    onChange={(e) => setContentForm({ ...contentForm, madeToOrderHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Section Title Italic (Line 2)</label>
                  <input
                    type="text"
                    value={contentForm.madeToOrderSubheading || ''}
                    placeholder="e.g. Made to be different."
                    onChange={(e) => setContentForm({ ...contentForm, madeToOrderSubheading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              {/* Main Description */}
              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Section Description / Story</label>
                <textarea
                  rows={3}
                  value={contentForm.madeToOrderDescription || ''}
                  placeholder="Customers can enquire about variations of existing designs, previously sold pieces, fabric options, selected dimensions or bespoke creations..."
                  onChange={(e) => setContentForm({ ...contentForm, madeToOrderDescription: e.target.value })}
                  className="w-full p-3 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                />
              </div>

              {/* 3 Feature Points */}
              <div className="border-t border-[#EAE3D5] pt-4 space-y-4">
                <span className="block font-semibold text-xs text-[#1F1B18] uppercase tracking-wider">
                  3 Bespoke Feature Bullet Points
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Feature 1 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 1: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.madeToOrderFeature1Title || ''}
                      placeholder="e.g. Custom Dimensions:"
                      onChange={(e) => setContentForm({ ...contentForm, madeToOrderFeature1Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 1: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.madeToOrderFeature1Desc || ''}
                      placeholder="Tailor footstool lengths, pouffe heights or cushion profiles to fit your space perfectly."
                      onChange={(e) => setContentForm({ ...contentForm, madeToOrderFeature1Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Feature 2 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 2: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.madeToOrderFeature2Title || ''}
                      placeholder="e.g. Curated Textiles:"
                      onChange={(e) => setContentForm({ ...contentForm, madeToOrderFeature2Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 2: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.madeToOrderFeature2Desc || ''}
                      placeholder="Access premier British and European textile mills or enquire about sourcing specific fabrics."
                      onChange={(e) => setContentForm({ ...contentForm, madeToOrderFeature2Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Feature 3 */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 3: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.madeToOrderFeature3Title || ''}
                      placeholder="e.g. Timber & Leg Finishes:"
                      onChange={(e) => setContentForm({ ...contentForm, madeToOrderFeature3Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 3: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.madeToOrderFeature3Desc || ''}
                      placeholder="Natural oak, dark walnut, turned brass casters or tapered mid-century legs."
                      onChange={(e) => setContentForm({ ...contentForm, madeToOrderFeature3Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Showcase Images and Cards (Right Column of Section) */}
              <div className="border-t border-[#EAE3D5] pt-4 space-y-4">
                <span className="block font-semibold text-xs text-[#1F1B18] uppercase tracking-wider">
                  Showcase Photos & Card Callouts (2 Grid Columns)
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Image 1 & Card 1 */}
                  <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#4A4036] text-xs">
                        1. Primary Footstool / Piece Photo
                      </span>
                      <span className="text-[10px] text-[#8B6B48] bg-[#EFE9DF] px-2 py-0.5 rounded font-medium">
                        Left Card
                      </span>
                    </div>
                    <ImageUploadInput
                      id="admin-mto-section-img1"
                      label="Image 1 (Footstools & Pouffes)"
                      sublabel="Upload from your computer or enter a web / Google Drive link"
                      value={contentForm.madeToOrderImage1Url || contentForm.madeToOrderHeroUrl || ''}
                      onChange={(newVal) => setContentForm({ ...contentForm, madeToOrderImage1Url: newVal, madeToOrderHeroUrl: newVal })}
                      placeholder="Upload photo or enter URL"
                      aspectRatio="video"
                    />
                    <div>
                      <label className="block text-[11px] text-[#7A6F64] mb-1">Card 1 Title</label>
                      <input
                        type="text"
                        value={contentForm.madeToOrderCard1Title || ''}
                        placeholder="e.g. Bespoke Footstools & Pouffes"
                        onChange={(e) => setContentForm({ ...contentForm, madeToOrderCard1Title: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#7A6F64] mb-1">Card 1 Description</label>
                      <input
                        type="text"
                        value={contentForm.madeToOrderCard1Desc || ''}
                        placeholder="e.g. Handmade geometric embroidery with artisan detailing."
                        onChange={(e) => setContentForm({ ...contentForm, madeToOrderCard1Desc: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Image 2 & Card 2 */}
                  <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#4A4036] text-xs">
                        2. Secondary Bench / Commission Photo
                      </span>
                      <span className="text-[10px] text-[#8B6B48] bg-[#EFE9DF] px-2 py-0.5 rounded font-medium">
                        Right Card
                      </span>
                    </div>
                    <ImageUploadInput
                      id="admin-mto-section-img2"
                      label="Image 2 (Fluted Bench / Ottoman)"
                      sublabel="Upload from your computer or enter a web / Google Drive link"
                      value={contentForm.madeToOrderImage2Url || ''}
                      onChange={(newVal) => setContentForm({ ...contentForm, madeToOrderImage2Url: newVal })}
                      placeholder="Upload photo or enter URL"
                      aspectRatio="video"
                    />
                    <div>
                      <label className="block text-[11px] text-[#7A6F64] mb-1">Card 2 Badge Label</label>
                      <input
                        type="text"
                        value={contentForm.madeToOrderCard2Badge || ''}
                        placeholder="e.g. Bespoke Commission"
                        onChange={(e) => setContentForm({ ...contentForm, madeToOrderCard2Badge: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#7A6F64] mb-1">Card 2 Quote / Subtitle</label>
                      <input
                        type="text"
                        value={contentForm.madeToOrderCard2Quote || ''}
                        placeholder='e.g. "Tailored to our exact living room dimensions."'
                        onChange={(e) => setContentForm({ ...contentForm, madeToOrderCard2Quote: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Archive Showcase Images (Section 4) */}
                  <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3 sm:col-span-2">
                    <span className="font-semibold text-[#4A4036] text-xs block">
                      3. Archive Inspiration Cards (Section 4: "Fell in love with a sold design?")
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <ImageUploadInput
                          id="admin-mto-archive-img1"
                          label="Archive Image 1"
                          sublabel="First inspiration card"
                          value={contentForm.madeToOrderArchiveImg1 || ''}
                          onChange={(newVal) => setContentForm({ ...contentForm, madeToOrderArchiveImg1: newVal })}
                          placeholder="e.g. Google Drive link or image URL"
                        />
                        <div className="mt-2">
                          <label className="block text-[11px] text-[#7A6F64] mb-1">Caption 1</label>
                          <input
                            type="text"
                            value={contentForm.madeToOrderArchiveCard1Text || ''}
                            placeholder="e.g. Curated Fabric & Swatches"
                            onChange={(e) => setContentForm({ ...contentForm, madeToOrderArchiveCard1Text: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <ImageUploadInput
                          id="admin-mto-archive-img2"
                          label="Archive Image 2"
                          sublabel="Second inspiration card"
                          value={contentForm.madeToOrderArchiveImg2 || ''}
                          onChange={(newVal) => setContentForm({ ...contentForm, madeToOrderArchiveImg2: newVal })}
                          placeholder="e.g. /images/... or image URL"
                        />
                        <div className="mt-2">
                          <label className="block text-[11px] text-[#7A6F64] mb-1">Caption 2</label>
                          <input
                            type="text"
                            value={contentForm.madeToOrderArchiveCard2Text || ''}
                            placeholder="e.g. Luxury Cushions & Wools"
                            onChange={(e) => setContentForm({ ...contentForm, madeToOrderArchiveCard2Text: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2e: Homepage Craftsmanship & Philosophy (Brand Story Section) */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B6B48]" />
                    <span>2e. Homepage Craftsmanship &amp; Philosophy Section</span>
                  </h3>
                  <p className="text-[#7A6F64]">
                    Configure the story headline, editorial description, lifestyle cushion image, artisan quote card, and craft highlights on the homepage.
                  </p>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E0D7C9] text-[10px] font-mono uppercase tracking-wider text-[#8B6B48]">
                  Homepage Brand Story
                </span>
              </div>

              {/* Section Image Upload */}
              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                <ImageUploadInput
                  id="admin-brand-story-image-input"
                  label="Craftsmanship Lifestyle Photo (Velvet Cushions / Workshop)"
                  sublabel="Upload an editorial photograph from your computer or enter a URL"
                  value={contentForm.brandStoryImageUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, brandStoryImageUrl: newVal })}
                  placeholder="Upload photo or enter URL"
                  aspectRatio="video"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#FAF8F5] border border-[#EBE4D8] rounded-xl">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A4036] mb-1 text-xs">Floating Quote Overlay</label>
                  <input
                    type="text"
                    value={contentForm.brandStoryQuote || ''}
                    placeholder='"Chair cushions should feel thoughtfully crafted rather than ordinary..."'
                    onChange={(e) => setContentForm({ ...contentForm, brandStoryQuote: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1 text-xs">Quote Author Attribution</label>
                  <input
                    type="text"
                    value={contentForm.brandStoryQuoteAuthor || ''}
                    placeholder="Wedgbury Furnishings, Maker"
                    onChange={(e) => setContentForm({ ...contentForm, brandStoryQuoteAuthor: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                  />
                </div>
              </div>

              {/* Headings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Eyebrow Tagline</label>
                  <input
                    type="text"
                    value={contentForm.brandStoryEyebrow || ''}
                    placeholder="e.g. Craftsmanship & Philosophy"
                    onChange={(e) => setContentForm({ ...contentForm, brandStoryEyebrow: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Headline (Line 1)</label>
                  <input
                    type="text"
                    value={contentForm.brandStoryHeading || ''}
                    placeholder="e.g. Small scale. Thoughtfully made."
                    onChange={(e) => setContentForm({ ...contentForm, brandStoryHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Headline Italic (Line 2)</label>
                  <input
                    type="text"
                    value={contentForm.brandStorySubheading || ''}
                    placeholder="e.g. Individually finished."
                    onChange={(e) => setContentForm({ ...contentForm, brandStorySubheading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              {/* Narrative Paragraphs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Story Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={contentForm.brandStoryParagraph1 || ''}
                    placeholder="Wedgbury is an independent British studio founded on respect for craft and enduring quality..."
                    onChange={(e) => setContentForm({ ...contentForm, brandStoryParagraph1: e.target.value })}
                    className="w-full p-2.5 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Story Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={contentForm.brandStoryParagraph2 || ''}
                    placeholder="By working intentionally on a small scale, every furnishing receives unhurried attention to proportion..."
                    onChange={(e) => setContentForm({ ...contentForm, brandStoryParagraph2: e.target.value })}
                    className="w-full p-2.5 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              {/* 2 Feature Highlight Boxes */}
              <div className="border-t border-[#EAE3D5] pt-4 space-y-3">
                <span className="block font-semibold text-xs text-[#1F1B18] uppercase tracking-wider">
                  2 Feature Highlight Boxes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Feature 1: Title</label>
                    <input
                      type="text"
                      value={contentForm.brandStoryFeature1Title || ''}
                      placeholder="e.g. Natural Materials"
                      onChange={(e) => setContentForm({ ...contentForm, brandStoryFeature1Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Feature 1: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.brandStoryFeature1Desc || ''}
                      placeholder="Pure British wools, flax linens, natural fillings and solid timber hardwoods."
                      onChange={(e) => setContentForm({ ...contentForm, brandStoryFeature1Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Feature 2: Title</label>
                    <input
                      type="text"
                      value={contentForm.brandStoryFeature2Title || ''}
                      placeholder="e.g. Circular Longevity"
                      onChange={(e) => setContentForm({ ...contentForm, brandStoryFeature2Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Feature 2: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.brandStoryFeature2Desc || ''}
                      placeholder="Revitalising preloved timber frames to keep characterful furniture in use."
                      onChange={(e) => setContentForm({ ...contentForm, brandStoryFeature2Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Artisan Bio & About Story */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3">
                <h3 className="font-serif text-lg text-[#1F1B18]">3. Artisan Profile & Studio Story</h3>
                <p className="text-[#7A6F64]">Craftsman background displayed on the About page and footer.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Lead Artisan / Founder Name</label>
                  <input
                    type="text"
                    value={contentForm.artisanName}
                    onChange={(e) => setContentForm({ ...contentForm, artisanName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Artisan Role / Title</label>
                  <input
                    type="text"
                    value={contentForm.artisanRole || ''}
                    onChange={(e) => setContentForm({ ...contentForm, artisanRole: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Studio Philosophy & Story (Paragraph 1)</label>
                <textarea
                  rows={3}
                  value={contentForm.aboutStory || 'Wedgbury was born from a deep reverence for traditional furniture construction, tactile British textiles, and the enduring beauty of furniture with character.'}
                  onChange={(e) => setContentForm({ ...contentForm, aboutStory: e.target.value })}
                  className="w-full p-3 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                />
              </div>
            </div>

            {/* Section 3b: Considered Materials & Sustainability (About Page Section 3) */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8B6B48]" />
                    <span>3b. About Page - Considered Materials &amp; Sustainability Section</span>
                  </h3>
                  <p className="text-[#7A6F64]">
                    Configure the material photo, title, sustainability narrative, and 4 compliance / material standards bullet points on the About page.
                  </p>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#E0D7C9] text-[10px] font-mono uppercase tracking-wider text-[#8B6B48]">
                  About Page Materials
                </span>
              </div>

              {/* Materials Photo Field */}
              <div className="bg-[#FAF8F5] border border-[#EBE4D8] p-4 rounded-xl space-y-3">
                <ImageUploadInput
                  id="admin-materials-image-input"
                  label="Considered Materials Section Photo"
                  sublabel="Upload a workshop photo showcasing natural fillings, timber, or fabrics from your computer or enter a URL"
                  value={contentForm.materialsSectionImageUrl || ''}
                  onChange={(newVal) => setContentForm({ ...contentForm, materialsSectionImageUrl: newVal })}
                  placeholder="Upload photo or enter URL"
                  aspectRatio="video"
                />
              </div>

              {/* Headings & Narrative */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Eyebrow Tagline</label>
                  <input
                    type="text"
                    value={contentForm.materialsSectionEyebrow || ''}
                    placeholder="e.g. Considered Materials"
                    onChange={(e) => setContentForm({ ...contentForm, materialsSectionEyebrow: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Section Headline</label>
                  <input
                    type="text"
                    value={contentForm.materialsSectionHeading || ''}
                    placeholder="e.g. Built with Respect for Materials"
                    onChange={(e) => setContentForm({ ...contentForm, materialsSectionHeading: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Section Introductory Description</label>
                <textarea
                  rows={3}
                  value={contentForm.materialsSectionDescription || ''}
                  placeholder="Our approach to sustainability is rooted in durability and conscious craft: restoring existing furniture where practical..."
                  onChange={(e) => setContentForm({ ...contentForm, materialsSectionDescription: e.target.value })}
                  className="w-full p-2.5 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs"
                />
              </div>

              {/* 4 Materials Bullet Points */}
              <div className="border-t border-[#EAE3D5] pt-4 space-y-3">
                <span className="block font-semibold text-xs text-[#1F1B18] uppercase tracking-wider">
                  4 Considered Material Standards Bullet Points
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Point 1 */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 1: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.materialsSectionItem1Title || ''}
                      placeholder="e.g. High-End British & European Fabrics"
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem1Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 1: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.materialsSectionItem1Desc || ''}
                      placeholder="Pure wools, natural linens and hardwearing textured bouclés from reputable mills."
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem1Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Point 2 */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 2: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.materialsSectionItem2Title || ''}
                      placeholder="e.g. FSC-Certified Timber"
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem2Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 2: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.materialsSectionItem2Desc || ''}
                      placeholder="Internal structural frames for our handmade footstools use certified sustainably harvested hardwoods."
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem2Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Point 3 */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 3: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.materialsSectionItem3Title || ''}
                      placeholder="e.g. Natural Jute & Wadding"
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem3Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 3: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.materialsSectionItem3Desc || ''}
                      placeholder="Traditional vegetable fibre webbings, coir, and hypoallergenic waddings."
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem3Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>

                  {/* Point 4 */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg space-y-2">
                    <label className="block font-semibold text-xs text-[#4A4036]">Bullet 4: Bold Title</label>
                    <input
                      type="text"
                      value={contentForm.materialsSectionItem4Title || ''}
                      placeholder="e.g. UK Fire Safety Compliance (BS 5852)"
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem4Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                    <label className="block font-medium text-[11px] text-[#7A6F64]">Bullet 4: Description</label>
                    <textarea
                      rows={2}
                      value={contentForm.materialsSectionItem4Desc || ''}
                      placeholder="All materials and domestic upholstery treatments fully adhere to UK safety regulations."
                      onChange={(e) => setContentForm({ ...contentForm, materialsSectionItem4Desc: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-[#D0C5B4] rounded bg-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Contact & Studio Logistics */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3">
                <h3 className="font-serif text-lg text-[#1F1B18]">4. Studio Contacts & Location</h3>
                <p className="text-[#7A6F64]">Direct communication channels and workshop details.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Studio Email Address</label>
                  <input
                    type="email"
                    value={contentForm.email}
                    onChange={(e) => setContentForm({ ...contentForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Telephone / WhatsApp</label>
                  <input
                    type="tel"
                    value={contentForm.phone}
                    onChange={(e) => setContentForm({ ...contentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Studio Geographic Location</label>
                  <input
                    type="text"
                    value={contentForm.location}
                    onChange={(e) => setContentForm({ ...contentForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    value={contentForm.instagramHandle}
                    onChange={(e) => setContentForm({ ...contentForm, instagramHandle: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Etsy Shop URL</label>
                <input
                  type="url"
                  value={contentForm.etsyShopUrl}
                  onChange={(e) => setContentForm({ ...contentForm, etsyShopUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md font-mono text-[11px] bg-[#FAF8F5]"
                />
              </div>
            </div>

            {/* Section 5: Announcement Bar */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3">
                <h3 className="font-serif text-lg text-[#1F1B18]">5. Header Announcement & Delivery Notices</h3>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showAnnouncement"
                  checked={contentForm.showAnnouncement}
                  onChange={(e) => setContentForm({ ...contentForm, showAnnouncement: e.target.checked })}
                  className="w-4 h-4 text-[#2C2723] rounded cursor-pointer"
                />
                <label htmlFor="showAnnouncement" className="font-medium text-[#1F1B18] cursor-pointer">
                  Display Top Announcement Banner across the website
                </label>
              </div>
              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Announcement Banner Text</label>
                <input
                  type="text"
                  value={contentForm.announcementText}
                  onChange={(e) => setContentForm({ ...contentForm, announcementText: e.target.value })}
                  className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#4A4036] mb-1">Delivery Notice Text</label>
                <textarea
                  rows={2}
                  value={contentForm.deliveryNotice}
                  onChange={(e) => setContentForm({ ...contentForm, deliveryNotice: e.target.value })}
                  className="w-full p-3 border border-[#D0C5B4] rounded-md bg-[#FAF8F5]"
                />
              </div>
            </div>

            {/* Section 6: Security */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#8B6B48]" />
                    <span>6. Website Owner Admin Password & Security</span>
                  </h3>
                  <p className="text-[#7A6F64]">Configure the admin password required to unlock and manage the studio CMS dashboard.</p>
                </div>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#EBE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-semibold text-[#1F1B18] text-xs">Owner Admin Password</div>
                  <div className="text-[11px] text-[#7A6F64]">Update the password used on the owner login screen.</div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="password"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Enter new admin password"
                    className="px-3 py-2 border border-[#D0C5B4] rounded-md bg-white text-xs w-full sm:w-56 font-medium text-center"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newPasscode.trim().length >= 4) {
                        updateStudioPasscode(newPasscode.trim());
                        setNewPasscode('');
                      }
                    }}
                    disabled={newPasscode.trim().length < 4}
                    className="px-3.5 py-2 bg-[#2C2723] hover:bg-[#1F1B18] text-[#FAF8F5] rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            {/* 8. Google Search Optimisation & Technical SEO */}
            <div className="bg-white border border-[#E0D7C9] rounded-xl p-6 space-y-5 shadow-xs">
              <div className="border-b border-[#EAE3D5] pb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#8B6B48]" />
                    <h3 className="font-serif text-lg text-[#1F1B18]">8. Google Search Optimisation &amp; Technical SEO</h3>
                  </div>
                  <p className="text-[#7A6F64] mt-0.5">
                    Search engine crawlability, Google Search Console verification, and automated Schema.org structured data.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EFE9DF] text-[#4A4036] rounded-full text-[11px] font-medium border border-[#D9CFBF]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  SEO Active
                </span>
              </div>

              {/* Status Banner */}
              <div className="p-4 bg-[#FAF8F5] border border-[#EBE4D8] rounded-lg space-y-2">
                <div className="font-semibold text-[#1F1B18] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Active Technical SEO Features
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] text-[#5E5248]">
                  <div className="p-2 bg-white rounded border border-[#E0D7C9]">
                    <strong className="block text-[#1F1B18]">XML Sitemap:</strong>
                    <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-[#8B6B48] hover:underline inline-flex items-center gap-1">
                      /sitemap.xml <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E0D7C9]">
                    <strong className="block text-[#1F1B18]">Robots.txt:</strong>
                    <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-[#8B6B48] hover:underline inline-flex items-center gap-1">
                      /robots.txt <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E0D7C9]">
                    <strong className="block text-[#1F1B18]">Schema.org JSON-LD:</strong>
                    <span>LocalBusiness, Product &amp; FAQ</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E0D7C9]">
                    <strong className="block text-[#1F1B18]">OpenGraph &amp; Cards:</strong>
                    <span>Dynamic per route</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">
                    Google Search Console Verification Code
                  </label>
                  <input
                    type="text"
                    value={contentForm.googleSiteVerification || ''}
                    onChange={(e) => setContentForm({ ...contentForm, googleSiteVerification: e.target.value })}
                    placeholder="e.g. google-site-verification token"
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs font-mono"
                  />
                  <p className="text-[10px] text-[#7A6F64] mt-1">
                    Paste your Google Search Console verification code here to automatically inject the verification tag into the website header.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-[#4A4036] mb-1">
                    Production Canonical Domain
                  </label>
                  <input
                    type="url"
                    value={contentForm.canonicalDomain || ''}
                    onChange={(e) => setContentForm({ ...contentForm, canonicalDomain: e.target.value })}
                    placeholder="https://www.wedgburyfurnishings.co.uk"
                    className="w-full px-3 py-2 border border-[#D0C5B4] rounded-md bg-[#FAF8F5] text-xs font-mono"
                  />
                  <p className="text-[10px] text-[#7A6F64] mt-1">
                    Base URL used for canonical links and OpenGraph cards (defaults to https://www.wedgburyfurnishings.co.uk).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2C2723] text-[#FAF8F5] text-xs font-semibold rounded-md hover:bg-[#1A1715] flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Save All Website Content to Firestore</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Products */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-[#1F1B18]">Shop Catalog Management</h2>
              <p className="text-xs text-[#7A6F64]">Add handmade pieces, update prices, Google Drive images, or Etsy purchase links.</p>
            </div>
            <button
              onClick={handleOpenNewProduct}
              className="px-4 py-2.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setCatalogFilter('all')}
                className={`p-3 bg-white border text-left rounded-lg transition-all cursor-pointer ${
                  catalogFilter === 'all' 
                    ? 'border-[#2C2723] ring-2 ring-[#2C2723]/20 shadow-xs' 
                    : 'border-[#EAE3D5] hover:border-[#D0C5B4]'
                }`}
              >
                <div className="text-[11px] text-[#7A6F64] uppercase tracking-wider font-semibold">Shop Catalog Pieces</div>
                <div className="font-serif text-2xl text-[#1F1B18] mt-0.5">{products.filter((p) => !p.isPastUpholstery).length} Pieces</div>
              </button>
              <button
                type="button"
                onClick={() => setCatalogFilter('active')}
                className={`p-3 bg-white border text-left rounded-lg transition-all cursor-pointer ${
                  catalogFilter === 'active' 
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs' 
                    : 'border-[#EAE3D5] hover:border-emerald-300'
                }`}
              >
                <div className="text-[11px] text-emerald-800 uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Active in Shop</span>
                </div>
                <div className="font-serif text-2xl text-emerald-800 mt-0.5">
                  {products.filter((p) => isProductActive(p) && !p.isPastUpholstery).length}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setCatalogFilter('deactivated')}
                className={`p-3 bg-white border text-left rounded-lg transition-all cursor-pointer ${
                  catalogFilter === 'deactivated' 
                    ? 'border-amber-600 ring-2 ring-amber-600/25 shadow-xs bg-amber-50/20' 
                    : 'border-[#EAE3D5] hover:border-amber-300'
                }`}
              >
                <div className="text-[11px] text-amber-900 uppercase tracking-wider font-semibold flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5 text-amber-700" />
                  <span>Shop Deactivated</span>
                </div>
                <div className="font-serif text-2xl text-amber-900 mt-0.5">
                  {products.filter((p) => !isProductActive(p) && !p.isPastUpholstery).length}
                </div>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-[#EAE3D5]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCatalogFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    catalogFilter === 'all' ? 'bg-[#2C2723] text-white' : 'bg-[#FAF8F5] text-[#5E5248] hover:bg-[#EFE9DF]'
                  }`}
                >
                  All Shop ({products.filter((p) => !p.isPastUpholstery).length})
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter('active')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    catalogFilter === 'active' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>Active ({products.filter((p) => p.isActive !== false && !p.isPastUpholstery).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter('deactivated')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    catalogFilter === 'deactivated' ? 'bg-amber-700 text-white' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Deactivated ({products.filter((p) => p.isActive === false && !p.isPastUpholstery).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter('past_upholstery')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    catalogFilter === 'past_upholstery' ? 'bg-[#8B6B48] text-white' : 'bg-[#EFE9DF] text-[#5E5248] hover:bg-[#E5DDCF]'
                  }`}
                >
                  <Scissors className="w-3 h-3" />
                  <span>Past Upholstery Carousel ({products.filter((p) => p.isPastUpholstery).length})</span>
                </button>
              </div>
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-[#7A6F64] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-8 pr-7 py-1 text-xs bg-[#FAF8F5] border border-[#D0C5B4] rounded focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E0D7C9] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FAF8F5] border-b border-[#EAE3D5] text-[#7A6F64] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Item & Visual</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">Website Visibility</th>
                    <th className="p-4">Homepage Featured</th>
                    <th className="p-4">Past Upholstery Carousel</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D5]">
                  {filteredCatalogProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-[#7A6F64]">
                        No products match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredCatalogProducts.map((p) => {
                      const isItemActive = isProductActive(p);
                      return (
                        <tr key={p.id} className={isItemActive ? 'hover:bg-[#FAF8F5]/80' : 'bg-[#FDFBF7] border-l-4 border-l-amber-500'}>
                          <td className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-14 h-14 rounded-md overflow-hidden bg-[#EFE9DF] border border-[#D0C5B4] shrink-0 relative">
                                <img 
                                  src={getDirectImageUrl(p.images[0])} 
                                  alt={p.title} 
                                  className={`w-full h-full object-cover ${!isItemActive ? 'opacity-70' : ''}`}
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <strong className="font-serif text-sm block">{p.title}</strong>
                                <span className="text-[11px] text-[#7A6F64]">{p.fabricAndWeave || p.fabric}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {p.category === 'cushions' ? 'Artisan Cushions' :
                             p.category === 'footstools' ? 'Handmade Footstools' :
                             p.category === 'pet_furniture' ? 'Pet Collection' :
                             p.category === 'preloved_restored' ? 'Preloved & Restored' :
                             p.category.replace('_', ' ')}
                          </td>
                          <td className="p-4 font-serif font-bold">{p.currency}{p.price}</td>
                          <td className="p-4 capitalize">{p.availability === 'one_of_one' ? 'One off' : p.availability.replaceAll('_', ' ')}</td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleProductActive(p.id)}
                              className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold cursor-pointer ${
                                isItemActive ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                              }`}
                            >
                              {isItemActive ? 'Active' : 'Deactivated'}
                            </button>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => updateProduct(p.id, { featured: !p.featured })}
                              className={`px-2 py-1 rounded text-[10px] cursor-pointer ${p.featured ? 'bg-[#2C2723] text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                              {p.featured ? '★ Featured' : 'Standard'}
                            </button>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => togglePastUpholstery(p.id)}
                              className={`px-2 py-1 rounded text-[10px] cursor-pointer ${p.isPastUpholstery ? 'bg-[#8B6B48] text-white' : 'bg-stone-100 text-stone-600'}`}
                            >
                              {p.isPastUpholstery ? '★ In Carousel' : 'Off Carousel'}
                            </button>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button onClick={() => handleEditProduct(p)} className="p-1 hover:bg-[#EFE9DF] rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteProduct(p.id)} className="p-1 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Past Upholstery */}
      {activeTab === 'past_upholstery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-[#1F1B18]">Past Upholstery Carousel Management</h2>
              <p className="text-xs text-[#7A6F64]">Curate products shown in the homepage past upholstery carousel.</p>
            </div>
            <button
              onClick={handleOpenNewPastUpholsteryProduct}
              className="px-4 py-2.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E8DCC4]" />
              <span>Add Past Upholstery Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.filter(p => p.isPastUpholstery).map((p) => (
              <div key={p.id} className="bg-white border border-[#E0D7C9] rounded-xl overflow-hidden shadow-xs p-4 space-y-3">
                <div className="aspect-4/3 bg-[#EFE9DF] rounded overflow-hidden">
                  <img src={getDirectImageUrl(p.images[0])} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-serif text-base font-medium">{p.title}</h4>
                <p className="text-xs text-[#7A6F64]">{p.subtitle}</p>
                <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D5]">
                  <button onClick={() => togglePastUpholstery(p.id)} className="text-xs text-stone-600 hover:text-black">Remove from Carousel</button>
                  <button onClick={() => handleEditProduct(p)} className="px-3 py-1 bg-[#2C2723] text-white text-xs rounded">Update Product</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Made to Order */}
      {activeTab === 'made_to_order' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl text-[#1F1B18]">Made to Order Collections</h2>
              <p className="text-xs text-[#7A6F64]">Grouped by silhouette collection: Footstools, Pouffes, Ottomans &amp; Benches, and Pet Furniture.</p>
            </div>
            <button
              onClick={() => handleOpenNewMadeToOrder(mtoCollectionTab !== 'all' ? mtoCollectionTab : undefined)}
              className="px-4 py-2.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Plus className="w-4 h-4 text-[#E8DCC4]" />
              <span>Add Made to Order Product</span>
            </button>
          </div>

          {/* Search, Filter, and Collection Tabs Bar */}
          <div className="bg-white border border-[#E0D7C9] rounded-xl p-4 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative grow max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6F64]" />
                <input
                  type="text"
                  placeholder="Search by silhouette, model code, or dimensions..."
                  value={mtoSearch}
                  onChange={(e) => setMtoSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                />
                {mtoSearch && (
                  <button
                    onClick={() => setMtoSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#7A6F64]">Status:</span>
                <div className="inline-flex rounded-lg border border-[#D0C5B4] p-0.5 bg-[#FAF8F5]">
                  <button
                    onClick={() => setMtoFilter('all')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      mtoFilter === 'all' ? 'bg-[#2C2723] text-white shadow-2xs' : 'text-[#5E5248] hover:text-[#1F1B18]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setMtoFilter('active')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      mtoFilter === 'active' ? 'bg-[#2C2723] text-white shadow-2xs' : 'text-[#5E5248] hover:text-[#1F1B18]'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setMtoFilter('deactivated')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      mtoFilter === 'deactivated' ? 'bg-[#2C2723] text-white shadow-2xs' : 'text-[#5E5248] hover:text-[#1F1B18]'
                    }`}
                  >
                    Deactivated
                  </button>
                </div>
              </div>
            </div>

            {/* Collection Group Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#EAE3D5] pb-1">
              <span className="text-[11px] font-medium text-[#7A6F64] shrink-0">Collections:</span>
              <button
                onClick={() => setMtoCollectionTab('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  mtoCollectionTab === 'all'
                    ? 'bg-[#2C2723] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5E5248] border border-[#E0D7C9] hover:bg-[#EFE9DF]'
                }`}
              >
                All Collections ({mtoCollectionCounts['all'] || 0})
              </button>
              <button
                onClick={() => setMtoCollectionTab('Footstool Collection')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  mtoCollectionTab === 'Footstool Collection'
                    ? 'bg-[#2C2723] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5E5248] border border-[#E0D7C9] hover:bg-[#EFE9DF]'
                }`}
              >
                Footstools ({mtoCollectionCounts['Footstool Collection'] || 0})
              </button>
              <button
                onClick={() => setMtoCollectionTab('Pouffe Collection')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  mtoCollectionTab === 'Pouffe Collection'
                    ? 'bg-[#2C2723] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5E5248] border border-[#E0D7C9] hover:bg-[#EFE9DF]'
                }`}
              >
                Pouffes ({mtoCollectionCounts['Pouffe Collection'] || 0})
              </button>
              <button
                onClick={() => setMtoCollectionTab('Ottoman & Bench Collection')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  mtoCollectionTab === 'Ottoman & Bench Collection'
                    ? 'bg-[#2C2723] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5E5248] border border-[#E0D7C9] hover:bg-[#EFE9DF]'
                }`}
              >
                Ottomans &amp; Benches ({mtoCollectionCounts['Ottoman & Bench Collection'] || 0})
              </button>
              <button
                onClick={() => setMtoCollectionTab('Pet Collection')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  mtoCollectionTab === 'Pet Collection'
                    ? 'bg-[#2C2723] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#5E5248] border border-[#E0D7C9] hover:bg-[#EFE9DF]'
                }`}
              >
                Pet Collection ({mtoCollectionCounts['Pet Collection'] || 0})
              </button>
            </div>
          </div>

          {/* Grouped Collection Blocks */}
          <div className="space-y-6">
            {groupedMtoCollections.map((group) => (
              <div key={group.key} className="bg-white border border-[#E0D7C9] rounded-xl overflow-hidden shadow-xs">
                {/* Collection Header */}
                <div className="bg-[#FAF8F5] border-b border-[#EAE3D5] px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-[#2C2723] text-[#FAF8F5]">
                      <Layers className="w-4 h-4 text-[#E8DCC4]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-[#1F1B18] font-semibold flex items-center gap-2">
                        <span>{group.title}</span>
                        <span className="text-[11px] font-sans font-normal px-2 py-0.5 rounded-full bg-[#EFE9DF] text-[#7A6F64] border border-[#E0D7C9]">
                          {group.items.length} {group.items.length === 1 ? 'Silhouette' : 'Silhouettes'}
                        </span>
                      </h3>
                      <p className="text-[11px] text-[#7A6F64]">
                        {group.key === 'Footstool Collection'
                          ? 'Bespoke rectangular & square footstools with tailored piping and turned timber legs.'
                          : group.key === 'Pouffe Collection'
                          ? 'Sculptural fluted cylinders and round accent pouffes.'
                          : group.key === 'Ottoman & Bench Collection'
                          ? 'Expansive hallway benches, deep storage ottomans and bed-end seating.'
                          : group.key === 'Pet Collection'
                          ? 'Luxury pet chaise lounges tailored in high-performance velvet & wool.'
                          : 'Handcrafted bespoke silhouettes.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenNewMadeToOrder(group.key)}
                    className="self-start sm:self-auto px-3 py-1.5 bg-white hover:bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-md border border-[#D0C5B4] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#8B6B48]" />
                    <span>Add to {group.title.replace(' Collection', '')}</span>
                  </button>
                </div>

                {/* Collection Table */}
                {group.items.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-[#FAF8F5]/50 border-b border-[#EAE3D5] text-[#7A6F64] uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4">Silhouette &amp; Model</th>
                          <th className="p-4">Code</th>
                          <th className="p-4">Starting from</th>
                          <th className="p-4">Size &amp; Dimensions</th>
                          <th className="p-4">Leg Options</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE3D5]">
                        {group.items.map((p) => {
                          const active = isMadeToOrderActive(p);
                          return (
                            <tr key={p.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg bg-[#EFE9DF] border border-[#D9CFBF] overflow-hidden shrink-0">
                                    <img
                                      src={getDirectImageUrl(p.imageUrl || '/images/made_to_order_hero.png')}
                                      alt={p.productName}
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                      onError={(e) => {
                                        const fallback = getDriveFallbackUrl(p.imageUrl);
                                        if (e.currentTarget.src !== fallback) {
                                          e.currentTarget.src = fallback;
                                        }
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <span className="font-serif text-sm font-semibold text-[#1F1B18] block">{p.productName}</span>
                                    <span className="text-[10px] text-[#7A6F64]">Lead time: {p.leadTime || '3–4 Weeks'}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[11px] border border-gray-200">
                                  {p.productCode}
                                </span>
                              </td>
                              <td className="p-4 font-medium text-[#1F1B18]">
                                {p.startingPrice ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E0D7C9] text-xs">
                                    <span className="text-[9px] uppercase tracking-wider text-[#7A6F64]">Starting from</span>
                                    <strong className="font-serif">
                                      {p.startingPrice.toLowerCase().startsWith('starting from')
                                        ? p.startingPrice.replace(/^starting\s+from\s*/i, '').trim()
                                        : p.startingPrice.toLowerCase().startsWith('from')
                                        ? p.startingPrice.replace(/^from\s*/i, '').trim()
                                        : p.startingPrice}
                                    </strong>
                                  </span>
                                ) : (
                                  <span className="text-[#A89E93] italic">—</span>
                                )}
                              </td>
                              <td className="p-4 text-[#4A4036] max-w-[190px]">
                                {p.size && (
                                  <span className="font-semibold text-[#1F1B18] block text-[11px] truncate" title={p.size}>
                                    {p.size}
                                  </span>
                                )}
                                <span className="text-[10px] text-[#7A6F64] block truncate" title={p.finishedDimensions}>
                                  {p.finishedDimensions || '—'}
                                </span>
                              </td>
                              <td className="p-4 text-[#4A4036] max-w-[200px] truncate" title={p.legOptions}>
                                {p.legOptions || '—'}
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => toggleMadeToOrderProductActive(p.id)}
                                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                                    active ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                                  }`}
                                >
                                  {active ? 'Active' : 'Deactivated'}
                                </button>
                              </td>
                              <td className="p-4 text-right space-x-1.5">
                                <button
                                  onClick={() => handleEditMadeToOrder(p)}
                                  className="p-1.5 hover:bg-[#EFE9DF] rounded text-[#4A4036] hover:text-[#1F1B18] cursor-pointer"
                                  title="Edit silhouette"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteMadeToOrderProduct(p.id)}
                                  className="p-1.5 hover:bg-red-50 rounded text-red-600 cursor-pointer"
                                  title="Delete silhouette"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#FAF8F5]/30 text-xs text-[#7A6F64] space-y-2">
                    <p>No silhouettes match your current search or status filter in this collection.</p>
                    <button
                      onClick={() => handleOpenNewMadeToOrder(group.key)}
                      className="px-3 py-1.5 bg-[#2C2723] text-white text-xs rounded-md"
                    >
                      + Add New Silhouette to {group.title}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {groupedMtoCollections.length === 0 && (
              <div className="p-12 text-center bg-white border border-[#E0D7C9] rounded-xl space-y-3">
                <Layers className="w-8 h-8 text-[#A89E93] mx-auto" />
                <p className="font-serif text-lg text-[#1F1B18]">No Made to Order Silhouettes Found</p>
                <p className="text-xs text-[#7A6F64]">Try clearing your search or filter to see products.</p>
                <button
                  onClick={() => {
                    setMtoSearch('');
                    setMtoFilter('all');
                    setMtoCollectionTab('all');
                  }}
                  className="mt-2 px-4 py-2 bg-[#2C2723] text-white text-xs rounded-md cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Portfolio */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-2xl text-[#1F1B18]">Portfolio Case Studies</h2>
              <p className="text-xs text-[#7A6F64]">Manage interactive restoration sliders and stories.</p>
            </div>
            <button
              onClick={() => {
                setEditingProjectId(null);
                setShowProjectModal(true);
              }}
              className="px-4 py-2 bg-[#2C2723] text-white text-xs rounded"
            >
              Add Case Study
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioProjects.map((proj) => (
              <div key={proj.id} className="bg-white border rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif text-lg font-medium">{proj.title}</h4>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditProject(proj)} className="p-1 hover:bg-[#EFE9DF] rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deletePortfolioProject(proj.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <img src={getDirectImageUrl(proj.beforeImage)} alt="Before" className="h-28 w-full object-cover rounded" />
                  <img src={getDirectImageUrl(proj.afterImage)} alt="After" className="h-28 w-full object-cover rounded" />
                </div>
                <p className="text-xs text-[#5E5248] line-clamp-2">{proj.shortStory}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-[#1F1B18]">Customer Quote Leads ({enquiries.length})</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-3">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  onClick={() => {
                    setSelectedEnquiry(enq);
                    setEnquiryAdminNote(enq.adminNotes || '');
                  }}
                  className={`p-4 rounded-xl border cursor-pointer ${selectedEnquiry?.id === enq.id ? 'border-[#2C2723] bg-[#F4EFE6]' : 'border-[#E0D7C9] bg-white'}`}
                >
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-mono text-[#8B6B48]">#{enq.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#2C2723] text-white uppercase">{enq.status}</span>
                  </div>
                  <h4 className="font-serif text-base font-medium">{enq.customer.name} — {enq.furnitureType}</h4>
                  <p className="text-xs text-[#7A6F64]">{enq.customer.townPostcode} • {enq.customer.email}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-6">
              {selectedEnquiry && (
                <div className="bg-white border rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <h3 className="font-serif text-xl">{selectedEnquiry.customer.name}</h3>
                      <p className="text-xs text-[#7A6F64]">{selectedEnquiry.customer.email} • {selectedEnquiry.customer.telephone}</p>
                    </div>
                    <select
                      value={selectedEnquiry.status}
                      onChange={(e) => updateEnquiryStatus(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                      className="text-xs border rounded p-1"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quote_sent">Quote Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="text-xs space-y-2">
                    <p><strong>Piece:</strong> {selectedEnquiry.furnitureType}</p>
                    <p><strong>Details:</strong> {selectedEnquiry.projectDetails}</p>
                    {selectedEnquiry.photos?.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {selectedEnquiry.photos.map((ph, idx) => (
                          <img key={idx} src={getDirectImageUrl(ph)} alt="upload" className="aspect-square object-cover rounded" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 border-t pt-3">
                    <label className="text-xs font-semibold block">Artisan Note:</label>
                    <textarea
                      rows={2}
                      value={enquiryAdminNote}
                      onChange={(e) => setEnquiryAdminNote(e.target.value)}
                      className="w-full p-2 border rounded text-xs"
                    />
                    <button
                      onClick={() => updateEnquiryNotes(selectedEnquiry.id, enquiryAdminNote)}
                      className="px-3 py-1 bg-[#2C2723] text-white text-xs rounded"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: FAQs */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-2xl text-[#1F1B18]">Frequently Asked Questions ({faqs.length})</h2>
            </div>
            <button
              onClick={() => {
                setEditingFaqId(null);
                setFaqForm({ category: 'upholstery', question: '', answer: '' });
                setShowFaqModal(true);
              }}
              className="px-4 py-2 bg-[#2C2723] text-white text-xs rounded"
            >
              Add FAQ
            </button>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="bg-white border rounded-xl p-4 space-y-1">
                <div className="flex justify-between">
                  <h4 className="font-serif text-base font-medium">{f.question}</h4>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingFaqId(f.id); setFaqForm(f); setShowFaqModal(true); }} className="p-1 hover:bg-stone-100 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => deleteFAQ(f.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <p className="text-xs text-[#5E5248]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-[#1F1B18]">Live Lead & Conversion Analytics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border rounded-xl">
              <span className="text-xs text-[#7A6F64]">Etsy Shop Clicks</span>
              <div className="font-serif text-2xl font-bold">{analyticsEvents.filter(e => e.eventType === 'etsy_click').length}</div>
            </div>
            <div className="p-4 bg-white border rounded-xl">
              <span className="text-xs text-[#7A6F64]">Quote Starts</span>
              <div className="font-serif text-2xl font-bold">{analyticsEvents.filter(e => e.eventType === 'quote_start').length}</div>
            </div>
            <div className="p-4 bg-white border rounded-xl">
              <span className="text-xs text-[#7A6F64]">Completed Quotes</span>
              <div className="font-serif text-2xl font-bold text-emerald-700">{enquiries.length}</div>
            </div>
            <div className="p-4 bg-white border rounded-xl">
              <span className="text-xs text-[#7A6F64]">Messages</span>
              <div className="font-serif text-2xl font-bold">{analyticsEvents.filter(e => e.eventType === 'contact_submit').length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-xl border overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
            <div className="bg-[#2C2723] text-white p-4 flex justify-between items-center">
              <h3 className="font-serif text-lg">{editingProductId ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowProductModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs grow">
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <input type="text" required value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value as ProductCategory })} className="w-full p-2 border rounded bg-white">
                    <option value="cushions">Artisan Cushions</option>
                    <option value="footstools">Handmade Footstools</option>
                    <option value="pet_furniture">Pet Collection</option>
                    <option value="preloved_restored">Preloved & Restored</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Price (£)</label>
                  <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} className="w-full p-2 border rounded bg-white" />
                </div>
              </div>
              <ImageUploadInput
                id="admin-product-img"
                label="Product Image"
                value={productForm.images[0] || ''}
                onChange={(val) => setProductForm({ ...productForm, images: [val] })}
              />
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="block font-medium mb-1">Story Behind the Piece</label>
                <textarea rows={2} value={productForm.storyBehindThePiece || productForm.story || ''} onChange={(e) => setProductForm({ ...productForm, storyBehindThePiece: e.target.value, story: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="block font-medium mb-1">Specifications & Dimensions</label>
                <input type="text" value={productForm.specificationsAndDimensions || ''} onChange={(e) => setProductForm({ ...productForm, specificationsAndDimensions: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <div>
                <label className="block font-medium mb-1">Materials (one per line)</label>
                <textarea rows={2} value={materialsInput} onChange={(e) => setMaterialsInput(e.target.value)} className="w-full p-2 border rounded bg-white" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="mPast" checked={productForm.isPastUpholstery} onChange={(e) => setProductForm({ ...productForm, isPastUpholstery: e.target.checked })} />
                <label htmlFor="mPast">In Past Upholstery Carousel</label>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#2C2723] text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Made to Order Modal */}
      {showMadeToOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-xl border overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
            <div className="bg-[#2C2723] text-white p-4 flex justify-between items-center">
              <h3 className="font-serif text-lg">{editingMadeToOrderId ? 'Edit Bespoke Product' : 'Add Bespoke Product'}</h3>
              <button onClick={() => setShowMadeToOrderModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveMadeToOrder} className="p-6 overflow-y-auto space-y-4 text-xs grow">
              <div>
                <label className="block font-medium mb-1">Product Name *</label>
                <input type="text" required value={madeToOrderForm.productName} onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, productName: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Collection / Category *</label>
                  <select 
                    value={madeToOrderForm.category || 'Footstool Collection'} 
                    onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, category: e.target.value })} 
                    className="w-full p-2 border rounded bg-white text-xs"
                  >
                    <option value="Footstool Collection">Footstool Collection</option>
                    <option value="Pouffe Collection">Pouffe Collection</option>
                    <option value="Ottoman & Bench Collection">Ottoman &amp; Bench Collection</option>
                    <option value="Pet Collection">Pet Collection</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Code *</label>
                  <input type="text" required value={madeToOrderForm.productCode} onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, productCode: e.target.value })} className="w-full p-2 border rounded bg-white font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Size *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Medium (90 x 60 cm) or Standard Round (48 cm dia)"
                    value={madeToOrderForm.size || ''}
                    onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, size: e.target.value })}
                    className="w-full p-2 border rounded bg-white text-xs"
                  />
                  <p className="text-[10px] text-[#7A6F64] mt-0.5">Displayed on product card as the primary Size.</p>
                </div>
                <div>
                  <label className="block font-medium mb-1">Finished Dimensions (without legs)</label>
                  <input
                    type="text"
                    placeholder="e.g. 90 W x 60 D x 25 H cm (without legs)"
                    value={madeToOrderForm.finishedDimensions || ''}
                    onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, finishedDimensions: e.target.value })}
                    className="w-full p-2 border rounded bg-white text-xs"
                  />
                  <p className="text-[10px] text-[#7A6F64] mt-0.5">Exact width, depth, and height specifications.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Starting from</label>
                  <input
                    type="text"
                    placeholder="e.g. £295 or From £295"
                    value={madeToOrderForm.startingPrice || ''}
                    onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, startingPrice: e.target.value })}
                    className="w-full p-2 border rounded bg-white font-mono"
                  />
                  <p className="text-[10px] text-[#7A6F64] mt-0.5">Displayed on each image with the label "Starting from".</p>
                </div>
                <div>
                  <label className="block font-medium mb-1">Lead Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 3–4 Weeks"
                    value={madeToOrderForm.leadTime || ''}
                    onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, leadTime: e.target.value })}
                    className="w-full p-2 border rounded bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Leg Options</label>
                <input type="text" value={madeToOrderForm.legOptions} onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, legOptions: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <ImageUploadInput
                id="admin-mto-img"
                label="Product Image"
                value={madeToOrderForm.imageUrl || ''}
                onChange={(val) => setMadeToOrderForm({ ...madeToOrderForm, imageUrl: val })}
              />
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea rows={3} value={madeToOrderForm.productDescription} onChange={(e) => setMadeToOrderForm({ ...madeToOrderForm, productDescription: e.target.value })} className="w-full p-2 border rounded bg-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowMadeToOrderModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#2C2723] text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Hard Drive Uploader Modal */}
      {showQuickUploaderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] border rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-lg">Upload from Hard Drive</h3>
              <button onClick={() => setShowQuickUploaderModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <ImageUploadInput
              id="quick-modal-uploader"
              label="Select Image"
              value={quickUploadedImage}
              onChange={(val) => setQuickUploadedImage(val)}
            />
            {quickUploadedImage && (
              <div className="p-3 bg-white border rounded space-y-2 text-xs">
                <span className="font-semibold block">Quickly apply to:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { setContentForm({ ...contentForm, heroBannerUrl: quickUploadedImage }); setShowQuickUploaderModal(false); }} className="p-2 border rounded text-left hover:bg-stone-50">Homepage Banner</button>
                  <button onClick={() => { setContentForm({ ...contentForm, logoUrl: quickUploadedImage }); setShowQuickUploaderModal(false); }} className="p-2 border rounded text-left hover:bg-stone-50">Brand Logo</button>
                </div>
              </div>
            )}
            <div className="flex justify-end pt-2 border-t">
              <button onClick={() => setShowQuickUploaderModal(false)} className="px-4 py-2 bg-[#2C2723] text-white rounded text-xs">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-[#FAF8F5] max-w-lg w-full rounded-xl border p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-serif text-lg">{editingFaqId ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button onClick={() => setShowFaqModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <input type="text" required placeholder="Question" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} className="w-full p-2 border rounded bg-white" />
              <textarea rows={4} required placeholder="Answer" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} className="w-full p-2 border rounded bg-white" />
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowFaqModal(false)} className="px-3 py-1.5 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#2C2723] text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
