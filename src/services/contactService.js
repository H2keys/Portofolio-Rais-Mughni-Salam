export async function submitContactForm(values) {
  const endpoint = import.meta.env.VITE_CONTACT_SERVICE_ENDPOINT;

  if (!endpoint) {
    return {
      ok: false,
      reason: 'not-configured',
      message: 'Contact form is not connected yet.',
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    return { ok: false, reason: 'request-failed', message: 'Request failed.' };
  }

  return { ok: true, reason: 'success', message: 'Message sent.' };
}
