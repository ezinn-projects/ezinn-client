import { cn } from "@/lib/utils";

export const formCardClassName =
  "bg-white rounded-lg shadow-md border border-red-100 p-4 sm:p-6";

type FormCardProps = React.ComponentProps<"div">;

export function FormCard({ className, children, ...props }: FormCardProps) {
  return (
    <div className={cn(formCardClassName, className)} {...props}>
      {children}
    </div>
  );
}
