export default function ModelLoading({ length }: { length: number }) {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(length)].map((_, index) => (
        <div
          key={index}
          className="card card-side bg-base-100 shadow-xl mx-20 mt-5"
        >
          <div className="card-body skeleton bg-opacity-10 h-[28vh] w-[75vw]"></div>
        </div>
      ))}
    </div>
  );
}
