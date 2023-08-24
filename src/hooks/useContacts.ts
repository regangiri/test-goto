import getContacts from "@/services/getContacts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const useContacts = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(getContacts, {
    variables: {
      order_by: { first_name: "asc" },
      // limit: 10,
      // where: {
      //   first_name: { _like: "%reg%" },
      // },
    },
  });

  const redirectToDetail = (contactId: number) => {
    router.push(`/detail/${contactId}`);
  };

  return {
    loading,
    error,
    contacts: data ? data.contact : [],
    redirectToDetail,
  };
};

export default useContacts;
