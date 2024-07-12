import SubmitPopupButton from "@/components/submitPopupButton";
import { handleSearchMerchant } from "@/lib/actions/productTable/handleUpdateMerchant";
import { useState } from "react";

interface ModalMerchantAddProps {
  productId: string;
  handleAddMerchant: ({
    productId,
    merchantId,
    setLoadingAdd,
  }: {
    productId: string;
    merchantId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => void;
}

interface Merchant {
  id: string;
  name: string;
  contact: string;
}

export const ModalMerchantAdd = ({
  productId,
  handleAddMerchant,
}: ModalMerchantAddProps) => {
  const [merchantId, setMerchantId] = useState("");
  const [merchantSelect, setMerchantSelect] = useState<any>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [search, setSearch] = useState("");

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearch = async (search: string) => {
    const res = await handleSearchMerchant({
      merchantSearch: search,
      setLoadingSearch,
    });
    setMerchants(res);
  };

  const handleClick = ({ merchant }: any) => {
    if (merchantId === merchant.id) {
      setMerchantId("");
      setMerchantSelect([]);
    } else {
      setMerchantId(merchant.id);
      setMerchantSelect(merchant);
    }
  };

  return (
    <div className=" flex flex-col gap-5 items-center overflow-hidden w-full">
      <div className="flex flex-col gap-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Merchant ID"
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          <div className="min-w-5">
            {loadingSearch && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </div>
        </label>
      </div>

      <div className="text-center h-60">
        {merchants.length === 0 && search.length === 0 && (
          <p>Please search for a merchant.</p>
        )}

        {merchants.length === 0 && search.length > 0 && !loadingSearch && (
          <p>No merchant found.</p>
        )}

        {merchants.length >= 1 && search.length >= 1 && (
          <div className="overflow-y-auto max-h-60">
            <table className="table text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((merchant, index) => (
                  <tr key={index}>
                    <td className="w-1/12">
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={merchant.id}
                          onChange={() => handleClick({ merchant })}
                          checked={merchantId === merchant.id}
                        />
                      </label>
                    </td>
                    <td className="w-10/12">{merchant.name}</td>
                    <td className="w-1/12">{merchant.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2 items-center h-5">
        <p>{merchantSelect?.name || ""}</p>
        {merchantId && (
          <button
            className="link link-error"
            onClick={() => {
              setMerchantId("");
              setMerchantSelect([]);
            }}
          >
            Clear
          </button>
        )}
      </div>

      <SubmitPopupButton
        action={async () => {
          handleAddMerchant({ productId, merchantId, setLoadingAdd });
        }}
        header="Add Merchant"
        styles={`btn-primary w-full ${merchantId === "" ? "btn-disabled" : ""}`}
        description={`Are you sure you want to add ${merchantSelect.name} as a merchant?`}
        id={`modal-merchant-${productId}`}
        confirmString={"Confirm"}
        confirmStyle="btn-success"
      >
        {loadingAdd ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          "Add"
        )}
      </SubmitPopupButton>
    </div>
  );
};
