"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/src/_components/ui/button";
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
} from "@/src/_components/ui/alert-dialog";

interface DeleteDialogProps {
  title: string;
  itemType: string;
  description: string;
  deleteButtonLabel: string;
  alertDialogCancelText: string;
  onClickDeleteItem: () => Promise<void>;
}

const DeleteDialog = ({
  title,
  itemType,
  onClickDeleteItem,
  description,
  deleteButtonLabel,
  alertDialogCancelText,
}: DeleteDialogProps) => {
  const handleDelete = async () => {
    try {
      await onClickDeleteItem();
      toast.success(`${itemType} deleted successfully!`);
    } catch (error) {
      console.error(`Failed to delete the ${itemType}`, error);
      toast.error(`Failed to delete the ${itemType}.`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-3" variant="destructive">
          <Trash2 size={17} className="group-hover:font-bold" />
          {deleteButtonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-slate-900">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-300 font-semibold text-[#0c2024] hover:bg-gray-400">
            {alertDialogCancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-800"
            onClick={handleDelete}
          >
            {deleteButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
