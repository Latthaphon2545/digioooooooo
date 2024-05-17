import { SearchContext } from "@/components/table/searchContext";
import Table from "@/components/table/tablePage";
import { randomInt } from "crypto";

export default function Home() {
  const data = Array.from({ length: 33 }, (_, i) => ({
    name: `Person ${i + 1}`,
    email: `person${i + 1}@digio.co.th`,
    role: ["Admin", "Operator", "Call Center"][randomInt(0, 3)],
    status: ["Pending", "Active", "Restricted", "Inactive"][randomInt(0, 3)],
    Contact: randomInt(1000000000, 9999999999),
  }));

  return (
    <>
      <Table data={data} colorStatus="user" />
    </>
  );
}
