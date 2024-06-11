/*eslint-disable no-unused-vars*/

import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { clientSchema } from "@/app/_utils/validationSchemas";

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
