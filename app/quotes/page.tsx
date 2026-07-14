import { getEntitiesByType } from "@/lib/content/loader";
import { QuotesDatabase } from "@/components/databases/QuotesDatabase";

export const metadata = { title: "Quotes" };

export default function QuotesPage() {
  const quotes = getEntitiesByType("quote");
  return <QuotesDatabase quotes={quotes} />;
}
