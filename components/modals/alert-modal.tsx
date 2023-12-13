"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModel({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action can't be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end pt-6 space-x-2 w-full">
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
