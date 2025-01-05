
import ContactFormAction from "@/actions/ContactFormAction";
import { NextResponse } from "next/server";


export async function POST(req) {
  console.log(req.body);
  const body = await req.json();
  // console.log(data);
  const headers=req.headers;

  const result = await ContactFormAction(body, headers);

  return NextResponse.json(result)
}