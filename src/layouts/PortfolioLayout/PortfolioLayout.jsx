
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';

import DesktopNavigation from '../../components/navigation/DesktopNavigation';
import MobileBottomNavigation from '../../components/navigation/MobileBottomNavigation';

import styles from './PortfolioLayout.module.scss';

function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <span>
        © {new Date().getFullYear()} Hannah Johnson. All rights reserved.
      </span>

      <span className={styles.credit}>
        An{' '}
        <a
          href="https://anyiamvictor.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit the OVUA portfolio"
        >
          OVUA
        </a>{' '}
        concept
      </span>
    </footer>
  );
}

function PortfolioLayout() {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <DesktopNavigation />

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <PortfolioFooter />

      <MobileBottomNavigation />
    </div>
  );
}

export default PortfolioLayout;
