import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUserFavourite {
  listingId: string;
  currentUser?: SafeUser | null
};

const useFavourite = ({
  listingId,
  currentUser
}: IUserFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavoutite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    };

    try {
      let request;

      if (hasFavourited) {
        request = () => axios.delete(`/api/favourites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favoutites/${listingId}`)
      }

      await request();
      router.refresh();
      toast.success("Success")
    } catch {
      toast.error("Something went wrong.")
    }
  }, [
    currentUser,
    hasFavourited,
    listingId,
    loginModal,
    router
  ]);

  return {
    hasFavourited,
    toggleFavoutite
  }
};

export default useFavourite;