import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "./App";

export const render = (url: string) =>
  renderToString(
    <TooltipProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </TooltipProvider>
  );
