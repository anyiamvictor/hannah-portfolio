
import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import {
  House,
  UserRound,
  BriefcaseBusiness,
  ClipboardList,
  Mail,
} from 'lucide-react';

import styles from './MobileBottomNavigation.module.scss';

const links = [
  { label: 'Home', to: '/', Icon: House },
  { label: 'About', to: '/about', Icon: UserRound },
  { label: 'Services', to: '/services', Icon: BriefcaseBusiness },
  { label: 'Experience', to: '/experience', Icon: ClipboardList },
  { label: 'Contact', to: '/contact', Icon: Mail },
];

function MobileBottomNavigation() {
  return (
    <nav className={styles.navigation} aria-label="Mobile navigation">
      <div className={styles.navLinks}>
        {links.map(({ label, to, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className={styles.indicator}
                    transition={{ duration: 0.25 }}
                  />
                )}

                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  aria-hidden="true"
                />

                <span className={styles.label}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className={styles.navCredit}>
        An{' '}
        <a
          href="https://wa.me/2347013723537"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact OVUA on WhatsApp"
        >
          OVUA
        </a>{' '}
        concept
      </div>
    </nav>
  );
}

export default MobileBottomNavigation;
