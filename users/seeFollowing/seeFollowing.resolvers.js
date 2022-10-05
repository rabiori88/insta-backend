import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { userName, lastId }) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not Found",
        };
      }

      const following = await client.user
        .findUnique({ where: { userName } })
        .following({
          take: 5,
          skip: 1,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};
