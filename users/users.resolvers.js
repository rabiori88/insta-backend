import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) => {
      //console.log(context);
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const exists = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: {
            some: {
              id,
            },
          },
        },
      });

      return Boolean(exists);
    },
  },
};
