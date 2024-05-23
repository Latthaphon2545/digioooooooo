import Card from "@/components/model/card";

export default function Models() {
  return (
    <>
      <>
        <div className="flex flex-row min-h-screen">
          <div className="flex flex-col w-full relative">
            <div className="flex justify-between items-center mx-5 ">
              <h1
                className="
            text-3xl
            font-bold
            mt-5
            mb-1
          "
              >
                Models
              </h1>
            </div>
            <Card />
          </div>
        </div>
      </>
    </>
  );
}
