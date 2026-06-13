import { useState, useEffect } from 'react';
import { INITIAL_VEHICLES, getLocalStorageState } from './data/seedData';
import { Vehicle } from './types';
import { Navbar, Footer } from './components/Navigation';
import LiquidHero from './components/LiquidHero';
import PublicPages from './components/PublicPages';

export default function App() {
  const [currentPublicTab, setCurrentPublicTab] = useState<string>('home');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const s = getLocalStorageState();
    setVehicles(s.vehicles.length ? s.vehicles : INITIAL_VEHICLES);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentPublicTab('home');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navigateTab = (tab: string) => {
    setCurrentPublicTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <Navbar currentTab={currentPublicTab} onNavigateTab={navigateTab} />

      <div className="relative z-10 flex flex-col">
        {currentPublicTab === 'home' && (
          <LiquidHero
            onJoinAsDriver={() => navigateTab('for-drivers')}
            onJoinAsBusiness={() => navigateTab('for-companies')}
            onNavigateToSection={handleNavigateToSection}
          />
        )}

        <PublicPages
          currentTab={currentPublicTab}
          onJoinAsDriver={() => navigateTab('for-drivers')}
          onJoinAsBusiness={() => navigateTab('for-companies')}
          vehicles={vehicles}
          onApplyForRental={() => navigateTab('contact')}
        />

        <Footer onNavigateTab={navigateTab} />
      </div>
    </div>
  );
}
