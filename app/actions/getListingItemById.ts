import prisma from "@/app/libs/prismadb";

interface IParams{
  listingId?: string;
};

export default async function getListingItemById(params: IParams) {
  try {
    const { listingId } = params;

    const listingItem = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    });

    if (!listingItem) {
      return null
    };

    return {
      ...listingItem,
      createdAt: listingItem.createdAt.toISOString(),
      user: {
        ...listingItem.user,
        createdAt: listingItem.user.createdAt.toISOString(),
        updatedAt: listingItem.user.updatedAt.toISOString(),
        emailVerified: listingItem.user.emailVerified?.toISOString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}