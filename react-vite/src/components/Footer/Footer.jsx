import { NavLink } from 'react-router-dom';
import './Footer.css';
import OpenDevModal from './OpenDevModal';
import { useEffect, useRef, useState } from 'react';
import Tariq from './Tariq';
import Joy from './Joy';
import Minyu from './Minyu';

function Footer() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const toggleMenu = e => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  return (
    <ul className='secondary-dark footer'>
      <p>The devs:</p>
      <li className='footer-button'>
        <OpenDevModal
          itemText='Tariq'
          onItemClick={closeMenu}
          modalComponent={<Tariq />}
        />
      </li>
      <li>
        <OpenDevModal
          itemText='Joy'
          onItemClick={closeMenu}
          modalComponent={<Joy />}
        />
      </li>
      <li>
        <OpenDevModal
          itemText='Minyu'
          onItemClick={closeMenu}
          modalComponent={<Minyu />}
        />
      </li>
    </ul>
  );
}

export default Footer;
