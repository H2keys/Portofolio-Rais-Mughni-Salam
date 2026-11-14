import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/common/PageTransition';
import { Container } from '../components/common/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { SocialLinks } from '../components/common/SocialLinks';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <PageHeader
        backTo="/"
        backLabelKey="common.backHome"
        eyebrow={t('contact.title')}
        title={t('contact.title')}
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-base leading-8 text-[#c5bfb7]">{t('contact.subtitle')}</p>
            <SocialLinks className="contact-methods mt-8" />
          </div>

          <ContactForm />
        </Container>
      </section>
    </PageTransition>
  );
}
