export const dynamic = "force-dynamic";

import getCurrentUser from "./actions/getCurrentUser";
import getListing, { IListingParams } from "./actions/getListing";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/ListingCard/ListingCard";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listing = await getListing(searchParams);
  const currentUser = await getCurrentUser();

  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  };

  return (
    <ClientOnly>
      <Container>
        <div className="pt-16 card-list-wrapper">
          {listing.map((item) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={item.id}
                data={item}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
