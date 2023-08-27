import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingItemById from "@/app/actions/getListingItemById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingItemClient from "./ListingItemClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}


const ListingDetailPage = async ({ params }: { params: IParams }) => {
  const listingItem = await getListingItemById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listingItem) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingItemClient
        listingItem={listingItem}
        reservations={reservations}
        currentUser = {currentUser}
      />
    </ClientOnly>
  );
};

export default ListingDetailPage;