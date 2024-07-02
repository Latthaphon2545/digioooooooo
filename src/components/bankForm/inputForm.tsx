import { CiBank } from "react-icons/ci";
import BankInput from "./bankInput";
import InputHeader from "../usersForm/inputHeader";

export default function InputForm() {
  return (
    <div className="h-full ">
      <InputHeader icon={<CiBank size={80} />} title="Add Bank" page="bank" />
      <BankInput />
    </div>
  );
}
