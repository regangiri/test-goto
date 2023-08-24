import { gql } from "@apollo/client";

const getContactDetail = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        id
        number
      }
    }
  }
`;

export default getContactDetail;

// variables:
// {
//     "id": 1
// }
