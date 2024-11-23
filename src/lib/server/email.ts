import { RESEND_API_KEY } from '$env/static/private';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export async function sendOrderConfirmation(to: string, orderId: string, items: any[]) {
  try {
    const response = await resend.emails.send({
      from: 'Halifax Carnivores <orders@halifaxcarnivores.com>',
      to: [to],
      subject: `Order Confirmation #${orderId}`,
      html: `
                <h1>Thank you for your order!</h1>
                <p>Your order #${orderId} has been received and is being processed.</p>
                <h2>Order Details:</h2>
                <ul>
                    ${items.map(item => `
                        <li>${item.item.name} x ${item.quantity}</li>
                    `).join('')}
                </ul>
            `
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
} 
