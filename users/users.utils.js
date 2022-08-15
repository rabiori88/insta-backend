import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// export const protectResolver = (user) => {
//   if (!user) {
//     return {
//       ok: false,
//       error: "먼저 로그인 부터 하세요.",
//     };
//   }
// };

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "제발 먼저 로그인 부터 하세요",
      };
    }

    return ourResolver(root, args, context, info);
  };
