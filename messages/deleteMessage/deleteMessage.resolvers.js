import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      await client.message.findFirst({
        where: {
          id,
          read: false,
          userId: loggedInUser?.id,
          room: { users: { some: { id: loggedInUser?.id } } },
        },
      });

      await client.message.delete({
        where: { id },
      });

      return {
        ok: true,
      };
    }),
  },
};
