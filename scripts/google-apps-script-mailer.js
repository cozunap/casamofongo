/**
 * Google Apps Script - Mailer para La Casa Del Mofongo
 * 
 * Este script recibe las solicitudes de Reservaciones y Mensajes de Contacto
 * desde tu sitio web y te envía un correo electrónico directamente a mofongomd@gmail.com
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var recipient = "mofongomd@gmail.com";
    
    var isReservation = data.formType === "reservation" || data.formType === "Online Table Reservation";
    var subject = isReservation 
      ? "🍽️ [Nueva Reservación] " + (data.name || "Cliente") + " - " + (data.date || "Fecha no especificada")
      : "📩 [Nuevo Mensaje de Contacto] " + (data.name || "Cliente") + " - " + (data.subject || "Consulta General");
    
    var htmlBody = "";
    
    if (isReservation) {
      htmlBody = `
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
      htmlBody = `
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

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody,
      replyTo: data.email || recipient
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Email sent" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
