import ServerSideInputHeader from "../serverSideInputHeader";
import { CiBank } from "react-icons/ci";
import BankInput from "./bankInput";
import InputHeader from "../usersForm/inputHeader";

export default function InputForm() {
  return (
    <div>
      <InputHeader icon={<CiBank size={80} />} title="Add Bank" page="bank" />
      <BankInput />
    </div>
  );
}
