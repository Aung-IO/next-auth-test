import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// const User = {
//   name: "apwiz",
//   email: "apkdust@gmail.com",
//   password: "apkdust",
// };
let storedUser: any = null;
function getStoredUser() {
  if (typeof window === "undefined" && !storedUser) {
    storedUser = JSON.parse(localStorage.getItem("user") || "");
  }
  return storedUser;
}

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
        const user = getStoredUser();
        if (
          user &&
          credentials.email === user.email &&
          credentials.password === user.password
        )
          return {
            name: user.name,
          };
        else return null;
      },
    }),
  ],
});
