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

  return {
    id,
    loading,
    error,
    contactDetail: data ? data.contact_by_pk : {},
  };
};
export default useDetail;
