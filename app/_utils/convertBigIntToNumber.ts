import { Client } from "@prisma/client";

type ClientWithNumbers = Omit<Client, "dni" | "cuil"> & {
  dni: number;
  cuil: number;
};

export const convertBigIntToNumber = (client: Client): ClientWithNumbers => {
  return {
    ...client,
    dni: Number(client.dni),
    cuil: Number(client.cuil),
  };
};
