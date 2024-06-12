/*eslint-disable no-unused-vars*/

import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { clientSchema } from "@/app/_utils/validationSchemas";
import { convertBigIntToNumber } from "@/app/_utils/convertBigIntToNumber";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = clientSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newClient = await db.client.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      dni: body.dni,
      cuil: body.cuil,
    },
  });
  return NextResponse.json(newClient, { status: 201 });
}

export async function GET(request: NextRequest) {
  try {
    const clients = await db.client.findMany();
    const clientsWithNumberBigInts = clients.map((client) =>
      convertBigIntToNumber(client),
    );
    return NextResponse.json(clientsWithNumberBigInts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch clients", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 },
    );
  }
}