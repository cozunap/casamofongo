export async function onRequestPost(context) {
  try {
    const { request } = context;
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

    // Google Apps Script production deployment URL
    const gasUrl = 'https://script.google.com/macros/s/AKfycbwkP_BaQmJUigJm4NobnDiuayQcw5PZv4b6D6dwdj0UcuCYDBnOjLZVGOW3i21IMUT2/exec';

    // Send securely from Cloudflare backend to Google Apps Script
    const gasResponse = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(mailPayload)
    });

    const gasResult = await gasResponse.text().catch(() => '');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Form submitted and delivered successfully',
      receipt: gasResult.substring(0, 50)
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
