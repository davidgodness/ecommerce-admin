"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  admin: "Admin",
  public: "Public",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  admin: "destructive",
  public: "secondary",
};

export const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API router copied to clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="relative bg-muted rounded font-mono font-semibold text-sm px-1 py-1">
          {description}
        </code>
        <Button size="icon" variant="outline" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
