
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ExternalLink,
  Building2,
} from 'lucide-react';

import SectionLayout from '../../layouts/SectionLayout/SectionLayout';
import CreativeShowcase from '../../components/creative-showcase/CreativeShowcase';
import styles from './Experience.module.scss';

const experiences = [
  {
    id: 'resswell',
    company: 'Resswell Catering Services',
    shortName: 'Resswell',
    logo: `${import.meta.env.BASE_URL}images/experience/logo.png`,
    role: 'Operations & Business Manager',
    period: 'Present',
    description:
      "I oversee business operations while supporting the company's digital presence, customer engagement, and promotional activities.",
    responsibilities: [
      'Coordinating daily business operations',
      'Managing social media accounts',
      'Designing promotional flyers and marketing materials',
      'Editing videos for digital content',
      'Supporting customer communication',
      'Coordinating business activities',
    ],
    website: 'https://resswellcatering.com/',
    instagram: 'https://www.instagram.com/resswellcatering/',
  },
  {
    id: 'helpstation',
    company: 'HelpStation',
    shortName: 'HelpStation',
    logo: `${import.meta.env.BASE_URL}images/experience/help-station.jpg`,
    role: 'Client & Partner Manager',
    period: '2023',
    description:
      'I supported client and partner relationships, helping maintain effective communication and coordination.',
    responsibilities: [
      'Managing client and partner relationships',
      'Supporting client communication and engagement',
      'Coordinating requests and follow-ups',
      'Assisting with client and partner support',
      'Facilitating relationship management',
    ],
    website: 'https://helpstation.ng/',
  },
  {
    id: 'che-spice-house',
    company: 'Che Spice House',
    shortName: 'Che Spice',
    logo: `${import.meta.env.BASE_URL}images/experience/chespicehouse.jpeg`,
    role: 'Social Media & Content Support',
    description:
      'I supported the brand’s social media presence through visual content creation, photography, and image editing.',
    responsibilities: [
      'Managing social media accounts',
      'Creating promotional graphics and images',
      'Taking photographs for social media content',
      'Editing and enhancing images',
      'Preparing visual content for online engagement',
    ],
    instagram: 'https://www.instagram.com/chespicehouse/',
  },
  {
    id: 'ovuacomp',
    company: 'Ovuacomp',
    shortName: 'Ovuacomp',
    logo: `${import.meta.env.BASE_URL}images/experience/ovuacomp.jpeg`,
    role: 'Virtual Assistant',
    description:
      'I provided virtual assistance to Ovuacomp by supporting customer communications, handling service requests, and helping ensure customers received timely and helpful responses.',
    responsibilities: [
      'Managing customer inquiries and correspondence',
      'Handling customer requests and following up where necessary',
      'Providing timely assistance to customers',
      'Supporting the coordination of customer service activities',
      'Helping maintain organized and responsive customer communication',
    ],
  },

];

function Experience() {
  const [activeTab, setActiveTab] = useState('history');
  const [activeEmployer, setActiveEmployer] = useState('resswell');

  const selectedExperience = experiences.find(
    (experience) => experience.id === activeEmployer
  );

  return (
    <SectionLayout
      eyebrow="MY EXPERIENCE"
      title="My Experience"
      description="Experience that supports your business."
    >
      {/* Main navigation */}
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Experience sections"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'history'}
          className={`${styles.tab} ${
            activeTab === 'history' ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab('history')}
        >
          Work History
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'creative'}
          className={`${styles.tab} ${
            activeTab === 'creative' ? styles.activeTab : ''
          }`}
          onClick={() => setActiveTab('creative')}
        >
          Creative Showcase
        </button>
      </div>

      {/* Main content */}
      <div className={styles.tabContent}>
        <AnimatePresence mode="wait">
          {activeTab === 'history' ? (
            <motion.div
              key="history"
              className={styles.historyContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Employer selector */}
              <div
                className={styles.employerTabs}
                role="tablist"
                aria-label="Work history"
              >
                {experiences.map((experience) => (
                  <button
                    key={experience.id}
                    type="button"
                    role="tab"
                    aria-selected={activeEmployer === experience.id}
                    className={`${styles.employerTab} ${
                      activeEmployer === experience.id
                        ? styles.activeEmployerTab
                        : ''
                    }`}
                    onClick={() => setActiveEmployer(experience.id)}
                  >
                    <span className={styles.employerLogo}>
                      {experience.logo ? (
                        <img
                          src={experience.logo}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <Building2 size={18} />
                      )}
                    </span>

                    <span>{experience.shortName}</span>
                  </button>
                ))}
              </div>

              {/* Selected employer */}
              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedExperience.id}
                  className={styles.experienceCard}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.timelineMarker}>
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className={styles.cardHeader}>
                    <div>
                 
                      <div className={styles.companyHeading}>
                        <div className={styles.companyLogo}>
                          {selectedExperience.logo ? (
                            <img
                              src={selectedExperience.logo}
                              alt={`${selectedExperience.company} logo`}
                            />
                          ) : (
                            <Building2 size={24} />
                          )}
                        </div>

                        <h2>{selectedExperience.company}</h2>
                      </div>

                      <h3>{selectedExperience.role}</h3>
                    </div>
                  </div>

                  <p className={styles.description}>
                    {selectedExperience.description}
                  </p>

                  <div className={styles.responsibilities}>
                    <h4>Key Responsibilities</h4>

                    <ul>
                      {selectedExperience.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {(selectedExperience.website ||
                    selectedExperience.instagram) && (
                    <div className={styles.externalLinks}>
                      {selectedExperience.website && (
                        <a
                          href={selectedExperience.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Company Website <ExternalLink size={15} />
                        </a>
                      )}

                      {selectedExperience.instagram && (
                        <a
                          href={selectedExperience.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Instagram <ArrowUpRight size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </motion.article>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="creative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CreativeShowcase />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionLayout>
  );
}

export default Experience;







