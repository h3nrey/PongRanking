import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

async function registerUser({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  if (!email || !username || !password) {
    return {
      data: null,
      message: "Please add all required fields",
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists)
    return {
      data: null,
      message: "User already exists",
    };

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createdUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: createdUser.id,
    username: createdUser.username,
    token: await generateToken(createdUser.id),
  };
}

async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (!username || !password) {
    return "You havent send all inputs";
  }

  const userData = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userData) return "user not found";

  // Check Credentials
  if (
    (await bcrypt.compare(password, userData.password)) == false ||
    userData.username != username
  ) {
    return {
      data: null,
      message: "Invalid Credentials",
    };
  }

  return {
    id: userData.id,
    username: userData.username,
    token: await generateToken(userData.id),
  };
}

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return {
    data: user,
  };
}

async function generateToken(id: string) {
  if (!process.env.JWT_SECRET) return;

  const secret: string = process.env.JWT_SECRET;
  const token = jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
  return token;
}

export { loginUser, registerUser, getUser };
