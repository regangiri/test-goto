import React, { useState } from "react";
import { PhoneBookContainer } from "..";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { FlexContainer } from "@/styles/reusable/styles";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import editContact from "@/services/editContact";
import getContactDetail from "@/services/getContactDetail";
import useEdit from "@/hooks/useEdit";

const AddContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputForm = styled.input`
  margin: 5px 0;
  width: 100%;
  padding: 2px 6px;
  border-radius: 4px;
  outline: none;
`;
const FluidLabel = styled.label`
  width: 100%;
`;
const RemoveButton = styled.button`
  padding: 2px 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: transparent;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const AddContact = () => {
  const {
    handleSubmit,
    data,
    setFirstName,
    setLastName,
    phoneNumbers,
    handlePhoneNumberChange,
    handleRemovePhoneNumber,
    handleAddPhoneNumber,
  } = useEdit();

  return (
    <>
      <p
        className={css`
          font-size: 24px;
          font-weight: 600;
          margin: 16px 0;
        `}
      >
        Add New Contact
      </p>
      <AddContactForm onSubmit={handleSubmit}>
        <FlexContainer>
          <FluidLabel>
            <FlexContainer
              direction="column"
              className={css`
                width: 80%;
              `}
            >
              First Name*
              <InputForm
                type="text"
                defaultValue={data?.contact_by_pk?.first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FlexContainer>
          </FluidLabel>
          <FluidLabel>
            <FlexContainer
              direction="column"
              className={css`
                width: 80%;
              `}
            >
              Last Name*
              <InputForm
                type="text"
                defaultValue={data?.contact_by_pk?.last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FlexContainer>
          </FluidLabel>
        </FlexContainer>
        <FluidLabel>
          Phone Numbers*
          <FlexContainer
            direction="column"
            className={css`
              width: 100%;
            `}
          >
            {phoneNumbers.map((number: string, index: number) => (
              <FlexContainer key={index}>
                <FlexContainer
                  className={css`
                    width: 150px;
                  `}
                >
                  <InputForm
                    type="text"
                    defaultValue={number}
                    onChange={(e) =>
                      handlePhoneNumberChange(index, e.target.value)
                    }
                    required
                  />
                </FlexContainer>
                {index !== 0 && (
                  <RemoveButton
                    type="button"
                    onClick={() => handleRemovePhoneNumber(index)}
                  >
                    <DeleteOutline fontSize="inherit" color="error" />
                  </RemoveButton>
                )}
              </FlexContainer>
            ))}

            <button
              className={css`
                width: 150px;
                padding: 4px 2px;
                margin: 4px 0;
                border-radius: 8px;
                align-self: center;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                &:hover {
                  background: #f4f4f4;
                }
              `}
              type="button"
              onClick={handleAddPhoneNumber}
            >
              Add Phone Number <AddOutlined fontSize="inherit" />
            </button>
          </FlexContainer>
        </FluidLabel>
        <div
          className={css`
            position: absolute;
            bottom: 6px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <button
            className={css`
              margin: 0 6px;
              padding: 8px 0;
              border-radius: 8px;
              width: 100%;
              font-size: 20px;
              font-weight: 700;
              max-width: 480px;
            `}
            type="submit"
          >
            Edit Contact
          </button>
        </div>
      </AddContactForm>
    </>
  );
};

AddContact.getLayout = (page: any) => {
  return (
    <DefaultLayout isBack={true} title="Edit Contact">
      {page}
    </DefaultLayout>
  );
};

export default AddContact;
