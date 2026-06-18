import { createFileRoute } from "@tanstack/react-router";
import { Forbidden403 } from "@/components/errors/ErrorPages";

export const Route = createFileRoute("/403")({
  head: () => ({ meta: [{ title: "403 — Access Denied · Baptist Academy" }] }),
  component: Forbidden403,
});
