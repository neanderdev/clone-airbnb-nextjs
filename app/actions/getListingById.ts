import prisma from "../lib/prismadb";

interface IParams {
  listingId?: string;
}

export async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      include: {
        user: true,
      },
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
