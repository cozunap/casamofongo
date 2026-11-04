export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json().catch(() => null);

    if (!body) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { formType, name, phone, email, date, time, guests, requests, subject, message } = body;

    // Secure destination email kept purely on server side
    const destinationEmail = 'mofongomd@gmail.com';

    // Build plain text and HTML representation of submission
    const isReservation = formType === 'reservation';
    const emailSubject = isReservation
      ? `[Nueva Reservación] La Casa Del Mofongo: ${name || 'Cliente'} (${date || 'Sin fecha'})`
      : `[Nuevo Mensaje de Contacto] La Casa Del Mofongo: ${name || 'Cliente'} - ${subject || 'Consulta'}`;

    const submissionData = {
      timestamp: new Date().toISOString(),
      formType: isReservation ? 'Online Table Reservation' : 'Contact / Inquiry Message',
      recipient: destinationEmail,
      details: {
        name: name || 'N/A',
        phone: phone || 'N/A',
        email: email || 'N/A',
        ...(isReservation
          ? {
              date: date || 'N/A',
              time: time || 'N/A',
              guests: guests || 'N/A',
              specialRequests: requests || 'None'
            }
          : {
              subject: subject || 'General',
              message: message || 'N/A'
            })
      }
    };

    // Log internally on Cloudflare Functions dashboard
    console.log(`[Form Submission to ${destinationEmail}]`, JSON.stringify(submissionData));

    // Optional native webhook/relay if configured via Cloudflare Environment Variable
    if (env && env.MAILER_WEBHOOK_URL) {
      try {
        await fetch(env.MAILER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: destinationEmail,
            subject: emailSubject,
            ...submissionData
          })
        });
      } catch (err) {
        console.error('Webhook relay failed:', err);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Submission received successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
