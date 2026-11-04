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
    const destinationEmail = 'mofongomd@gmail.com';

    // Payload formatted for Google Apps Script Mailer
    const mailPayload = {
      formType: formType || 'contact',
      recipient: destinationEmail,
      name: name || '',
      phone: phone || '',
      email: email || '',
      date: date || '',
      time: time || '',
      guests: guests || '',
      requests: requests || '',
      subject: subject || '',
      message: message || ''
    };

    // Forward to Google Apps Script endpoint if configured
    const gasUrl = (env && env.GOOGLE_SCRIPT_URL) || 
      'https://script.google.com/macros/s/AKfycbzFw3vO-0s_v_cmofongo_mailer_placeholder/exec';

    if (gasUrl && !gasUrl.includes('placeholder')) {
      try {
        await fetch(gasUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mailPayload)
        });
      } catch (relayError) {
        console.error('Google Apps Script relay error:', relayError);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submitted successfully' 
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
