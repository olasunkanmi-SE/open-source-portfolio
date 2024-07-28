/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "@prisma/client";
import { json } from "@remix-run/node";

import { prisma } from "~/db.server";
import { hashPassword, verifyPassword } from "~/utils/utils";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: string, password: string) {
  try {
    const passwordHash = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
    if (!user) {
      return json({ message: "Error occured while creating user", status: 400 });
    }
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}

export async function deleteUserByEmail(email: string) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return json({ message: "User does not exist", status: 400 });
    }

    let isValidPassword = false;

    if (user) {
      const passWordHash = user.passwordHash;
      isValidPassword = verifyPassword(password, passWordHash);
    }

    if (!isValidPassword) {
      return null;
    }

    return user;
  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
}
