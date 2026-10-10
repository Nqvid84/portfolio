import { useState, type ReactElement } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar/Navbar";
import { Menu } from "@/components/Menu/Menu";
import { Hero } from "@/sections/Hero/Hero";
import { Skills } from "@/sections/Skills/Skills";
import { Experience } from "@/sections/Experience/Experience";
import { Contact } from "@/sections/Contact/Contact";
import { navLinks } from "@/data/portfolio.data";
import { useMousePosition } from "@/hooks/useMousePosition";

// Map href → section component
const sectionMap: Record<string, ReactElement> = {
  "#home": <Hero />,
  "#skills": <Skills />,
  "#experience": <Experience />,
  "#contact": <Contact />,
};

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [navLocation, setNavLocation] = useState<string>("#home");
  const { x, y } = useMousePosition();

  const currentPage = sectionMap[navLocation] ?? <Hero />;

  return (
    <main className="w-full h-[100dvh] overflow-x-hidden flex flex-col bg-zinc-900 justify-center items-center">
      <Navbar
        links={navLinks}
        open={menuVisible}
        location={navLocation}
        onNavClick={(href) => setNavLocation(href)}
        onMenuClick={() => setMenuVisible(!menuVisible)}
      />

      <Menu
        links={navLinks}
        open={menuVisible}
        navLocation={navLocation}
        onSelect={(href) => {
          setNavLocation(href);
          setMenuVisible(false);
        }}
        onClose={() => setMenuVisible(false)}
      />

      {/* Page container */}
      <div className="w-[92%] sm:w-[90%] h-[88%] sm:h-[90%] text-white bg-zinc-950 mt-10 sm:mt-8 border-white border-2 rounded-xl flex flex-col justify-center p-3 sm:p-4 lg:p-6 items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <div key={navLocation} className="w-full h-full">
            {currentPage}
          </div>
        </AnimatePresence>
      </div>

      {/* Custom cursor — fine-pointer desktops only */}
      <div
        className="custom-cursor justify-center items-center pointer-events-none mix-blend-difference w-6 h-6 border-white border-2 rounded-full fixed translate-x-[-50%] translate-y-[-50%] z-50"
        style={{ top: y, left: x }}
      />
    </main>
  );
}

export default App;
