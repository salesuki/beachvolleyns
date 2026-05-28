import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Supabase Database Webhook calls this endpoint when a new contact_submission is inserted.
// Setup in Supabase: Database → Webhooks → Create Webhook
//   Table: contact_submissions | Event: INSERT
//   HTTP method: POST | URL: https://your-domain.vercel.app/api/contact-notify
//   HTTP Headers: x-webhook-secret: <your secret>

export async function POST(req: NextRequest) {
  // Verify webhook secret to prevent unauthorized calls
  const secret = req.headers.get('x-webhook-secret');
  if (process.env.WEBHOOK_SECRET && secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { record?: { name?: string; email?: string; message?: string; created_at?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, message, created_at } = body.record ?? {};
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const notifyEmail = process.env.NOTIFICATION_EMAIL;
  if (!notifyEmail || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const date = created_at
    ? new Date(created_at).toLocaleString('sr-RS', { timeZone: 'Europe/Belgrade' })
    : new Date().toLocaleString('sr-RS', { timeZone: 'Europe/Belgrade' });

  const { error } = await resend.emails.send({
    from: 'NS Beach Volleyball <onboarding@resend.dev>',
    to: notifyEmail,
    subject: `Nova poruka od ${name} — NS BVC Sajt`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f5f5; padding: 24px; border-radius: 12px;">
        <div style="background: #202657; border-radius: 8px; padding: 20px 24px; margin-bottom: 20px;">
          <h2 style="color: #dfd344; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">
            Nova poruka sa sajta
          </h2>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px;">${date}</p>
        </div>
        <div style="background: white; border-radius: 8px; padding: 20px 24px; margin-bottom: 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 80px;">Ime</td>
              <td style="padding: 8px 0; color: #202657; font-weight: 600; font-size: 15px;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1b7eb2; font-size: 15px;">${email}</a></td>
            </tr>
          </table>
        </div>
        <div style="background: white; border-radius: 8px; padding: 20px 24px; margin-bottom: 20px;">
          <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px;">Poruka</p>
          <p style="color: #333; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <div style="text-align: center;">
          <a href="mailto:${email}?subject=Re: Poruka sa sajta"
             style="display: inline-block; background: #dfd344; color: #202657; padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 14px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
            Odgovori direktno
          </a>
        </div>
        <p style="text-align: center; color: #bbb; font-size: 11px; margin-top: 20px;">
          NS Beach Volleyball Club · beachvolleyns.vercel.app
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
