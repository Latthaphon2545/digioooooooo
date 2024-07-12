import SubmitPopupButton from "@/components/submitPopupButton";

interface UpdateBtnProps {
  item: any;
  name: string;
  contact: string;
  handleUpdate: any;
  loadings: { [key: string]: boolean };
}

export const UpdateBtn = ({
  item,
  name,
  contact,
  handleUpdate,
  loadings,
}: UpdateBtnProps) => {
  return (
    <SubmitPopupButton
      action={async () => {
        await handleUpdate();
      }}
      styles={`btn-success btn-sm ${
        contact.length !== 10 || name.length === 0 ? "btn-disabled" : ""
      }`}
      disabled={contact.length !== 10 || name.length === 0}
      confirmString={
        loadings[item.id] ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          "Update"
        )
      }
      confirmStyle="btn-success btn-sm"
      header="Are you sure you want to update this user?"
      description=""
      id={item.id}
    >
      Update
    </SubmitPopupButton>
  );
};
