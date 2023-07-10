// import { db } from "@vercel/postgres";
// import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   const client = await db.connect();

//   try {
//     await client.sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
//     const names = ["Fiona", "Lucy"];
//     await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
//   } catch (error) {
//     return response.status(500).json({ error });
//   }

//   const pets = await client.sql`SELECT * FROM Pets;`;
//   return response.status(200).json({ pets });
// }

// export function POST(req, res) {
//   // Get data submitted in request's body.
//   const body = req.body;

//   // Optional logging to see the responses
//   // in the command line where next.js app is running.
//   console.log("body: ", body);

//   // Guard clause checks for first and last name,
//   // and returns early if they are not found
//   // if (!body.first || !body.last) {
//   //   // Sends a HTTP bad request error code
//   //   return NextResponse.json({ message: "Hello World" });
//   // }

//   // Found the name.
//   // Sends a HTTP success code
//   res.status(200).json({ data: "sup" });
// }

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const result = await prisma.user.create({
      data: {
        email,
      },
    });

    return NextResponse.json({ result });
  } catch (e) {
    console.error("oh no", e);
    return NextResponse.json({ error: "Duplicate" }, { status: 500 });
  }
}
