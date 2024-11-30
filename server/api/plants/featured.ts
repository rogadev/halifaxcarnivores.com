import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  
  try {
    const featuredPlants = await prisma.plant.findMany({
      where: {
        isPublished: true,
        isNewArrival: true,
      },
      take: 6,
      select: {
        id: true,
        displayName: true,
        description: true,
        images: {
          take: 1,
          select: {
            url: true
          }
        }
      }
    })

    return featuredPlants.map(plant => ({
      id: plant.id,
      name: plant.displayName,
      description: plant.description,
      imageUrl: plant.images[0]?.url || null
    }))

  } catch (error) {
    console.error('Error fetching featured plants:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching featured plants'
    })
  } finally {
    await prisma.$disconnect()
  }
})
