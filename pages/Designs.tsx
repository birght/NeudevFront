
import React from 'react';

const Designs: React.FC = () => {
  const designItems = [
    { title: 'Brand Colors', category: 'Colors', description: 'The official brand palette including primary, secondary, and accent colors.', icon: '🎨' },
    { title: 'Typography System', category: 'Typography', description: 'Defined font families, sizes, and weights for all digital interfaces.', icon: 'Aa' },
    { title: 'Icon Library', category: 'Icons', description: 'Consistent SVG icon set used across all company platforms.', icon: '✨' },
    { title: 'Grid Layouts', category: 'Layout', description: 'Responsive grid standards for mobile, tablet, and desktop views.', icon: '📐' },
    { title: 'Elevation & Shadows', category: 'Styles', description: 'Visual hierarchy rules for modals, cards, and buttons.', icon: '🌑' },
    { title: 'Spacing Rules', category: 'Layout', description: 'Internal and external spacing constants for consistent UI breathing room.', icon: '📏' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Design System</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          A unified set of guidelines and visual standards to ensure brand consistency and user experience excellence across our digital products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designItems.map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video bg-slate-100 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-slate-100 group-hover:border-indigo-200 transition-all relative">
              <img src={`https://picsum.photos/seed/design${i}/600/400`} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-transparent transition-colors">
                 <span className="text-5xl drop-shadow-lg">{item.icon}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{item.category}</span>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-indigo-600 rounded-3xl text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <h2 className="text-3xl font-bold mb-4 relative z-10">Need a New Design Pattern?</h2>
        <p className="text-indigo-100 mb-8 max-w-xl mx-auto relative z-10">
          Our design system is a living entity. If you identify a gap or need a new component, start a proposal.
        </p>
        <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors relative z-10">
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default Designs;
