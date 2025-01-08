import { User } from "next-auth";

export interface CustomUser extends User {
  id: string;
  role?: string;
  email: string;
  name: string;
  image?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      email: string;
      name: string;
      image?: string;
    };
  }

  interface JWT {
    id: string;
    role?: string;
    email: string;
    name: string;
    image?: string;
  }
}