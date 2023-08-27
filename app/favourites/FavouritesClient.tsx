"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/ListingCard/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface IProps {
  favourites: SafeListing[];
  currentUser?: SafeUser | null;
};

const FavouritesClient = ({
  favourites,
  currentUser
}: IProps) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of your favourite places!"
      />
      <div className="mt-10 card-list-wrapper">
        {favourites.map((favourite) => (
          <ListingCard
            key={favourite.id}
            currentUser={currentUser}
            data={favourite}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;