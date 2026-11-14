import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { FormField } from './FormField';
import { submitContactForm } from '../../services/contactService';
import { validateEmail } from '../../utils/validators';

const initialState = { name: '', email: '', message: '' };

export function ContactForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = t('common.required');
    if (!values.email.trim()) nextErrors.email = t('common.required');
    else if (!validateEmail(values.email)) nextErrors.email = t('common.invalidEmail');
    if (!values.message.trim()) nextErrors.message = t('common.required');
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    const result = await submitContactForm(values);
    if (result.ok) {
      setStatus({ type: 'success', message: t('contact.success') });
      setValues(initialState);
    } else {
      setStatus({ type: 'error', message: result.reason === 'not-configured' ? t('contact.unconfigured') : t('contact.error') });
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] border border-white/10 bg-[#101010] p-6 sm:p-8" noValidate>
      <div className="space-y-5">
        <FormField
          label={t('common.name')}
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder={t('contact.namePlaceholder')}
          error={errors.name}
          required
        />
        <FormField
          label={t('common.email')}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder={t('contact.emailPlaceholder')}
          error={errors.email}
          required
        />
        <FormField
          label={t('common.message')}
          name="message"
          type="textarea"
          value={values.message}
          onChange={handleChange}
          placeholder={t('contact.messagePlaceholder')}
          error={errors.message}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={isSubmitting} className="disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? t('common.loading') : t('common.send')}
        </Button>
      </div>

      {status.message && (
        <p className={`text-sm ${status.type === 'success' ? 'text-[#d9f5cf]' : 'text-[#fbd6ba]'}`} role="status" aria-live="polite">
          {status.message}
        </p>
      )}
    </form>
  );
}
