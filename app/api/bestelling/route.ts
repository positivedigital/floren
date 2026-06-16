import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const appUrl = process.env.NEXTAUTH_URL || ''
    const hostname = appUrl ? new URL(appUrl).hostname : 'floren'
    const appName = 'Floren'

    const htmlBody = `
      <div style="font-family: 'Public Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #313030;">
        <div style="background: #fcf8f7; padding: 32px; border-radius: 16px;">
          <h2 style="color: #313030; margin: 0 0 4px 0; font-size: 22px;">Nieuwe bestelling ontvangen</h2>
          <p style="color: #767872; font-size: 14px; margin: 0 0 24px 0;">Via de ${data.solutionTitle} bestelpagina</p>

          <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #767872; margin: 0 0 12px 0;">Bestelling</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872;">Product</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">${data.solutionTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">${data.isSubscription ? 'Abonnement' : 'Pakket'}</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #f0ece4;">${data.planName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">Prijs</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #f0ece4;">${data.price} ${data.period || ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">Betaalmethode</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right; border-top: 1px solid #f0ece4;">${data.paymentMethod}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #767872; margin: 0 0 12px 0;">Klantgegevens</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872;">Naam</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">${data.naam}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">E-mail</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;"><a href="mailto:${data.email}" style="color: #313030;">${data.email}</a></td>
              </tr>
              ${data.organisatie ? `
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">Organisatie</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">${data.organisatie}</td>
              </tr>` : ''}
              ${data.telefoon ? `
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">Telefoon</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">${data.telefoon}</td>
              </tr>` : ''}
              ${data.aantalGebruikers ? `
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">Aantal gebruikers</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">${data.aantalGebruikers}</td>
              </tr>` : ''}
              ${data.beroep ? `
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #767872; border-top: 1px solid #f0ece4;">Beroep</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; text-align: right;">${data.beroep}</td>
              </tr>` : ''}
            </table>
          </div>

          ${data.opmerkingen ? `
          <div style="background: white; padding: 20px; border-radius: 12px;">
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #767872; margin: 0 0 8px 0;">Opmerkingen</h3>
            <p style="font-size: 14px; margin: 0; line-height: 1.5;">${data.opmerkingen}</p>
          </div>` : ''}

          <p style="color: #767872; font-size: 12px; margin-top: 20px; text-align: center;">
            Ontvangen op ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}
          </p>
        </div>
      </div>
    `

    const response = await fetch('https://candidplatform.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        app_id: process.env.WEB_APP_ID,
        notification_id: process.env.NOTIF_ID_BESTELLING_GEPLAATST,
        subject: `Nieuwe bestelling: ${data.solutionTitle} (${data.planName})`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'esther.meijers@brandpotential.com',
        reply_to: data.email,
        sender_email: `noreply@${hostname}`,
        sender_alias: appName,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      if (result.notification_disabled) {
        console.log('Order notification disabled, skipping email')
        return NextResponse.json({ success: true, message: 'Bestelling verwerkt (notificatie uitgeschakeld)' })
      }
      throw new Error(result.message || 'Failed to send notification')
    }

    return NextResponse.json({ success: true, message: 'Bestelling notificatie verstuurd' })
  } catch (error) {
    console.error('Order notification error:', error)
    return NextResponse.json({ success: false, message: 'Notificatie kon niet verstuurd worden' }, { status: 500 })
  }
}
