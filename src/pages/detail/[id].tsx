import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";
import { PhoneBookContainer, RoundedPicture } from "..";
import useDetail from "@/hooks/useDetail";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { FlexContainer } from "@/styles/reusable/styles";

interface IPhones {
  id: number;
  number: string;
}

const ContactDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DetailProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;
  margin: 8px;
`;

const Detail = () => {
  const { loading, error, contactDetail } = useDetail();

  console.log(contactDetail);

  return (
    <PhoneBookContainer>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div
        className={css`
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 6px 12px;
        `}
      >
        <span
          className={css`
            font-weight: 600;
          `}
        >
          Edit
        </span>
      </div>
      {contactDetail ? (
        <>
          <ContactDetailContainer key={contactDetail?.contact_by_pk?.id}>
            <DetailProfilePicture>
              <RoundedPicture
                alt={contactDetail?.first_name?.substring(0, 2)}
                src={`https://ui-avatars.com/api/?name=${contactDetail?.first_name}+${contactDetail?.last_name}`}
                fill
                sizes="300px"
              />
            </DetailProfilePicture>
            <span>{`${contactDetail?.first_name} ${contactDetail?.last_name}`}</span>
          </ContactDetailContainer>
          <FlexContainer
            direction="column"
            className={css`
              width: 100%;
              background: #f4f4f4;
              padding: 16px 12px;
              margin: 12px 0;
              border-radius: 8px;
            `}
          >
            <span>Phone Number</span>
            {contactDetail?.phones?.map((data: IPhones) => {
              return (
                <ul key={data?.id}>
                  <li
                    className={css`
                      margin: 0 24px;
                    `}
                  >
                    {data?.number}
                  </li>
                </ul>
              );
            })}
          </FlexContainer>
        </>
      ) : null}
    </PhoneBookContainer>
  );
};

Detail.getLayout = (page: any) => {
  return (
    <DefaultLayout isBack={true} title="Contact Detail">
      {page}
    </DefaultLayout>
  );
};

export default Detail;
