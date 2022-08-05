import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "session unavailable" });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return res.status(401).json({ message: "user not found" });

  await prisma.review.create({
    data: {
      description: req.body.description,
      rating: parseInt(req.body.rating),
      item: {
        connect: { id: req.body.item },
      },
    },
  });

  const reviews = await prisma.review.findMany({
    where: {
      item: {
        id: req.body.item,
      },
    },
  })

  const ratingsValues = reviews.reduce((acc, review) => {
    console.log(acc, review.rating)
    return acc + review.rating
  }, 0)

  const rating = ratingsValues / reviews.length

  await prisma.item.update({
    data: {
      rating: Math.floor(rating * 10),
    },
    where: {
      id: req.body.item,
    },
  })
  res.end();
}
