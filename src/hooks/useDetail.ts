import deleteContact from "@/services/deleteContact";
import getContactDetail from "@/services/getContactDetail";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const useDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(getContactDetail, {
    variables: {
      id: id,
    },
  });

  const [deleteContacts] = useMutation(deleteContact);

  const redirectToEdit = (contactId: number) => {
    router.push(`/edit/${contactId}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    deleteContacts({
      variables: { id: id },
      onCompleted() {
        router.replace("/");
      },
    });
    e.preventDefault();
  };

  return {
    id,
    loading,
    error,
    contactDetail: data ? data.contact_by_pk : {},
    redirectToEdit,
    handleDelete,
  };
};
export default useDetail;
