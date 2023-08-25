import editContact from "@/services/editContact";
import getContactDetail from "@/services/getContactDetail";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

const useEdit = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [editContacts] = useMutation(editContact);
  const { id } = router.query;

  const handlePhoneNumberChange = (index: number, value: string) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
    console.log(phoneNumbers);
  };

  const handleRemovePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const { data } = useQuery(getContactDetail, {
    variables: {
      id: id,
    },
    onCompleted(res) {
      console.log(res.contact_by_pk.phones.map((data: any) => data.number));

      setPhoneNumbers([
        ...res.contact_by_pk.phones.map((data: any) => data.number),
      ]);
      setFirstName(res.contact_by_pk.first_name);
      setLastName(res.contact_by_pk.last_name);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phones = phoneNumbers.map((number) => ({ number }));

    try {
      editContacts({
        variables: {
          id: id,
          _set: {
            first_name: firstName,
            last_name: lastName,
          },
        },
        onCompleted() {
          router.replace(`/detail/${id}`);
        },
      });
      setFirstName("");
      setLastName("");
      setPhoneNumbers([""]);
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };
  return {
    handleSubmit,
    data,
    setFirstName,
    setLastName,
    phoneNumbers,
    handlePhoneNumberChange,
    handleRemovePhoneNumber,
    handleAddPhoneNumber,
  };
};

export default useEdit;
