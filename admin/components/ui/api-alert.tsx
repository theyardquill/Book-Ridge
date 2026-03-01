"use client"

import { Copy, Server, CheckCircle, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

// Text labels for the badge
const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

// Map default shadcn/ui badge variant to styling
// We will adjust the public badge with custom Tailwind text/bg
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary", // we will customize color manually
  admin: "destructive",
};

// Icons for each badge type
const iconMap: Record<ApiAlertProps["variant"], JSX.Element> = {
  public: <CheckCircle className="w-4 h-4 mr-1" />,
  admin: <ShieldAlert className="w-4 h-4 mr-1" />,
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard");
  };

  return (
    <Alert>
      <Server className="w-5 h-5" />

      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge
          variant={variantMap[variant]}
          className={variant === "public"
            ? "bg-green-100 text-green-800" // apply green styling for public
            : ""}
        >
          {iconMap[variant]}
          {textMap[variant]}
        </Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold whitespace-normal break-words">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="w-5 h-5" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};