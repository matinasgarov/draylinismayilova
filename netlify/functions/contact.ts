import { Resend } from 'resend'

// Netlify Functions v2 handler (web-standard Request/Response).
// Endpoint: /.netlify/functions/contact
export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: { name?: string; email?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || !email || !message) {
    return json({ error: 'name, email and message are required' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email address' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return json({ error: 'Email service is not configured' }, 500)
  }

  const resend = new Resend(apiKey)
  // FROM must be on a Resend-verified domain in production.
  // onboarding@resend.dev works for testing but only delivers to the
  // Resend account owner's own email address.
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'
  const to = process.env.CONTACT_TO_EMAIL ?? 'matinasgarov21@gmail.com'

  const { error } = await resend.emails.send({
    from: `Aylin Ismayilova Website <${from}>`,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<h2>New contact form message</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
  })

  if (error) {
    console.error('Resend error:', error)
    return json({ error: 'Failed to send message' }, 502)
  }

  return json({ ok: true }, 200)
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
