type InputPreviewProps = {
  data: {
    email: string;
    name: string;
    contact: string;
  }[];
};
const checkEmail = (email: string) => {
  return email.endsWith("@digio.co.th");
};

export function InputPreview({ data }: InputPreviewProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-medium text-center">Preview List</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="badge badge-primary badge-lg py-4 px-2 absolute top-2 right-2">
        {data.length}
      </div>
      <div className="">
        <table className="table">
          <thead className="text-xl">
            <tr>
              <th>No.</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="text-xl font-medium">{index + 1}.</td>
                <td
                  className={`overflow-scroll p-2  flex flex-row space-x-4 text-lg ${
                    checkEmail(row.email) ? "text-success" : "text-error"
                  }`}
                >
                  {row.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
