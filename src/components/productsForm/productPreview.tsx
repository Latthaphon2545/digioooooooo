export default function ProductPreview({
  data,
  model,
}: {
  data: {
    email?: string | undefined;
    name?: string | undefined;
    contact?: string | undefined;
    sn?: string | undefined;
    model?: string | undefined;
  }[];
  model: string[];
}) {
  console.log(data[0].model, data[0].sn);
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
              <td className="p-2 text-lg">{row.sn}</td>
              <td
                className={`overflow-scroll p-2  flex flex-row space-x-4 text-lg ${
                  model.includes(row.model ?? "")
                    ? "text-success"
                    : "text-error"
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
