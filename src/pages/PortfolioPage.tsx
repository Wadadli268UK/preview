import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { PortfolioProject } from '../types';
import { Sparkles, ArrowRight, Check, MapPin, Scissors, Star } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { portfolioProjects, openQuoteWithContext } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'armchair', label: 'Wingbacks & Armchairs' },
    { id: 'chaise', label: 'Chaise Longues & Daybeds' },
    { id: 'dining', label: 'Dining Sets' },
  ];

  const filteredProjects = portfolioProjects.filter((proj) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'armchair') return proj.furnitureType.toLowerCase().includes('chair') || proj.furnitureType.toLowerCase().includes('wingback');
    if (selectedFilter === 'chaise') return proj.furnitureType.toLowerCase().includes('chaise');
    if (selectedFilter === 'dining') return proj.furnitureType.toLowerCase().includes('dining');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24 font-sans">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">
          The Craftsmanship Archive
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1F1B18] tracking-tight font-normal">
          Before & After Transformations
        </h1>
        <p className="text-sm sm:text-base text-[#5E5248] leading-relaxed font-light">
          Explore a curated selection of previous client reupholstery commissions, antique restorations, and bespoke handmade pieces. Slide between the before and after images to see the restoration journey.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E8DCC4]">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === f.id
                ? 'bg-[#2C2723] text-white shadow-xs'
                : 'text-[#5E5248] hover:bg-[#EFE9DF]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project Case Studies Grid */}
      <div className="space-y-16">
        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id}
            className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left Column: Interactive Before/After Slider */}
            <div className="lg:col-span-6 space-y-3">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                beforeLabel="Before Restoration"
                afterLabel="After Reupholstery"
                aspectRatio="aspect-4/3"
              />
              <div className="flex items-center justify-between text-[11px] text-[#7A6F64] px-1">
                <span>Drag the handle left/right to reveal the full transformation</span>
                {project.clientLocation && (
                  <span className="flex items-center gap-1 font-medium text-[#2C2723]">
                    <MapPin className="w-3 h-3 text-[#8B6B48]" /> {project.clientLocation}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Case Study Breakdown & Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1.5 border-b border-[#E8DCC4] pb-4">
                <div className="flex items-center justify-between text-xs text-[#7A6F64]">
                  <span className="uppercase tracking-widest font-semibold text-[10px] text-[#8B6B48]">
                    {project.category}
                  </span>
                  <span>{project.furnitureType}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1B18] font-medium leading-snug">
                  {project.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed">
                {project.shortStory}
              </p>

              {/* Work Completed Checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-[#1F1B18] block">Craftsmanship & Work Completed:</span>
                <ul className="space-y-1.5 text-xs text-[#5E5248]">
                  {project.workCompleted.map((work, wIdx) => (
                    <li key={wIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8B6B48] shrink-0 mt-0.5" />
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fabric Specification */}
              <div className="p-3 bg-[#EFE9DF] rounded-lg border border-[#E0D7C9] text-xs text-[#4A4036] flex items-center justify-between">
                <span className="text-[#7A6F64]">Fabric Specified:</span>
                <strong className="text-[#1F1B18] font-medium">{project.fabricUsed}</strong>
              </div>

              {/* Testimonial Quote */}
              {project.testimonial && (
                <div className="p-4 bg-[#FAF0E6]/70 border-l-2 border-[#8B6B48] rounded-r-lg space-y-1 text-xs text-[#5E5248]">
                  <p className="italic">"{project.testimonial.quote}"</p>
                  <span className="font-semibold text-[#1F1B18] block text-[11px]">
                    — {project.testimonial.author}, {project.testimonial.location}
                  </span>
                </div>
              )}

              {/* Specific CTA for this piece */}
              <div className="pt-2">
                <button
                  onClick={() => openQuoteWithContext(`Commission similar to: ${project.title}`)}
                  className="px-6 py-3 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                  <span>Have Something Similar? Request a Quote</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Conversion Prompt */}
      <div className="bg-[#EFE9DF] border border-[#D9CFBF] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5">
        <h3 className="font-serif text-3xl text-[#1F1B18]">Do you have a cherished piece waiting for revival?</h3>
        <p className="text-xs sm:text-sm text-[#5E5248] max-w-lg mx-auto">
          We would love to discuss your furniture’s possibilities. Upload photos through our simple quote form and receive tailored advice.
        </p>
        <button
          onClick={() => openQuoteWithContext('Portfolio Page Bottom CTA')}
          className="px-8 py-3.5 bg-[#2C2723] text-white text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors cursor-pointer"
        >
          Start Your Upholstery Enquiry
        </button>
      </div>
    </div>
  );
};
