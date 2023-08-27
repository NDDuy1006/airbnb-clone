import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
}

export default async function getListing(
  params: IListingParams
) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    };

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