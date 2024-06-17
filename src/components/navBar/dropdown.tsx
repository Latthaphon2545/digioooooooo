import { BiLogOut } from "react-icons/bi";
import Alert from "../alert";

export default function Dropdown() {
  return (
    <ul
      tabIndex={0}
      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
    >
      <li>
        <a>History</a>
      </li>
      <li>
        <a>Settings</a>
      </li>
      <li>
        <Alert
          styles="btn-error btn-sm text-base-100 text-sm w-44"
          action={() => {}}
          alertHeader="You're about to logout"
          alertDescroption="Are you sure you want to logout?"
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
