import PortfolioHero from '../../components/hero/PortfolioHero';
import styles from './SectionLayout.module.scss';

function SectionLayout({ eyebrow, title, description, children }) {
  return (
    <section className={styles.section}>
      <PortfolioHero
        variant="section"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}

export default SectionLayout;