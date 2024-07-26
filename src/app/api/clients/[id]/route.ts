import { db } from "@/src/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { clientSchema } from "@/src/_utils/validationSchemas";
import { convertBigIntToNumber } from "@/src/_utils/convertBigIntToNumber";

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

  const clientWithNumbers = convertBigIntToNumber(updatedClient);
  return NextResponse.json(clientWithNumbers, { status: 200 });
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
