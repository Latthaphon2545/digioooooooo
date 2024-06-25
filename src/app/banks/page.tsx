"use client";

import BankPage from "@/components/bank/bankPage";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const data = [
    {
      name: "KBANK",
      bankName: "KASIKORN BANK",
      bankLogo:
        "https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png",
    },
    {
      name: "SCB",
      bankName: "SIAM COMMERCIAL BANK",
      bankLogo:
        "https://seeklogo.com/images/S/siam-commercial-bank-logo-B9BB3E105F-seeklogo.com.png",
    },
    {
      name: "XXXXB",
      bankName: "XXXXXXX",
      bankLogo:
        "https://seeklogo.com/images/S/siam-commercial-bank-logo-B9BB3E105F-seeklogo.com.png",
    },
    {
      name: "asdf",
      bankName: "12345",
      bankLogo:
        "https://seeklogo.com/images/S/siam-commercial-bank-logo-B9BB3E105F-seeklogo.com.png",
    },
  ];

  const products = [
    {
      name: "A920",
      status: {
        INSTOCK: 2,
        INSTALLED: 1,
        INSTALLING: 0,
        REPARING: 0,
        DAMAGED: 0,
        LOST: 0,
        WAITREPAIR: 0,
      },
      bg: "bg-[url('https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1402119/PED_PAX_3-4_BB_gzxui4.jpg')]",
    },
    {
      name: "A920Pro",
      status: {
        INSTOCK: 2,
        INSTALLED: 1,
        INSTALLING: 0,
        REPARING: 0,
        DAMAGED: 0,
        LOST: 0,
        WAITREPAIR: 0,
      },
      bg: "bg-[url('https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/1402119/355934_850640.png')]",
    },
  ];

  return (
    <div>
      <BankPage banks={data} products={products} />
    </div>
  );
}
