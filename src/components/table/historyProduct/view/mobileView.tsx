import { ConvertTime } from "@/components/dateTime";
import { handleShowManyCheckInstock } from "../handleShowManyCheckInstock";
import ViewImg from "./historyProductViewImg";

export const MobileData = ({
  item,
  manyCheckInstock,
}: {
  item: any;
  manyCheckInstock: number;
}) => {
  const { TimeFormat, displayTime } = ConvertTime(item.createdAt);
  return (
    <div className="card w-[90vw] bg-base-100 shadow-xl">
      <div className="card-body p-5">
        <div className="card-title flex-col">
          <div className="flex w-full justify-between items-center">
            <h1 className=" text-gray-500 text-sm">{TimeFormat}</h1>
            <h1 className=" text-gray-500 text-sm">{displayTime}</h1>
          </div>
          <div className="divider my-0"></div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-base">
            {handleShowManyCheckInstock(item.description, manyCheckInstock)}
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="flex justify-between items-center">
              <div>User</div>
              <div>{item.user.name}</div>
            </div>

            <div className="flex justify-between items-center">
              <div>Image</div>
              <div>
                <ViewImg id={item.id} image={item.imageProve} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
