import { gql } from "@apollo/client";

const deleteContact = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export default deleteContact;

// variable:
//  {
//     "id": 10
// }
