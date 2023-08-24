import { gql } from "@apollo/client";

const getPhoneList = gql`
  query GetPhoneList(
    $where: phone_bool_exp
    $distinct_on: [phone_select_column!]
    $limit: Int = 10
    $offset: Int = 0
    $order_by: [phone_order_by!]
  ) {
    phone(
      where: $where
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      contact {
        last_name
        first_name
        id
      }
      number
    }
  }
`;

export default getPhoneList;

// variables :
// {
//     "where": {
//         "contact": {
//             "first_name": {
//                 "_like": "%o%"
//               }
//           }
//       }
//   }
