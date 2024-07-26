"use client";

import { z } from "zod";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Client } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/src/_components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/src/_components/ui/label";
import { Input } from "@/src/_components/ui/input";
import { Button } from "@/src/_components/ui/button";
import { clientSchema } from "@/src/_utils/validationSchemas";
import { convertBigIntToNumber } from "@/src/_utils/convertBigIntToNumber";

type ClientFormData = z.infer<typeof clientSchema>;

const ClientForm = ({ client }: { client?: Client }) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (client) {
        await axios.patch("/api/clients/" + client.id, data);
        toast.success("Client edited successfully!");
      } else {
        await axios.post("/api/clients", data);
        toast.success("Client created successfully!");
      }
      router.push("/admin/clients");
    } catch (error) {
      setSubmitting(false);
      console.error("Failed to create client", error);
      toast.error("Failed to add client.");
    }
  });

  // Convert BigInts to numbers
  const clientWithNumbers = client ? convertBigIntToNumber(client) : undefined;

  return (
    <form className="max-w-xl p-5" onSubmit={onSubmit}>
      <h3 className="mb-3 flex justify-center text-center font-medium">
        Add A New Client
      </h3>

      <Label className="text-base font-normal">Client First Name</Label>
      <Input
        type="text"
        defaultValue={client?.firstName}
        placeholder="Client First Name"
        className="mb-4 mt-1 border-[1px] border-zinc-800"
        {...register("firstName")}
      />
      {errors.firstName && (
        <p className="text-red-500">{errors.firstName.message}</p>
      )}
      <Label className="text-base font-normal">Client Last Name</Label>
      <Input
        type="text"
        defaultValue={client?.lastName}
        placeholder="Client Last Name"
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("lastName")}
      />
      {errors.lastName && (
        <p className="text-red-500">{errors.lastName.message}</p>
      )}
      <Label className="text-base font-normal">Client Email</Label>
      <Input
        type="email"
        defaultValue={client?.email}
        placeholder="Client Email"
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("email")}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Label className="text-base font-normal">Client Phone</Label>
      <Input
        type="text"
        defaultValue={client?.phone}
        placeholder="Client Phone"
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("phone")}
      />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      <Label className="text-base font-normal">Client Address</Label>
      <Input
        type="text"
        placeholder="Client Address"
        defaultValue={client?.address}
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("address")}
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}
      <Label className="text-base font-normal">Client DNI</Label>
      <Input
        type="number"
        step="0.01"
        placeholder="Client DNI"
        defaultValue={clientWithNumbers?.dni}
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("dni", { valueAsNumber: true })}
      />
      {errors.dni && (
        <p className="mt-0 py-0 text-red-500">{errors.dni.message}</p>
      )}
      <Label className="text-base font-normal">Client Cuil</Label>
      <Input
        type="number"
        step="0.01"
        placeholder="Client Cuil"
        defaultValue={clientWithNumbers?.cuil}
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("cuil", { valueAsNumber: true })}
      />
      {errors.cuil && <p className="text-red-500">{errors.cuil.message}</p>}
      <Button disabled={isSubmitting} type="submit" className="gap-2">
        {client ? "Update Client" : "Add Client"} {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default ClientForm;
