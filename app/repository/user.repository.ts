import type { User } from "@prisma/client";
import { json } from "@remix-run/node";

import { prisma } from "~/db.server";
import { hashPassword, verifyPassword } from "~/utils/utils";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const passwordHash = hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email: User["email"], password: string) {
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
}
