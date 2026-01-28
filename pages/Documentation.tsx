
import React from 'react';

const Documentation: React.FC = () => {
  const sidebarItems = [
    { title: 'Getting Started', items: ['Introduction', 'Installation', 'Workflow'] },
    { title: 'Developer Guide', items: ['Uploading Components', 'Coding Standards', 'Naming Conventions'] },
    { title: 'Admin Guide', items: ['Audit Process', 'User Management', 'Analytics'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <nav className="space-y-8 sticky top-24">
          {sidebarItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-sm block py-1.5 transition-colors ${
                        item === 'Introduction' ? 'text-indigo-600 font-medium' : 'text-slate-600 hover:text-indigo-600'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <article className="flex-grow prose prose-slate max-w-none">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Introduction</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Welcome to the DevFront Community Hub documentation. This platform is designed to streamline front-end development within our organization.
          </p>
        </div>

        <section className="space-y-8">
          <div className="p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
            <h4 className="text-indigo-800 font-bold m-0 mb-2">The Mission</h4>
            <p className="text-indigo-700 m-0">
              Our goal is to eliminate duplicate effort by providing a searchable repository of audited components and code snippets that follow our internal design system.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 pt-6">How it Works</h2>
          <p className="text-slate-600">
            The platform serves two primary audiences: <strong>Developers</strong> who build and consume components, and <strong>Administrators</strong> who maintain quality and standards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="border border-slate-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Component</h3>
              <p className="text-sm text-slate-500 mb-4">Developers can submit new components via the Management panel. Each submission requires code, description, and preview image.</p>
              <span className="text-indigo-600 text-xs font-bold uppercase">Learn More →</span>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Review Process</h3>
              <p className="text-sm text-slate-500 mb-4">Admins receive notifications of pending submissions. They audit the code for performance, accessibility, and standard compliance.</p>
              <span className="text-indigo-600 text-xs font-bold uppercase">Learn More →</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 pt-6">Technical Stack</h2>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li><strong>Frontend:</strong> Vue 3 with Vite</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
            <li><strong>Backend:</strong> NestJS with PostgreSQL</li>
            <li><strong>State:</strong> Pinia</li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default Documentation;
