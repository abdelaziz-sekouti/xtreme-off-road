import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@xtreme-off-road.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [credentials.email]);
        const user = (rows as any[])[0];

        if (!user) {
          // If no admin exists, we create one for the first login (seeding)
          // ONLY FOR DEVELOPMENT / INITIAL SETUP
          if (credentials.email === "admin@xtreme-off-road.com" && credentials.password === "password") {
            const hashedPassword = await bcrypt.hash("password", 10);
            await pool.query(
              'INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)',
              ['admin_1', 'admin@xtreme-off-road.com', hashedPassword, 'Admin']
            );
            return { id: "admin_1", email: "admin@xtreme-off-road.com", name: "Admin" };
          }
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "xtreme-off-road-secret-key-12345",
};
