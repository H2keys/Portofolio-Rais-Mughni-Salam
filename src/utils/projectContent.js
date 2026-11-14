export function getLocalizedProjectText(value, language) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';

  const locale = language?.startsWith('id') ? 'id' : 'en';
  return value[locale] ?? value.en ?? value.id ?? '';
}