import { ConvertTime } from "@/components/dateTime";
import Modal from "@/components/modal";
import { handleShowManyCheckInstock } from "../handleShowManyCheckInstock";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import ViewImg from "./historyProductViewImg";
import { useState } from "react";

export const DesktopView = ({
  item,
  manyCheckInstock,
}: {
  item: any;
  manyCheckInstock: number;
}) => {
  const { TimeFormat, displayTime } = ConvertTime(item.createdAt);
  const [open, setOpen] = useState(false);
  return (
    <tr key={item.id}>
      <td className={`py-2 px-4 h-[8vh]`}>
        <span>
          <h1 className="text-sm">{TimeFormat}</h1>
          <h1 className="text-sm">{displayTime}</h1>
        </span>
      </td>
      <td className={`py-2 px-4 h-[8vh]`}>
        {item?.description.length > 20 ? (
          <Modal
            NameBtn={`${item.description.slice(0, 20)}...`}
            content={item.description}
            id={item.id}
            open={open}
            setOpen={setOpen}
          />
        ) : (
          handleShowManyCheckInstock(item.description, manyCheckInstock)
        )}
      </td>
      <td className={`py-2 px-4 h-[8vh]`}>{item.user.name}</td>
      <td className={`py-2 px-4 h-[8vh]`}>
        <div
          className={`badge badge-${ColorProductStatus(
            ConvertStatus(item.category)
          )} badge-outline badge-md`}
        >
          <p>{ConvertStatus(item.category)}</p>
        </div>
      </td>
      <td className={`py-2 px-4 h-[8vh]`}>
        <ViewImg id={item.id} image={item.imageProve} />
      </td>
    </tr>
  );
};
