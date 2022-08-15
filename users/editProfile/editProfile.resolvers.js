import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        const { filename, createReadStream } = await avatar;
        const readStream = createReadStream();
        const writeStream = createWriteStream(
          process.cwd() + "/uploads/" + filename
        );
        readStream.pipe(writeStream);

        console.log(readStream);

        console.log(filename, createReadStream);
        let uglyPassword = null;

        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const ok = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            userName,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });

        if (ok) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "프로필 변경 실패",
          };
        }
      }
    ),
  },
};
