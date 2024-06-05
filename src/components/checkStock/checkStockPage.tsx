import Image from "next/image";
import InputCheckStock from "./inputCheckStock";

import BG from "/public/image/checkStockBG.jpg";

export default function CheckStockPage() {
  return (
    <div className="gap-4 mx-5 my-3 ">
      <div className="flex flex-col gap-4">
        <p>Please type the barcode or scan the barcode to check the stock.</p>
        <div className="flex gap-4 justify-around">
          <div className="w-2/6">
            <InputCheckStock />
          </div>
          <Image src={BG} className="w-3/6" alt="check stock" />
        </div>
      </div>
    </div>
  );
}
