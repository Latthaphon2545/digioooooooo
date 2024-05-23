import Table from "@/components/usersTable/usersTablePage";
import { randomInt } from "crypto";
import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";

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
      <div className="flex flex-row min-h-screen">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 ">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Link
              href={"/users/add"}
              className="btn btn-primary w-40 text-lg"
            >
              <AiOutlineUserAdd size={20} />
              Add users
            </Link>
          </div>
          <div className="flex justify-end mx-5"></div>
          <Table data={data} colorStatus="user" editor={true} />
        </div>
      </div>
    </>
  );
}
