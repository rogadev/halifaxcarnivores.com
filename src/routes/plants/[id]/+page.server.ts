import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { DisplayedPlantItem } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const plant = await prisma.plant.findUnique({
    where: {
      id: params.id
    },
    include: {
      plantPots: {
        include: {
          pot: true
        }
      },
      plantTags: {
        include: {
          tag: true
        }
      }
    }
  });

  if (!plant) {
    error(404, 'Plant not found');
  }

  const extractName = (plant: Plant) => [plant.genus, plant.species, plant.cultivar, plant.variety]
    .filter(Boolean)
    .join(' ');

  const extractTags = (plant: Plant): string[] => plant.tags.map((tag) => tag.name);

  const displayedPlant: DisplayedPlantItem = {
    id: plant.id,
    name: extractName(plant),
    description: plant.description,
    tags: extractTags(plant),
    featuredImage: plant.featuredImage ?? plant.images[0] ?? null,
    images: plant.images || [],
    minPrice: plant.plantPots.reduce((min, pot) => Math.min(min, pot.pot.price), Infinity),
    maxPrice: plant.plantPots.reduce((max, pot) => Math.max(max, pot.pot.price), -Infinity),
    isNewItem: plant.new,
    isOnSale: plant.onSale,
    isComingSoon: plant.comingSoon
  };

  return {
    plant: displayedPlant
  };
};


