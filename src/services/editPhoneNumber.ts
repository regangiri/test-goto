import { gql } from "@apollo/client";

const getPhoneNumber = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $new_phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $new_phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

export default getPhoneNumber;

//variables:
// {
//     "pk_columns": {
//         "number": "+62817181718122",
//         "contact_id": 1
//     },
//     "new_phone_number": "+62818171817171wewe"
// }
