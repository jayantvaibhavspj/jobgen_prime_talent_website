import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AmbientLights from './components/AmbientLights';
import Header from './components/Header';
import Footer from './components/Footer';
import PrimeBot from './components/PrimeBot';
import PortalModal from './components/PortalModal';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Specialisations from './pages/Specialisations';
import SalaryCalculator from './pages/SalaryCalculator';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [openBotSignal, setOpenBotSignal] = useState(0);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleOpenBot = () => {
    setOpenBotSignal(prev => prev + 1);
  };

  return (
    <>
      <ScrollToTop />
      {/* Background ambient lighting orbs */}
      <AmbientLights />

      {/* Floating Capsule Header */}
      <Header />

      {/* Main Page Content with SPA transition */}
      <main id="page-content" className="spa-fade-in">
        <Routes>
          <Route path="/" element={<Home onShowToast={showToast} onOpenBot={handleOpenBot} />} />
          <Route path="/about" element={<About />} />
          <Route path="/specialisations" element={<Specialisations />} />
          <Route path="/salary-calculator" element={<SalaryCalculator />} />
          <Route path="/contact" element={<Contact onShowToast={showToast} />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home onShowToast={showToast} onOpenBot={handleOpenBot} />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer onOpenPortal={() => setIsPortalOpen(true)} />

      {/* Interactive Draggable PrimeBot Copilot */}
      <PrimeBot externalOpenSignal={openBotSignal} />

      {/* Portal Login Modal */}
      <PortalModal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
        onShowToast={showToast} 
      />

      {/* Toast Notification */}
      <Toast message={toastMsg} isVisible={toastVisible} />
    </>
  );
}
