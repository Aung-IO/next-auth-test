import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email, password } = req.body;

  const client = await clientPromise;
  const db = client.db("nextauth");

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hash(password, 10);

  await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully" });
};
