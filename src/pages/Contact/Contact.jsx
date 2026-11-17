
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  ArrowUpRight,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import SectionLayout from '../../layouts/SectionLayout/SectionLayout';
import styles from './Contact.module.scss';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/moedepga';

// WhatsApp logo
function WhatsAppIcon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.48 0 .13 5.34.13 11.91c0 2.1.55 4.16 1.6 5.98L0 24l6.27-1.64a11.9 11.9 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.46-8.43ZM12.06 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.28c0-5.46 4.45-9.9 9.91-9.9a9.84 9.84 0 0 1 7.01 2.9 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.93 9.9Zm5.44-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

// LinkedIn logo
function LinkedInIcon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8.1 18.5H5.14V9h2.96v9.5ZM6.62 7.7a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM18.5 18.5h-2.95v-4.62c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.77 1.2-1.77 2.43v4.7H9.3V9h2.83v1.3h.04c.39-.74 1.36-1.53 2.8-1.53 2.99 0 3.54 1.97 3.54 4.54v5.19Z" />
    </svg>
  );
}

// Contact options
const contactMethods = [
  {
    label: 'Email',
    description: 'Send me an email',
    href: 'mailto:hannahdomaa@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    description: "Let's have a quick call",
    href: 'tel:+2349023189602',
    icon: Phone,
  },
  {
    label: 'WhatsApp',
    description: 'Message me directly',
    href: 'https://wa.me/2349023189602',
    icon: WhatsAppIcon,
  },
  {
    label: 'LinkedIn',
    description: 'Connect professionally',
    href: 'https://www.linkedin.com/in/hannah-johnson-006734193',
    icon: LinkedInIcon,
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus('loading');
    setFeedback('');

    // Include the honeypot field in the Formspree request.
    const formElement = event.currentTarget;
    const honeypotValue =
      new FormData(formElement).get('_gotcha') || '';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Portfolio enquiry: ${formData.subject}`,
          _gotcha: honeypotValue,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.errors?.map((error) => error.message).join(', ') ||
            'Unable to send your message. Please try again.'
        );
      }

      setStatus('success');
      setFeedback(
        "Thank you for reaching out! I'll get back to you soon."
      );

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setFeedback(
        'We could not send your message. Please try again or contact me directly.'
      );

      console.error('Contact form submission failed:', error);
    }
  };

  return (
    <SectionLayout
      eyebrow="CONTACT"
      title="Let's Work Together"
      description="Have a project in mind or need reliable support? I'd love to hear from you."
    >
      <div className={styles.content}>
        {/* Contact Information */}
        <motion.div
          className={styles.contactInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.infoHeading}>
            <span className={styles.sectionLabel}>GET IN TOUCH</span>

            <h2>I'd love to hear from you.</h2>

            <p>
              Whether you have a question, need assistance, or want to discuss
              working together, feel free to reach out.
            </p>
          </div>

          {/* Compact Contact Cards */}
          <div className={styles.contactGrid}>
            {contactMethods.map(
              ({ label, description, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={
                    label === 'LinkedIn' || label === 'WhatsApp'
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    label === 'LinkedIn' || label === 'WhatsApp'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className={styles.contactCard}
                  aria-label={`${label}: ${description}`}
                >
                  <span className={styles.contactIcon}>
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <span className={styles.contactDetails}>
                    <span className={styles.contactLabel}>
                      {label}
                    </span>

                    <span className={styles.contactDescription}>
                      {description}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={14}
                    className={styles.contactArrow}
                    aria-hidden="true"
                  />
                </a>
              )
            )}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.formHeading}>
            <span className={styles.sectionLabel}>SEND A MESSAGE</span>

            <h2>Let's start a conversation.</h2>

            <p>Fill out the form below and I'll get back to you.</p>
          </div>

          {status === 'success' ? (
            <div className={styles.successState} role="status">
              <CheckCircle2 size={42} aria-hidden="true" />

              <h3>Message Sent!</h3>

              <p>{feedback}</p>

              <button
                type="button"
                className={styles.resetButton}
                onClick={() => {
                  setStatus('idle');
                  setFeedback('');
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Spam protection honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className={styles.honeypot}
              />

              <div className={styles.field}>
                <label htmlFor="contact-name">Your Name</label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  maxLength={100}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email">Email Address</label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  maxLength={254}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-subject">Subject</label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="How can I help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={150}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message">Your Message</label>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me a little about what you need..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={5000}
                />
              </div>

              {status === 'error' && (
                <div className={styles.errorMessage} role="alert">
                  <AlertCircle size={17} aria-hidden="true" />
                  <span>{feedback}</span>
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    Sending Message...
                    <span className={styles.spinner} />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={17} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className={styles.formNote}>
                Your information will only be used to respond to your inquiry.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </SectionLayout>
  );
}

export default Contact;
