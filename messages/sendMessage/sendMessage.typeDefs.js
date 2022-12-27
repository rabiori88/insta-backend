import { gql } from "apollo-server-express";

export default gql`
  type Mutaion {
    sendMessage(payload: String!, roomId: Int, userId: Int): MutationResponse!
  }
`;
