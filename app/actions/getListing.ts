import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListing(
  params: IListingParams
) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    };

    if (category) {
      query.category = category;
    };

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      };
    };

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    };

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    };

    if (locationValue) {
      query.locationValue = locationValue;
    };

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listing = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      }
    });

    const safeListing = listing.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))
    return safeListing;
  } catch (error: any) {
    throw new Error(error)
  };
};