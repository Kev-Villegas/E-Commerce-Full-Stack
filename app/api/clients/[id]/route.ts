import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { clientSchema } from "@/app/_utils/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = clientSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const client = await db.client.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!client)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  const updatedClient = await db.client.update({
    where: { id: client.id },
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

  return NextResponse.json(updatedClient, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await db.client.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!client)
    return NextResponse.json({ error: "Client not found" }, { status: 404 });

  await db.client.delete({
    where: { id: client.id },
  });

  return NextResponse.json({});
}
