
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BriefcaseBusiness,
  Headset,
  Share2,
  Workflow,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { Link } from 'react-router';

import SectionLayout from '../../layouts/SectionLayout/SectionLayout';
import styles from './Services.module.scss';

const services = [
  {
    id: 'admin',
    icon: BriefcaseBusiness,
    title: 'Administrative Support',
    mobileTitle: 'Admin',
    description:
      'Keeping your daily operations organized and running smoothly.',
    tasks: [
      'Email management',
      'Calendar management',
      'Appointment scheduling',
      'Data entry',
      'Document preparation',
      'Online research',
      'Spreadsheet management',
    ],
  },
  {
    id: 'client',
    icon: Headset,
    title: 'Client & Customer Support',
    mobileTitle: 'Support',
    description:
      'Helping you maintain professional and positive client relationships.',
    tasks: [
      'Customer inquiry management',
      'Email and chat support',
      'Client follow-ups',
      'Customer communication',
      'Relationship management',
      'Feedback coordination',
    ],
  },
  {
    id: 'social',
    icon: Share2,
    title: 'Social Media & Content Support',
    mobileTitle: 'Social',
    description:
      'Supporting your digital presence with organized content and creative execution.',
    tasks: [
      'Social media management',
      'Content scheduling',
      'Promotional flyer design',
      'Short-form video editing',
      'Social media engagement',
      'Basic content creation',
    ],
  },
  {
    id: 'business',
    icon: Workflow,
    title: 'Business Support',
    mobileTitle: 'Business',
    description:
      'Helping entrepreneurs manage everyday business responsibilities.',
    tasks: [
      'Task coordination',
      'Meeting scheduling',
      'Business correspondence',
      'Workflow coordination',
      'Information organization',
      'Operational assistance',
    ],
  },
];

function Services() {
  const [activeService, setActiveService] = useState('admin');

  const selectedService = services.find(
    (service) => service.id === activeService
  );

  const Icon = selectedService.icon;

  return (
    <SectionLayout
      eyebrow="MY SERVICES"
      title="How I Support Your Business"
      description="Dependable administrative, customer, and business support to help you stay organized and focus on what matters most."
    >
      {/* Service category navigation */}
      <div
        className={styles.serviceTabs}
        role="tablist"
        aria-label="Service categories"
      >
        {services.map((service) => {
          const TabIcon = service.icon;

          return (
            <button
              key={service.id}
              type="button"
              role="tab"
              aria-selected={activeService === service.id}
              aria-controls={`service-panel-${service.id}`}
              id={`service-tab-${service.id}`}
              className={`${styles.serviceTab} ${
                activeService === service.id
                  ? styles.activeServiceTab
                  : ''
              }`}
              onClick={() => setActiveService(service.id)}
            >
              <TabIcon size={20} strokeWidth={1.6} />

              <span>
                <span className={styles.desktopLabel}>
                  {service.title}
                </span>

                <span className={styles.mobileLabel}>
                  {service.mobileTitle}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected service */}
      <div className={styles.serviceContent}>
        <AnimatePresence mode="wait">
          <motion.article
            key={selectedService.id}
            id={`service-panel-${selectedService.id}`}
            role="tabpanel"
            aria-labelledby={`service-tab-${selectedService.id}`}
            className={styles.servicePanel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.serviceHeader}>
              <div className={styles.iconBox}>
                <Icon size={26} strokeWidth={1.6} />
              </div>

              <div>
                <h2>{selectedService.title}</h2>
                <p>{selectedService.description}</p>
              </div>
            </div>

            <div className={styles.serviceTasks}>
              <h3>What I can help with</h3>

              <ul>
                {selectedService.tasks.map((task) => (
                  <li key={task}>
                    <Check size={16} />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contact"
              className={styles.serviceLink}
            >
              Discuss this service <ArrowUpRight size={16} />
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* General CTA */}
      <div className={styles.cta}>
        <p>Need help keeping your business organized?</p>

        <Link to="/contact">
          Let's Work Together <ArrowUpRight size={17} />
        </Link>
      </div>
    </SectionLayout>
  );
}

export default Services;
