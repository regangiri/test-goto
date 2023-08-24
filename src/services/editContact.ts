import { gql } from "@apollo/client";

const editContact = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export default editContact;

// variables:
//  {
//     "id": 1,
//     "_set": {
//         "first_name": "Dedi"
//       }
//   }
