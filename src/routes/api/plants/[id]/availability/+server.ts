import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function GET({ params }) {
  const plant = await prisma.plant.findUnique({
    where: { id: Number(params.id) },
    select: { qtyAvailable: true }
  });

  return json({ qtyAvailable: plant?.qtyAvailable ?? 0 });
} 
