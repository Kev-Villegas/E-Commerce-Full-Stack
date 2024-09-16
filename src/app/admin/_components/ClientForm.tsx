"use client";

import { z } from "zod";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Client } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Spinner from "@/src/_components/Spinner";
import { Label } from "@/src/_components/ui/label";
import { Input } from "@/src/_components/ui/input";
import { Button } from "@/src/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/src/_utils/validationSchemas";

type ClientFormData = z.infer<typeof clientSchema>;

const ClientForm = ({ client }: { client?: Client }) => {
  const [formattedCuil, setFormattedCuil] = useState(client?.cuil || "");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });
  const formatCuil = (value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length > 2 && value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{0,8})/, "$1-$2");
    } else if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{8})(\d{0,1})/, "$1-$2-$3");
    }
    return value;
  };
  const handleCuilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFormattedCuil(formatCuil(rawValue));
    setValue("cuil", rawValue);
    trigger("cuil");
  };

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

  return (
    <form className="max-w-xl p-5" onSubmit={onSubmit}>
      <h3 className="mb-3 flex justify-center text-center font-medium">
        {client ? "Update Client" : "Add A New Client"}
      </h3>

      <Label className="text-base font-normal">Client First Name</Label>
      <Input
        type="text"
        defaultValue={client?.firstName}
        placeholder="Client First Name (e.g. Jose)"
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
        placeholder="Client Last Name (e.g. Perez)"
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
        placeholder="Client Email (e.g. example@example.com)"
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("email")}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Label className="text-base font-normal">Client Phone</Label>
      <Input
        type="text"
        defaultValue={client?.phone}
        placeholder="Client Phone (e.g. +5491123456789)"
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("phone")}
      />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      <Label className="text-base font-normal">Client Address</Label>
      <Input
        type="text"
        placeholder="Client Address (e.g. Av Sarmiento 123)"
        defaultValue={client?.address}
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("address")}
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}

      <Label className="text-base font-normal">Client DNI</Label>
      <Input
        type="string"
        placeholder="Client DNI (e.g. 13456789)"
        defaultValue={client?.dni}
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
        {...register("dni")}
      />
      {errors.dni && <p className="text-red-500">{errors.dni.message}</p>}

      <Label className="text-base font-normal">Client Cuil</Label>
      <Input
        type="text"
        value={formattedCuil}
        onChange={handleCuilChange}
        defaultValue={client?.cuil}
        placeholder="Client Cuil (e.g. 20-12345678-3)"
        className="mb-4 mt-[2px] border-[1px] border-zinc-800"
      />
      {errors.cuil && <p className="text-red-500">{errors.cuil.message}</p>}
      <Button disabled={isSubmitting} type="submit" className="gap-2">
        {client ? "Update Client" : "Add Client"} {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default ClientForm;
