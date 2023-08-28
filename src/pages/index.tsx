import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import DefaultLayout from "@/layouts/DefaultLayout";
import truncateString from "@/helper/truncateString";
import useContacts from "@/hooks/useContacts";
import { AddOutlined } from "@mui/icons-material";
import { InputForm } from "./add";

export const PhoneBookContainer = styled.div`
  min-height: 100vh;
  position: relative;
  padding: 8px 16px;
`;

const ContactCard = styled.div`
  width: 100%;
  padding: 24px;
  border-bottom: 1px solid black;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ProfilePicture = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  border-radius: 50%;
  margin-right: 8px;
`;

export const RoundedPicture = styled(Image)`
  border-radius: 50%;
`;

const ContactName = styled.span`
  font-size: 14px;
  text-transform: capitalize;
`;

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const AddButton = styled.button`
  border: none;
  padding: 12px 16px;
  border-radius: 50%;
  background-color: #f4f4f4;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const Home = () => {
  const {
    error,
    loading,
    contacts,
    redirectToDetail,
    redirectToAdd,
    handleSearch,
  } = useContacts();

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <InputForm type="text" placeholder="Search" onChange={handleSearch} />
      {!loading &&
        !error &&
        contacts?.length > 0 &&
        contacts?.map((data: any) => {
          return (
            <ContactCard
              key={data?.id}
              onClick={() => redirectToDetail(data?.id)}
            >
              <ProfilePicture>
                <RoundedPicture
                  alt={data?.first_name.substring(0, 2)}
                  src={`https://ui-avatars.com/api/?name=${data?.first_name}+${data?.last_name}`}
                  fill
                  sizes="30px"
                />
              </ProfilePicture>
              <ContactName>
                {truncateString(`${data?.first_name} ${data?.last_name}`, 50)}
              </ContactName>
            </ContactCard>
          );
        })}
      <AddButtonContainer onClick={() => redirectToAdd()}>
        <AddButton>
          <AddOutlined fontSize="medium" />
        </AddButton>
      </AddButtonContainer>
    </>
  );
};
Home.getLayout = (page: any) => {
  return (
    <DefaultLayout isBack={false} title="Contact">
      {page}
    </DefaultLayout>
  );
};
export default Home;
