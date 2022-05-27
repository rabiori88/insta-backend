import client from "../client";
import bcrypt from "bcrypt";
import cli from "nodemon/lib/cli";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      // Check if userName or email are already on DB

      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              userName,
            },
            {
              email,
            },
          ],
        },
      });
      console.log(existingUser);

      const uglyPassword = await bcrypt.hash(password, 10);
      console.log(uglyPassword);
      const user = client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });

      return user;
      //bcrypt.hash(password);
      //bcrypt.compare();

      //hash password
      //save and return the user
    },
  },
};
