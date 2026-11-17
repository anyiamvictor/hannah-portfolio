
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Mail,
  CalendarDays,
  FileText,
  Palette,
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react';
import SectionLayout from '../../layouts/SectionLayout/SectionLayout';
import styles from './About.module.scss';

const approach = [
  'Organized and detail-oriented',
  'Proactive and dependable',
  'Professional communication',
  'Adaptable to new tools and workflows',
  'Committed to delivering quality work',
];

const tools = [
  { name: 'Google Workspace', icon: Mail },
  { name: 'Microsoft Office', icon: FileText },
  { name: 'Canva', icon: Palette },
  { name: 'Notion', icon: LayoutDashboard },
  { name: 'Slack', icon: MessageSquare },
  { name: 'Zoom', icon: CalendarDays },
  { name: 'Calendly', icon: CalendarDays },
];

function About() {
  const [activeTab, setActiveTab] = useState('story');

  const story = (
    <article className={styles.bio}>
      <span className={styles.sectionLabel}>MY STORY</span>
      <h2>Hi, I'm Hannah Johnson.</h2>

      <p>
        I'm a Virtual Assistant with experience in business management,
        client relationship management, administrative coordination,
        and digital content creation.
      </p>

      <p>
        My professional journey includes managing operations at Resswell
        Catering Services and working as a Client and Partner Manager at
        HelpStation.
      </p>

      <p>
        These experiences have helped me develop strong organizational
        skills, professional communication, attention to detail, and the
        ability to manage multiple responsibilities effectively.
      </p>

      <p>
        I enjoy helping businesses operate more smoothly by taking care
        of administrative tasks, organizing information, supporting
        clients, and creating digital content.
      </p>

      <p>
        My goal is simple: to provide dependable support that gives
        business owners and professionals more time to focus on what
        matters most.
      </p>
    </article>
  );

  const approachContent = (
    <section className={styles.approach}>
      <span className={styles.sectionLabel}>MY APPROACH</span>
      <h2>How I work</h2>

      <ul>
        {approach.map((item) => (
          <li key={item}>
            <CheckCircle2 size={17} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );

  const toolkitContent = (
    <section className={styles.tools}>
      <span className={styles.sectionLabel}>MY TOOLKIT</span>
      <h2>Tools I work with</h2>

      <div className={styles.toolGrid}>
        {tools.map(({ name, icon: Icon }) => (
          <div className={styles.tool} key={name}>
            <Icon size={17} strokeWidth={1.7} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const tabs = [
    { id: 'story', label: 'My Story', content: story },
    { id: 'approach', label: 'My Approach', content: approachContent },
    { id: 'toolkit', label: 'My Toolkit', content: toolkitContent },
  ];

  return (
    <SectionLayout
      eyebrow="ABOUT ME"
      title="Get to Know Hannah"
      description="A little about my professional journey, how I work, and the support I bring to businesses."
    >
      <div className={styles.content}>
        {/* Desktop Layout */}
        <div className={styles.desktopContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {story}
          </motion.div>

          <div className={styles.sideContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {approachContent}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {toolkitContent}
            </motion.div>
          </div>
        </div>

        {/* Mobile Tab Layout */}
        <div className={styles.mobileContent}>
          <div className={styles.tabs} role="tablist" aria-label="About Hannah">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`about-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls="about-panel"
                className={`${styles.tab} ${
                  activeTab === tab.id ? styles.activeTab : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            id="about-panel"
            role="tabpanel"
            aria-labelledby={`about-tab-${activeTab}`}
            className={styles.tabPanel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  );
}

export default About;
