import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcrypt"; // Ensure you install bcryptjs for password comparison
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("nextauth");

        const user = await db.collection("users").findOne({
          email: credentials?.email,
        });

        if (user && (await compare(credentials?.password, user.password))) {
          return { id: user._id, email: user.email, name: user.name };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session);

      session.user.id = JSON.stringify(token.id);
      return session;
    },
  },
});
