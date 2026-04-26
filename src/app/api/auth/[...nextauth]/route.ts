import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../../Services/Auth/Signin";

interface JWTPayload {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await loginUser({
            email: credentials?.email,
            password: credentials?.password,
          });

          if (data?.token) {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              token: data.token,
            };
          }
          return null;
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Login failed",
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as typeof user & { token: string }).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      try {
        const base64 = (token.accessToken as string).split(".")[1];
        const decoded = JSON.parse(
          Buffer.from(base64, "base64").toString(),
        ) as JWTPayload;
        session.user.id = decoded.id;
      } catch {
        session.user.id = "";
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
