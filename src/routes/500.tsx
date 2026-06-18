import { createFileRoute } from "@tanstack/react-router";
import { ServerError500 } from "@/components/errors/ErrorPages";

export const Route = createFileRoute("/500")({
  head: () => ({ meta: [{ title: "500 — Server Error · Baptist Academy" }] }),
  component: ServerError500,
});
