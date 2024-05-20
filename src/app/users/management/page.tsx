import Sidebar from "@/components/sidebar/sidebar";
import Table from "@/components/tableUsers/tablePage";
import { randomInt } from "crypto";
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
          <div className="flex justify-between items-center mx-5 ">
            <h1
              className="
            text-3xl
            font-bold
            mt-5
            mb-1
          "
            >
              User Management
            </h1>
          </div>
          <div className="flex justify-end mx-5">
            <button className="btn btn-primary my-2 w-40 text-lg">
              <AiOutlineUserAdd size={20} />
              Add users
            </button>
          </div>
          <Table data={data} colorStatus="user" editor={true} />
        </div>
      </div>
    </>
  );
}
