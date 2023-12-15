"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export default function ApiList({ entityName, entityIdName }: ApiListProps) {
  const origin = useOrigin();
  const params = useParams();

  const base = `${origin}/api/${params.storeId}`;

  return (
    <div>
      <ApiAlert
        title="GET"
        description={`${base}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${base}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${base}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${base}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${base}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </div>
  );
}
