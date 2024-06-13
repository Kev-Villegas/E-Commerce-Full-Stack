import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ClientForm from "../../_components/ClientForm";

interface ClientEditProps {
  params: {
    id: string;
  };
}

const EditClientPage = async ({ params }: ClientEditProps) => {
  const client = await db.client.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!client) {
    return notFound();
  }
  return <ClientForm client={client} />;
};

export default EditClientPage;
