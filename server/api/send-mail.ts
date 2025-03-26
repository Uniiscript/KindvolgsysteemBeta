// server/api/send-mail.ts
import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const resend = new Resend(config.RESEND_API_KEY);

  interface Child {
    name: string;
    birthdate: string;
    age: string;
  }

  const contact = Object.keys(body.contactOptions || {})
    .filter((k) => body.contactOptions[k])
    .join(', ');

  const children = (body.children as Child[]) || [];

  const childrenHtml = children
    .map(
      (child, i) => `
        <li style="margin-bottom: 10px;">
          <strong>Kind ${i + 1}:</strong><br/>
          Naam: ${child.name}<br/>
          Geboortedatum: ${child.birthdate}<br/>
          Leeftijd: ${child.age}
        </li>
      `
    )
    .join('');

  const emailHtml = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px;">
      <h2 style="color: #8e44ad;">🎉 Nieuwe contactformulier-inzending</h2>

      <h3 style="margin-top: 20px;">👤 Gegevens van de ouder</h3>
      <p><strong>Naam:</strong> ${body.parentName || '-'}</p>
      <p><strong>Contactvoorkeur:</strong> ${contact || '-'}</p>
      <p><strong>Telefoonnummer:</strong> ${body.phone || '-'}</p>
      <p><strong>E-mailadres:</strong> ${body.email || '-'}</p>

      <h3 style="margin-top: 20px;">👶 Kinderen</h3>
      <p><strong>Aantal:</strong> ${body.numChildren}</p>
      <ul style="padding-left: 20px;">${childrenHtml}</ul>

      ${
        body.expecting
          ? `
        <h3 style="margin-top: 20px;">🤰 Zwangerschap</h3>
        <p>Ouder is in verwachting.</p>
        <p><strong>Uitgerekende datum:</strong> ${body.dueDate}</p>
        `
          : ''
      }

      <hr style="margin-top: 30px;"/>
      <p style="font-size: 0.8em; color: #888;">
        Deze e-mail is automatisch verzonden via het contactformulier op je website.
      </p>
    </div>
  `;

  try {
    const { data: _data, error } = await resend.emails.send({
      from: 'contact@jouwdomein.nl', // ✅ geverifieerd bij Resend
      to: ['jijzelf@domein.nl'],     // 📨 jouw e-mailadres
      subject: 'Nieuwe inzending contactformulier 🎉',
      html: emailHtml,
    });

    if (error) {
      console.error(error);
      return { success: false, error };
    }

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, error: e };
  }
});
