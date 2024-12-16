// auth/[...nextauth].js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passmatch = await bcrypt.compare(password, user.password);
          if (!passmatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),

    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        async profile(profile) {
          const { email, name, image } = profile;
            console.log(image);
        // Connect to MongoDB
        await connectMongoDB();
        let user = await User.findOne({ email });
        if (!user) {
          // If the user doesn't exist, create a new user without a password
          user = User.create({name,email,image});
        
        }

        // Return the user's data
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If the user is authenticated, we add the user information to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
  
    async session({ session, token }) {
      // When the session is created, we add the token information to the session
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
  },
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
