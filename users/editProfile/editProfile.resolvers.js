import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

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
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
          // const { filename, createReadStream } = await avatar;
          // const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = createReadStream();
          // const writeStream = createWriteStream(
          //   process.cwd() + "/uploads/" + newFileName
          // );
          // readStream.pipe(writeStream);
          // avatarUrl = `http://localhost:4001/static/${newFileName}`;
        }

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
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
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
