import { BiLogOut } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import ThemePage from "../theme/themePage";
import Alert from "../alert";

const size = "h-6 w-6";

const userId = "66554e8534b8e2bb8f5f42d1";
export default function Dropdown() {
  const router = useRouter();
  return (
    <ul
      tabIndex={0}
      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
    >
      <li className="laptop:hidden menu-title">
        <div className="flex flex-row justify-between items-center mb-2">
          <p>Latthaphon Phoemmanirat</p>
          <p>Admin</p>
        </div>
      </li>

      <li className="m-1">
        <label
          onClick={() => {
            router.push(`/users/history/${userId}/?skip=0&take=7`);
          }}
        >
          <MdHistory className={size} />
          <p>History</p>
        </label>
      </li>

      {/* Settings */}
      <li className="m-1">
        <label onClick={() => router.push("/setting/account")}>
          <IoMdSettings className={size} />
          <p>Settings</p>
        </label>
      </li>

      {/* Theme */}
      <li className="m-1">
        <ThemePage />
      </li>

      {/* Logout */}
      <li className="mt-5">
        <Alert
          styles="btn-error btn-sm text-base-100 text-sm w-44"
          action={() => {
            router.push("/login");
          }}
          alertHeader="You're about to logout"
          alertDescription="Are you sure you want to logout?"
          id="logout"
        >
          <div className="flex flex-row justify-center items-center gap-3">
            <BiLogOut className="w-fit h-5" />
            Logout
          </div>
        </Alert>
      </li>
    </ul>
  );
}
