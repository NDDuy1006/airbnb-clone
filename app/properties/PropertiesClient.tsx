"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/ListingCard/ListingCard";


interface IProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

const PropertiesClient = ({
  listings,
  currentUser
}: IProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div className="mt-10 card-list-wrapper">
        {listings.map((listingItem) => (
          <ListingCard
            key={listingItem.id}
            data={listingItem}
            actionId={listingItem.id}
            onAction={onCancel}
            disabled={deletingId === listingItem.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient;