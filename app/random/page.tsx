import { redirect } from "next/navigation";
import { getRandomEntity } from "@/lib/content/loader";
import { entityHref } from "@/lib/schemas/entity";

export default function RandomPage() {
  const entity = getRandomEntity();
  redirect(entityHref(entity));
}
