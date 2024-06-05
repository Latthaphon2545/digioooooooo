import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

export default function Scanner({
  setCode,
  setActive,
}: {
  setCode: (code: string) => void;
  setActive: (active: boolean) => void;
}) {
  return (
    <>
      <BarcodeScanner
        options={{ formats: ["code_128"] }}
        onCapture={(code) => {
          setCode(code.rawValue);
          setActive(false);
          console.log(code.rawValue);
        }}
      />
    </>
  );
}
