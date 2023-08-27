import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavourites from "../actions/getFavourites";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {
  const favourites = await getFavourites();
  const currentUser = await getCurrentUser();

  if (favourites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="Looks like you have no favourites yet. "
        />
      </ClientOnly>
    );
  };

  return (
    <ClientOnly>
      <FavouritesClient
        favourites={favourites}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
};

export default FavouritesPage;