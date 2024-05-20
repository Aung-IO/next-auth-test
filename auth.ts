import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
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
          credentials.email === "apkdust@gmail.com" &&
          credentials.password === "apkdust"
        )
          return {
            name: "apwiz",
          };
        else return null;
      },
    }),
  ],
});
