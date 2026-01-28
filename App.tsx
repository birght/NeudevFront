
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Components from './pages/Components';
import Designs from './pages/Designs';
import AdminDashboard from './pages/AdminDashboard';
import { UserRole } from './types';
import { SettingsProvider } from './context/SettingsContext';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.DEVELOPER);

  return (
    <SettingsProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar userRole={userRole} onRoleSwitch={(role) => setUserRole(role)} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doces/introduction" element={<Documentation />} />
              <Route path="/components" element={<Components />} />
              <Route path="/designs" element={<Designs />} />
              <Route path="/admin" element={<AdminDashboard userRole={userRole} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-white border-t py-8 px-4 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} DevFront Community Hub. Built for teams, by teams.
          </footer>
        </div>
      </HashRouter>
    </SettingsProvider>
  );
};

export default App;
