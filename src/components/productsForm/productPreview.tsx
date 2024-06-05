export default function ProductPreview({
  data,
  modelNames,
}: {
  data: {
    email?: string | undefined;
    name?: string | undefined;
    contact?: string | undefined;
    sn?: string | undefined;
    model?: string | undefined;
  }[];
  modelNames: string[];
}) {
  const checkSN = (sn: string, index: number) => {
    const isDuplicate = data.slice(0, index).some((item) => item.sn === sn);
    return !isDuplicate;
  };

  const validateModel = (inputModel: string) => {
    return modelNames
      ?.map((item) => item.toLowerCase())
      .includes(inputModel!.toLowerCase().trim().replace(/ +/g, "") || "");
  };

  return (
    <div>
      <table className="table ">
        <thead className="text-xl">
          <tr>
            <th>No.</th>
            <th>S/N</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="text-xl font-medium">{index + 1}.</td>
              <td
                className={`p-2 text-lg ${
                  checkSN(row.sn ?? "", index) ? "text-success" : "text-error"
                }`}
              >
                {row.sn}
              </td>
              <td
                className={`overflow-scroll p-2  flex flex-row space-x-4 text-lg ${
                  validateModel(row.model ?? "") ? "text-success" : "text-error"
                }`}
              >
                {row.model}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
