const INPUT = new Array(10).fill(0);

const UserInput = () => {
  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th>Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody className="p-2 ml-2 ">
          {INPUT.map((_, index) => {
            return (
              <tr key={index}>
                <td>
                  <p className="text-center text-xl font-semibold">
                    {index + 1}
                  </p>
                </td>
                <td>
                  <label className="input input-sm input-bordered flex items-center gap-2 m-2 relative">
                    <input type="text" className="grow" placeholder="Email" />
                    <span className="absolute top-[-1] right-0 bg-primary rounded-r-lg text-white px-5">
                      @digio.co.th
                    </span>
                  </label>
                </td>
                <td>
                  <label className="input input-sm input-bordered flex items-center gap-2 m-1">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Username"
                    />
                  </label>
                </td>
                <td>
                  <label className="input input-sm input-bordered flex items-center gap-2 m-1">
                    <input type="text" className="grow" placeholder="contact" />
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserInput;
