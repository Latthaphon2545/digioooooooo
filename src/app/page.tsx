import axios from "axios";

export default async function Home() {
  try {
    const getdata = await axios.get("http://localhost:3000/api");
    console.log(getdata.data);
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <h1 className="text-[200px] font-bold mt-5 mb-1 text-center">
        Digioooooo
      </h1>
    </>
  );
}
