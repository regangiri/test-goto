import toTitleCaseString from "@/helper/toTitleCaseString";
import useDebounce from "@/helper/useDebounce";
import getContacts from "@/services/getContacts";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const useContacts = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debouncedInput = useDebounce<string>(search, 500);

  const { loading, error, data, refetch } = useQuery(getContacts, {
    variables: {
      order_by: { first_name: "asc" },
    },
  });

  useEffect(() => {
    const refetchContacts = async () => {
      await refetch({
        where: {
          _or: [
            {
              first_name: {
                _ilike: `%${toTitleCaseString(search)}%`,
              },
            },
            {
              last_name: {
                _ilike: `%${toTitleCaseString(search)}%`,
              },
            },
          ],
        },
      });
    };

    refetchContacts();
  }, [debouncedInput]);

  const redirectToDetail = (contactId: number) => {
    router.push(`/detail/${contactId}`);
  };

  const redirectToAdd = () => {
    router.push("/add");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return {
    loading,
    error,
    contacts: data ? data.contact : [],
    redirectToDetail,
    redirectToAdd,
    handleSearch,
  };
};

export default useContacts;
