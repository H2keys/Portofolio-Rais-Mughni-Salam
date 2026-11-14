import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/common/PageTransition';
import { Container } from '../components/common/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <PageTransition keyName="not-found">
      <PageHeader
        backTo="/"
        backLabelKey="common.backHome"
        eyebrow="404"
        title={t('notFound.title')}
      />

      <section className="py-20">
        <Container className="rounded-[30px] border border-white/10 bg-[#101010] p-10 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d6a15b]">404</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.07em] text-[#f7f5f1] sm:text-4xl">{t('notFound.title')}</h2>
          <p className="mt-4 text-base text-[#c8c1b8]">{t('notFound.message')}</p>
          <div className="mt-8 inline-flex">
            <Button as="link" to="/">{t('notFound.cta')}</Button>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
