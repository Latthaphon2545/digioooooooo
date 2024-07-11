import { ConvertStatus } from "@/components/convertStatusAndRole";

interface StatStatusProps {
  status: Record<string, number>;
  image: string;
}

export const StatStatus = ({ status, image }: StatStatusProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="stats stats-horizontal grid gap-3 shadow-lg mobile:grid-rows-4 tablet:grid-rows-2 laptop:grid-rows-2">
        {Object.entries(status).map(([status, value], index) => (
          <div key={index} className="stat">
            <div className="stat-title laptop:text-sm mobile:text-xs">
              {ConvertStatus(status)}
            </div>
            <div
              className={`stat-value laptop:text-2xl mobile:text-base tablet:text-2xl`}
            >
              {value}
            </div>
          </div>
        ))}
        <img
          src={image}
          className="w-16 h-16 rounded-full absolute bottom-8 tablet:hidden mobile:right-20 laptop:hidden"
          alt={image}
        />
      </div>
    </div>
  );
};
