import getCurrentUser from "./actions/getCurrentUser";
import { getListing } from "./actions/getListing";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/ListingCard/ListingCard";

export default async function Home() {
  const listing = await getListing();
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
        <div className="card-list-wrapper">
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
