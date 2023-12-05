"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const modalFormSchema = z.object({
  name: z.string().min(1),
});

export default function StoreModal() {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof modalFormSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(modalFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof modalFormSchema>) => {
    console.log(values);

    //TODO Create Store
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-4 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 flex space-x-2 items-center justify-end w-full">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  storeModal.onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
