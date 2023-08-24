import { gql } from "@apollo/client";

const addNumberToContact = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

export default addNumberToContact;

// variables:
// {
//     "contact_id": 8,
//     "phone_number": "+828272827282822"
// }
