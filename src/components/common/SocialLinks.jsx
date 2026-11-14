import { Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { socialLinks } from '../../data/socialLinks';

const icons = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  whatsapp: MessageCircle,
};

export function SocialLinks({ className = '' }) {
  const { t } = useTranslation();

  return (
    <nav className={className} aria-label={t('contact.socialNavigation')}>
      {Object.entries(socialLinks).map(([key, social]) => {
        const Icon = icons[key];
        const isEmail = key === 'email';
        return (
          <a
            key={key}
            href={social.url}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{social.label}</span>
          </a>
        );
      })}
    </nav>
  );
}