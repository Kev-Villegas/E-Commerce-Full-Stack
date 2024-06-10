"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

const DeleteDialog = ({
  productId,
  mutate,
}: {
  productId: number;
  mutate: () => void;
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete("/api/products/" + productId);
      toast.success("Product deleted successfully!");
      mutate(); // Here we call the mutate function to revalidate the data
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-3" variant="destructive">
          <Trash2 size={17} className="group-hover:font-bold" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this product from the database?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            product from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-300">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
