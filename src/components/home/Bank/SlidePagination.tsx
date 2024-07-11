import { useRouter } from "next/navigation";

interface SlidePaginationProps {
  totalBank: number;
  currentBank: number;
  setCurrentBank: (index: number) => void;
}

export const SlidePagination = ({
  totalBank,
  currentBank,
  setCurrentBank,
}: SlidePaginationProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      {Array.from({ length: totalBank }).map((_, index) => {
        const isActive = currentBank === index;
        return (
          <div
            key={index}
            className={`h-3 rounded-full cursor-pointer ${
              isActive ? "bg-primary w-7" : "bg-base-content w-3"
            }`}
            onClick={() => {
              router.push(`#bank${index + 1}`);
              setCurrentBank(index);
            }}
          ></div>
        );
      })}
    </div>
  );
};
