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
      message: "Required fields are missing",
      status: 409,
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
      message: "user already exists",
      status: 409,
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
    data: {
      id: createdUser.id,
      username: createdUser.username,
      token: await generateToken(createdUser.id),
    },
    message: "user sucessfully created :)",
    status: 200,
  };
}

async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ data: any; message: string; status: number }> {
  if (!username || !password) {
    return {
      data: null,
      message: "Required fields are missing",
      status: 400,
    };
  }

  const userData = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userData) {
    console.log("user not found");
    return {
      data: null,
      message: "user not found",
      status: 404,
    };
  }

  // Check Credentials
  // if (password != userData.password || userData.username != username) {
  //   return {
  //     data: null,
  //     message: "Invalid Credentials",
  //   };
  // }
  if (
    (await bcrypt.compare(password, userData.password)) == false ||
    userData.username != username
  ) {
    return {
      data: null,
      message: "Invalid Credentials",
      status: 401,
    };
  }

  return {
    data: {
      id: userData.id,
      username: userData.username,
      token: await generateToken(userData.id),
    },
    message: "logged :)",
    status: 200,
  };
}

async function getUser(id: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return {
      data: userData,
    };
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(id: string, data: User) {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!foundUser) {
    return {
      data: null,
      message: "User not found!",
    };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
      select: {
        id: true,
        username: true,
      },
    });

    return {
      data: updatedUser,
      message: "user updated sucessfully!",
    };
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id: string) {
  const foundUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!foundUser) {
    return {
      data: null,
      message: "User not found!",
    };
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return {
      data: deletedUser,
      message: "User deleted sucessfully",
    };
  } catch (error) {}
}

async function generateToken(id: string) {
  if (!process.env.JWT_SECRET) return;

  const secret: string = process.env.JWT_SECRET;
  const token = jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
  return token;
}

export { loginUser, registerUser, getUser, updateUser, deleteUser };
