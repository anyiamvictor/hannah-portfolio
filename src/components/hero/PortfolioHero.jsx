
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import styles from './PortfolioHero.module.scss';

function PortfolioHero({
  variant = 'home',
  eyebrow,
  title,
  description,
}) {
  const isSection = variant === 'section';

  return (
    <section className={`${styles.hero} ${isSection ? styles.sectionHero : ''}`}>
      {/* Introduction */}
      <div className={styles.intro}>
        <motion.div
          className={styles.portraitColumn}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65 }}
        >
          <div className={styles.portraitFrame}>
            <img
              src={`${import.meta.env.BASE_URL}images/profile/hannah.jpeg`}
              alt="Hannah Johnson"
              className={styles.portrait}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.introContent}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {eyebrow || 'ADMINISTRATIVE & BUSINESS SUPPORT'}
          </span>

          <h1 className={styles.headline}>
            {isSection ? title : (
              <>
                Your Reliable Partner in{' '}
                <span>Getting Things Done.</span>
              </>
            )}
          </h1>
        </motion.div>
      </div>

      {/* Supporting Description */}
      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {isSection ? (
          description
        ) : (
          <>
            <span className={styles.desktopDescription}>
              I help entrepreneurs and growing businesses stay organized,
              manage everyday operations, and deliver exceptional client
              experiences through dependable administrative and digital support.
            </span>

            <span className={styles.mobileDescription}>
              I help busy entrepreneurs stay organized and manage everyday
              tasks with dependable administrative support.
            </span>
          </>
        )}
      </motion.p>

      {!isSection && (
        <>
       

          {/* Calls to Action */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/contact" className={styles.primaryButton}>
              Hire Me <ArrowUpRight size={17} />
            </Link>

            <Link to="/services" className={styles.secondaryButton}>
              Explore Services <MoveRight size={17} />
            </Link>
          </motion.div>

          

             {/* Value Proposition */}
          <motion.p
            className={styles.valueProposition}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            Less admin. More time for what matters.
          </motion.p>

          {/* Hero Footer */}
          <div className={styles.heroFooter}>
          

            {/* Professional Qualities */}
            <motion.div
              className={styles.valueStrip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
            >
              <span>Organized</span>
              <span>Efficient</span>
              <span>Proactive</span>
              <span>Detail-Oriented</span>
            </motion.div>
          </div>

            {/* Availability */}
            <motion.div
              className={styles.availability}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <span className={styles.availabilityDot} />
              Available for remote opportunities
            </motion.div>
        </>
      )}
    </section>
  );
}

export default PortfolioHero;


