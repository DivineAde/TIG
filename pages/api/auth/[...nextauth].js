import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getToken } from "next-auth/jwt";

const NEXTAUTH_SECRET= "325e5d59acb519c288605ff2290eb99f";


const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials;
        // find the user from the database
        if (email !== "user@example.com" || password !== "1Password") {
          return null;
        }

        // if everything is fine
        return Promise.resolve({
          id: "1Password",
          name: "User",
          email: "user@example.com",
          role: "admin",
        });
      },
    }),
  ],
  callbacks: {
    jwt: async (params) => {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return the final token
      return Promise.resolve(params.token);
    },
  },
};

export default NextAuth(authOptions);
