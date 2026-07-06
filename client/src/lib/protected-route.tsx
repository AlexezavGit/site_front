import { useAuth } from "@/hooks/use-auth";
import { Redirect, Route } from "wouter";
import { Loader2 } from "lucide-react";
import type { RoleValue } from "@shared/schema";

export function ProtectedRoute({
  path,
  component: Component,
  role,
}: {
  path: string;
  component: () => React.JSX.Element;
  role?: RoleValue;
}) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {() => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          );
        }

        if (!user) {
          return <Redirect to="/auth" />;
        }

        if (role && !user.roles.some((r) => r.role === role)) {
          return <Redirect to="/portal" />;
        }

        return <Component />;
      }}
    </Route>
  );
}
