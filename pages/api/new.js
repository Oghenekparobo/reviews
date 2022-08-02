import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "no session found" });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return res.status(401).json({ message: "user not found" });
  if (!user.isAdmin)
    return res.status(401).json({ message: "user not authorized" });

  await prisma.item.create({
    data: {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      rating: 0,
    },
  });

  res.end();
}
