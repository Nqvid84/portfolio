import { useEffect, useState } from "react";
import { Menu } from "./component/menu";
import { Navbar } from "./component/navbar";
import { Home } from "./section/home";
import { Ratio } from "./section/ratio";
import { About } from "./section/about";
import { Skills } from "./section/skills";

import '@material/web/chips/chip-set';
import '@material/web/chips/assist-chip';
import '@material/web/chips/filter-chip';
import '@material/web/select/select-option';
import '@material/web/select/outlined-select';
import '@material/web/fab/branded-fab';
import Exp from "./section/exp";
import Contact from "./section/contact";


const links = [
  {
    title: "Home",
    img: "https://i-p.rmcdn.net/65638d5ee91e4a0021d51a69/4580158/image-3da7f7ed-344b-4c12-af33-3832ead74277.png?w=807&e=webp&nll=true",
    link: "#home",
    page: <Ratio />,
  },
  // {
  //   title: "about",
  //   img: "https://i-p.rmcdn.net/65638d5ee91e4a0021d51a69/4580158/image-ed0f3d7a-108e-4a3b-8c1f-0a8c88d7ab56.png?w=801&e=webp&nll=true",
  //   link: "#about",
  //   page: <About />,
  // },
  {
    title: "skills",
    img: "https://i-p.rmcdn.net/65638d5ee91e4a0021d51a69/4580158/image-15ea3222-09f4-4682-9660-7c141e14d82b.png?w=1001&e=webp&nll=true",
    link: "#skills",
    page: <Skills />,
  },
  {
    title: "experience",
    img: "https://i-p.rmcdn.net/65638d5ee91e4a0021d51a69/4580158/image-4e9448c9-b325-4de4-b335-6485608e9217.png?w=1188&e=webp&nll=true",
    link: "#experience",
    page: <Exp/>,
  },
  {
    title: "contact",
    img: "https://i-p.rmcdn.net/65638d5ee91e4a0021d51a69/4580158/image-467bea69-b58b-4991-8126-b8943523af70.png?w=1188&e=webp&nll=true",
    link: "#contact",
    page: <Contact/>,
  },
];

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [navLocation, setNavLocation] = useState("#home");
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);

  return (
    <main className="w-[100%] h-[100vh] overflow-x-hidden flex flex-col bg-zinc-900 justify-center items-center">
      <Navbar
        links={links}
        open={menuVisible}
        location={navLocation}
        onNavClick={(link) => setNavLocation(link)}
        onMenuClick={() => setMenuVisible(!menuVisible)}
      />
      <Menu
        handleOpen={()=>setMenuVisible(true)}
        handleClose={()=>setMenuVisible(false)}
        navLocation={navLocation}
        links={links}
        open={menuVisible}
        onSelect={(link) => {
          setNavLocation(link);
          setMenuVisible(false);
        }}
      />
      <Home page={links.find((link) => link.link === navLocation).page} />
      <div
        className="flex justify-center items-center pointer-events-none mix-blend-difference w-6 h-6 border-white border-2 rounded-full fixed translate-x-[-50%] translate-y-[-50%] z-50"
        style={{ top: y, left: x }}
      />
    </main>
  );
}

export default App;
