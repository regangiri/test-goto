import getContactDetail from "@/services/getContactDetail";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const useDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(getContactDetail, {
    variables: {
      id: id,
    },
  });

  const redirectToEdit = (contactId: number) => {
    router.push(`/edit/${contactId}`);
  };

  return {
    id,
    loading,
    error,
    contactDetail: data ? data.contact_by_pk : {},
    redirectToEdit,
  };
};
export default useDetail;
