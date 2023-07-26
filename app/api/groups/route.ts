import { NextResponse } from "next/server";
import createGroup from "./createGroup";

export async function POST(req, res) {
  const data = await req.json();
  //   console.log(data);
  //   const response = "asdf";
  const response = await createGroup(data);
  return NextResponse.json(response);
}
