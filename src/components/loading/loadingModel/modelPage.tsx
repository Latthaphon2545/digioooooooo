export default function ModelLoading({ length }: { length: number }) {
  return (
    <div className="flex gap-5 flex-wrap justify-center overflow-y-auto max-h-[81vh] m-auto w-full pb-5 mobile:hidden tablet:block laptop:block">
      {[...Array(length)].map((_, index) => (
        <div
          key={index}
          className="card card-side bg-base-100 shadow-xl mx-20 mt-5"
        >
          <div className="card-body skeleton bg-opacity-10 w-[80%] h-[30vh]"></div>
        </div>
      ))}
    </div>
  );
}
