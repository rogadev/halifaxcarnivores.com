import { prisma } from '$lib/server/utils/prisma';
import type { Plant, Pot, Tag } from '@prisma/client';
import type { DisplayedPlantItem } from '$lib/types';

export const load = async () => {
  const featuredPlants = await prisma.plant.findMany({
    include: {
      pots: {
        where: {
          isDiscontinued: false,
          OR: [
            // Priority 1: New items in stock
            {
              isNewItem: true,
              isComingSoon: false
            },
            // Priority 2: Regular items in stock 
            {
              isNewItem: false,
              isComingSoon: false,
              price: { gt: 0 }
            },
            // Priority 3: Coming soon items
            {
              isComingSoon: true
            },
            // Priority 4: Sale items
            {
              isOnSale: true,
            }
          ]
        }
      }
    },
    where: {
      pots: {
        some: {
          isDiscontinued: false,  // This ensures the plant only shows if it has at least one non-discontinued pot
          OR: [
            { isNewItem: true },
            { price: { gt: 0 } },
            { isComingSoon: true },
            { isOnSale: true }
          ]
        }
      }
    }
  });

  /** Combines plant taxonomic properties (genus, species, cultivar, variety) into a single name string */
  const extractName = (plant: Plant) => [plant.genus, plant.species, plant.cultivar, plant.variety]
    .filter(Boolean)
    .join(' ');

  const extractTags = (plant: Plant): string[] => plant.tags.map((tag) => tag.name);

  const plants: DisplayedPlantItem[] = featuredPlants.map((plant) => {
    const pots: Pot[] = plant.pots;
    const tags: Tag[] = plant.tags;

    // we want to return a FeaturedPlant object from the plant, pots, and tags.
    const featuredPlant: DisplayedPlantItem = {
      id: plant.id,
      name: extractName(plant),
      description: plant.description,
      tags: extractTags(plant),
      featuredImage: plant.featuredImage ?? plant.images[0] ?? null,
      images: plant.images,
      minPrice: getPriceDisplay(pots).min,
      maxPrice: getPriceDisplay(pots).max,
      isNewItem: plant.isNewItem,
      isOnSale: plant.isOnSale,
      isComingSoon: plant.isComingSoon
    };
  });

  return { plants };
}; 
