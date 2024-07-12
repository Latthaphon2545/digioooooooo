export interface TablePageProps {
  data: {
    [key: string]: any;
  }[];
  editor: boolean;
  totalLength: number;
  skip: number;
}

export interface ViewProps {
  item: any;
  isEditing?: any;
  setIsEditing?: any;
  editor: boolean;
  handleUpdate: any;
}

// User Page
export interface TableUserBodyProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor: boolean;
}

export interface TableProductBodyProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  bankData: {
    [key: string]: any;
  }[];
}

export interface PopupButtonUpdateProps {
  setOpenModal?: (value: boolean) => void;
  handleUpdate: any;
  item: any;
  name: string;
  role: string;
  status: string;
  contact: string;
  setName: (value: string) => void;
  setRole: (value: string) => void;
  setStatus: (value: string) => void;
  setContact: (value: string) => void;
  loadings: { [key: string]: boolean };
  setLoadings: (loadings: { [key: string]: boolean }) => void;
}

// Product Page
export interface TableProductViewProps {
  item: any;
  dataBank: {
    [key: string]: any;
  }[];

  // -------
  handleDeleteMerchant: ({
    id,
    setLoadingDelete,
  }: {
    id: string;
    setLoadingDelete: (value: boolean) => void;
  }) => void;

  // -------
  handleAddMerchant: ({
    productId,
    merchantId,
    setLoadingAdd,
  }: {
    productId: string;
    merchantId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => void;

  // -------
  handleDeleteBank: ({
    id,
    setLoadingDelete,
  }: {
    id: string;
    setLoadingDelete: (value: boolean) => void;
  }) => void;

  // -------
  handleAddBank: ({
    productId,
    bankId,
    setLoadingAdd,
  }: {
    productId: string;
    bankId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => void;
}
