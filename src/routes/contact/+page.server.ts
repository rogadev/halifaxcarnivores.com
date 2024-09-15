import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

export const actions: Actions = {
  default: async ({ request }) => {
    // Extract form data
    const formData = await request.formData();
    const firstName = formData.get('first-name') as string;
    const lastName = formData.get('last-name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phone-number') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return fail(400, { error: 'Missing required fields' });
    }

    /** --- Region Gatekeeping --- */

    // Get user's IP address
    let ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';

    // Handle multiple IPs (take the first one)
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }

    // Use a geolocation API to get location (e.g., ip-api.com)
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const locationData = await geoResponse.json();

    if (locationData.status !== 'success') {
      return fail(400, { error: 'Could not determine your location.' });
    }

    const region = locationData.regionName;

    // Check if the user is in Halifax, Nova Scotia
    if (region !== 'Nova Scotia') {
      return fail(403, { error: "This form currently only only accepts requests from those in the province of Nova Scotia. If you're using a VPN, you may have to disable it." });
    }

    /** --- Resend --- */

    // Initialize Resend
    const resend = new Resend(RESEND_API_KEY);

    try {
      const r = await resend.emails.send({
        from: 'Halifax Carnivores <no-reply@roga.dev>',
        to: ['ryanroga@gmail.com'],
        subject: 'New Contact Form Submission',
        html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p><strong>Message:</strong><br/>${message}</p>
              `
      });

      if (r.error) {
        return fail(500, { error: r.error });
      }

      console.log(r.data);
      // Return a success response
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return fail(500, { error: 'Failed to send email.' });
    }
  }
};