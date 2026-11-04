/**
 * Google Apps Script - Mailer para La Casa Del Mofongo
 * 
 * Este script:
 * 1. Envía el correo con los datos a mofongomd@gmail.com
 * 2. Si el cliente ingresó su correo electrónico, le envía automáticamente una copia de confirmación con el diseño de La Casa Del Mofongo.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var adminRecipient = "mofongomd@gmail.com";
    
    var isReservation = data.formType === "reservation" || data.formType === "Online Table Reservation";
    
    // -------------------------------------------------------------
    // 1. CORREO PARA EL RESTAURANTE (mofongomd@gmail.com)
    // -------------------------------------------------------------
    var adminSubject = isReservation 
      ? "🍽️ [Nueva Reservación] " + (data.name || "Cliente") + " - " + (data.date || "Fecha no especificada")
      : "📩 [Nuevo Mensaje de Contacto] " + (data.name || "Cliente") + " - " + (data.subject || "Consulta General");
    
    var adminHtmlBody = "";
    
    if (isReservation) {
      adminHtmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #a70d1c; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; text-transform: uppercase;">Nueva Solicitud de Reservación</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">La Casa Del Mofongo - Silver Spring, MD</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #333333; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #666;">Cliente:</td>
                <td style="padding: 8px 0; font-size: 16px; font-weight: bold; color: #222;">${data.name || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Correo:</td>
                <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #a70d1c; text-decoration: none;">${data.email || 'No proporcionado'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Teléfono:</td>
                <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #a70d1c; font-weight: bold; text-decoration: none;">${data.phone || 'No especificado'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Fecha:</td>
                <td style="padding: 8px 0; font-weight: bold;">${data.date || 'No especificada'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Hora:</td>
                <td style="padding: 8px 0; font-weight: bold;">${data.time || 'No especificada'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Personas:</td>
                <td style="padding: 8px 0;">${data.guests || '2'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Peticiones especiales:</td>
                <td style="padding: 8px 0; font-style: italic;">${data.requests || 'Ninguna'}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f7f7f7; padding: 12px; text-align: center; font-size: 12px; color: #888;">
            Enviado automáticamente desde lacasadelmofongomd.net
          </div>
        </div>
      `;
    } else {
      adminHtmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #a70d1c; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; text-transform: uppercase;">Nuevo Mensaje de Contacto</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">La Casa Del Mofongo - Silver Spring, MD</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #333333; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #666;">Nombre:</td>
                <td style="padding: 8px 0; font-size: 16px; font-weight: bold; color: #222;">${data.name || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Correo:</td>
                <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #a70d1c; text-decoration: none;">${data.email || 'No especificado'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Teléfono:</td>
                <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #a70d1c; text-decoration: none;">${data.phone || 'No especificado'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Tipo / Asunto:</td>
                <td style="padding: 8px 0; font-weight: bold;">${data.subject || 'General'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Mensaje:</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${data.message || 'Sin mensaje'}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f7f7f7; padding: 12px; text-align: center; font-size: 12px; color: #888;">
            Enviado automáticamente desde lacasadelmofongomd.net
          </div>
        </div>
      `;
    }

    // Envío al restaurante
    MailApp.sendEmail({
      to: adminRecipient,
      subject: adminSubject,
      htmlBody: adminHtmlBody,
      replyTo: data.email || adminRecipient
    });

    // -------------------------------------------------------------
    // 2. CORREO DE CONFIRMACIÓN / COPIA AL CLIENTE
    // -------------------------------------------------------------
    if (data.email && data.email.indexOf("@") !== -1) {
      try {
        var clientSubject = isReservation
          ? "Confirmación: Tu solicitud de reservación en La Casa Del Mofongo"
          : "Confirmación: Hemos recibido tu mensaje - La Casa Del Mofongo";

        var clientHtmlBody = "";

        if (isReservation) {
          clientHtmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #a70d1c; color: #ffffff; padding: 25px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">LA CASA DEL MOFONGO</h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; color: #fde8e8;">Auténtico Sabor Dominicano &bull; Silver Spring, MD</p>
              </div>
              <div style="padding: 28px 24px; background-color: #ffffff; color: #333333; line-height: 1.6;">
                <h2 style="font-size: 18px; color: #a70d1c; margin-top: 0;">¡Hola ${data.name || 'estimado(a) cliente'}!</h2>
                <p style="font-size: 15px;">
                  Hemos recibido con éxito tu solicitud de reservación. A continuación encontrarás el resumen de los datos registrados:
                </p>
                <div style="background-color: #fdf8f8; border: 1px solid #f2dede; border-radius: 6px; padding: 16px; margin: 20px 0;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #666;">Fecha:</td>
                      <td style="padding: 6px 0; font-weight: bold; color: #222;">${data.date || 'Pendiente'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; color: #666;">Hora:</td>
                      <td style="padding: 6px 0; font-weight: bold; color: #222;">${data.time || 'Pendiente'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; color: #666;">Personas:</td>
                      <td style="padding: 6px 0; color: #222;">${data.guests || '2'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; color: #666;">Teléfono:</td>
                      <td style="padding: 6px 0; color: #222;">${data.phone || 'No especificado'}</td>
                    </tr>
                    ${data.requests ? `
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; color: #666;">Peticiones:</td>
                      <td style="padding: 6px 0; font-style: italic; color: #222;">${data.requests}</td>
                    </tr>` : ''}
                  </table>
                </div>
                <p style="font-size: 14px; color: #555;">
                  Nuestro equipo revisará la disponibilidad y te contactará a la brevedad al teléfono proporcionado si requiere confirmar algún detalle adicional.
                </p>
                <p style="font-size: 14px; margin-bottom: 0;">
                  Si necesitas realizar cambios o tienes alguna pregunta urgente, llámanos directamente al <a href="tel:+12408633750" style="color: #a70d1c; font-weight: bold; text-decoration: none;">(240) 863-3750</a>.
                </p>
              </div>
              <div style="background-color: #111111; color: #ffffff; padding: 18px 20px; text-align: center; font-size: 13px;">
                <p style="margin: 0 0 6px 0; font-weight: bold;">La Casa Del Mofongo</p>
                <p style="margin: 0; color: #aaa; font-size: 12px;">9441 Georgia Ave, Silver Spring, MD 20910 | (240) 863-3750</p>
                <p style="margin: 8px 0 0 0; color: #888; font-size: 11px;">lacasadelmofongomd.net</p>
              </div>
            </div>
          `;
        } else {
          clientHtmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #a70d1c; color: #ffffff; padding: 25px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">LA CASA DEL MOFONGO</h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; color: #fde8e8;">Auténtico Sabor Dominicano &bull; Silver Spring, MD</p>
              </div>
              <div style="padding: 28px 24px; background-color: #ffffff; color: #333333; line-height: 1.6;">
                <h2 style="font-size: 18px; color: #a70d1c; margin-top: 0;">¡Hola ${data.name || 'estimado(a) cliente'}!</h2>
                <p style="font-size: 15px;">
                  Gracias por comunicarte con La Casa Del Mofongo. Hemos recibido tu mensaje con éxito y te responderemos lo más pronto posible.
                </p>
                <div style="background-color: #fdf8f8; border: 1px solid #f2dede; border-radius: 6px; padding: 16px; margin: 20px 0;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #666;">Asunto:</td>
                      <td style="padding: 6px 0; font-weight: bold; color: #222;">${data.subject || 'Consulta General'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-weight: bold; color: #666; vertical-align: top;">Tu Mensaje:</td>
                      <td style="padding: 6px 0; color: #222; white-space: pre-wrap;">${data.message || 'Sin mensaje adicional'}</td>
                    </tr>
                  </table>
                </div>
                <p style="font-size: 14px; margin-bottom: 0;">
                  Para atención inmediata, pedidos para llevar o catering, puedes llamarnos directamente al <a href="tel:+12408633750" style="color: #a70d1c; font-weight: bold; text-decoration: none;">(240) 863-3750</a>.
                </p>
              </div>
              <div style="background-color: #111111; color: #ffffff; padding: 18px 20px; text-align: center; font-size: 13px;">
                <p style="margin: 0 0 6px 0; font-weight: bold;">La Casa Del Mofongo</p>
                <p style="margin: 0; color: #aaa; font-size: 12px;">9441 Georgia Ave, Silver Spring, MD 20910 | (240) 863-3750</p>
                <p style="margin: 8px 0 0 0; color: #888; font-size: 11px;">lacasadelmofongomd.net</p>
              </div>
            </div>
          `;
        }

        MailApp.sendEmail({
          to: data.email,
          subject: clientSubject,
          htmlBody: clientHtmlBody,
          replyTo: adminRecipient
        });
      } catch (clientErr) {
        // En caso de que el correo del cliente no sea válido, no interrumpimos la respuesta exitosa
        Logger.log("Error sending client confirmation: " + clientErr);
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Emails sent successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
