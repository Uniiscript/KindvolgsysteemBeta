import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }))
	}

  const body = await readBody(event)
	const config = useRuntimeConfig()
	const resend = new Resend(config.RESEND_API_KEY)

	interface Child {
    name: string
    birthdate: string
    age: string
  }

  const contact = Object.keys(body.contactOptions || {})
    .filter(k => body.contactOptions[k])
    .join(', ')

	const children = (body.children as Child[]) || []

	const childrenHtml = children
    .map(
      (child, i) => `
        <li style="margin-bottom: 10px;">
          <strong>Kind ${i + 1}:</strong><br/>
          Naam: ${child.name}<br/>
          Geboortedatum: ${child.birthdate}<br/>
          Leeftijd: ${child.age}
        </li>
      `,
		)
    .join('')

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

  const { data, error } = await resend.emails.send({
    from: `Little Steps Care Contact <little.steps.care4you@gmail.com>`,
    to: ['little.steps.care4you@gmail.com'],
    subject: 'Nieuwe inzending contactformulier 🎉',
    html: emailHtml,
  })

  if (error) {
    console.error('Fout bij verzenden van e-mail:', error)
    return {
      success: false,
      error: error.message || 'Onbekende fout in e-mailverzending',
		}
  }

  return { success: true, data }
})
