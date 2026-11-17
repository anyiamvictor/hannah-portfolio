
import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import styles from './DesktopNavigation.module.scss';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

function DesktopNavigation() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          H<span>.</span>J
        </NavLink>

        <nav className={styles.navigation}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-indicator"
                      className={styles.indicator}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className={styles.hireButton}>
          Hire Me
          <ArrowUpRight size={16} />
        </NavLink>
      </div>
    </header>
  );
}

export default DesktopNavigation;
