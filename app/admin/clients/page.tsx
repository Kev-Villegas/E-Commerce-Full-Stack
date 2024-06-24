"use client";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Client } from "@prisma/client";
import Search from "@/app/_components/Search";
import Spinner from "@/app/_components/Spinner";
import { Pencil, ListFilter } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import DeleteDialog from "@/app/_components/DeleteDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

const ClientsPage = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: clients,
    error,
    mutate,
  } = useSWR<Client[]>("/api/clients", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 1000,
    revalidateOnReconnect: true,
  });

  const [sortedClients, setSortedClients] = useState<Client[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client;
    order: "asc" | "desc";
  }>({ key: "id", order: "asc" });

  if (error) {
    return (
      <div className="p-5">
        <span className="text-lg font-medium text-red-600">
          Failed to load the clients...
        </span>
      </div>
    );
  }

  if (!clients) {
    return <Spinner />;
  }

  const onDeleteProduct = async (id: number) => {
    await axios.delete(`/api/clients/${id}`);
    mutate();
  };

  const handleSort = (key: keyof Client) => {
    const order =
      sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc";
    const sorted = [...clients].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortedClients(sorted);
    setSortConfig({ key, order });
  };

  const displayedClients = sortedClients.length ? sortedClients : clients;

  return (
    <div className="p-5">
      <Search />
      <div className="mb-4 flex justify-end px-2">
        <Button>
          <Link href="/admin/clients/new">Add New Client</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>Fenix Clients</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("id")}
                />
                ID
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("firstName")}
                />
                First Name
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("lastName")}
                />
                Last Name
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("email")}
                />
                Email
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("phone")}
                />
                Phone
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("address")}
                />
                Address
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("dni")}
                />
                DNI
              </span>
            </TableHead>
            <TableHead>
              <span className="flex gap-2">
                <ListFilter
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleSort("cuil")}
                />
                Cuil
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.id}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>{client.dni}</TableCell>
              <TableCell>{client.cuil}</TableCell>
              <TableCell className="w-[110px]">
                <Button className="gap-2">
                  <Link href={`/clients/${client.id}/edit`}>
                    <div className="flex items-center">
                      <Pencil size={17} className="mr-2 text-slate-500" />
                      <span>Edit</span>
                    </div>
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="w-[125px]">
                <DeleteDialog
                  itemType="Client"
                  title="Delete Client"
                  deleteButtonLabel="Delete"
                  alertDialogCancelText="Cancel"
                  onClickDeleteItem={() => onDeleteProduct(client.id)}
                  description="Are you sure you want to delete this client?"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsPage;
