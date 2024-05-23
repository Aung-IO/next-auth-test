import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const User = {
  name: "apwiz",
  email: "apkdust@gmail.com",
  password: "apkdust",
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (
          credentials.email === User.email &&
          credentials.password === User.password
        )
          return {
            name: User.name,
          };
        else return null;
      },
    }),
  ],
});
