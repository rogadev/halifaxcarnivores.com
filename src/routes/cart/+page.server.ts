import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { sendOrderEmail } from '$lib/server/email';

export const actions = {
  placeOrder: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const notes = data.get('notes') as string;

    // Get cart items from the request body
    const items = JSON.parse(data.get('items') as string);

    // Verify availability for all items
    const availability = await Promise.all(
      items.map(async (item: any) => {
        const plant = await prisma.plant.findUnique({
          where: { id: item.id },
          select: { qtyAvailable: true }
        });
        return {
          id: item.id,
          available: plant?.qtyAvailable ?? 0
        };
      })
    );

    // Check if any items exceed available quantity
    const unavailableItems = availability.filter(
      (item) => {
        const orderItem = items.find((i: any) => i.id === item.id);
        return orderItem.quantity > item.available;
      }
    );

    if (unavailableItems.length > 0) {
      error(400, {
        message: 'Some items are no longer available in the requested quantity'
      });
    }

    // Create order and update quantities
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          email,
          notes,
          items: {
            create: items.map((item: any) => ({
              plantId: item.id,
              quantity: item.quantity
            }))
          }
        }
      });

      // Update plant quantities
      await Promise.all(
        items.map((item: any) =>
          tx.plant.update({
            where: { id: item.id },
            data: {
              qtyAvailable: {
                decrement: item.quantity
              },
              qtyOrdered: {
                increment: item.quantity
              }
            }
          })
        )
      );

      return order;
    });

    // Send email notification
    await sendOrderEmail({
      to: 'ryanroga@gmail.com',
      order,
      items
    });

    return {
      orderId: order.id
    };
  }
}; 
