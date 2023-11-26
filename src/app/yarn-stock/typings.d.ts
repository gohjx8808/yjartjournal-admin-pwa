declare namespace yarnStock {
  interface getAllYarnStockPayload {
    yarnCategoryIds: number[];
    yarnColorCategoryIds: number[];
  }

  interface yarnStockData {
    id: number;
    name: string;
    costPerItem: number;
    inStockQuantity: number;
    usedQuantity: number;
    reorderLevel: number;
    lastOrderedAt?: string;
    yarnColorCategory: globalType.optionData;
    yarnCategory: globalType.optionData;
    reorderStatus: 'Optimum' | 'Reorder';
    yarnStockImages?: stockImage[];
  }

  interface stockImage {
    id: number;
    cloudinaryId: string;
    originalName: string;
    imageUrl: string;
  }

  interface updateQuantityPayload {
    yarnId: number;
    quantity: number;
  }

  interface filterDialogData {
    catList: globalType.checkboxOption[];
    colorCatList: globalType.checkboxOption[];
    onChange: () => void;
  }

  interface addYarnStockPayload extends addEditYarnStockPayload {
    quantity: number | null;
    image?: File | null;
  }

  interface addEditYarnStockPayload {
    yarnCategoryId: number | null;
    yarnColorCategoryId: number | null;
    name: string;
    cost: number | null;
    reorderLevel: number | null;
    lastOrderedDate?: Date;
  }

  interface updateYarnStockPayload
    extends addEditYarnStockPayload,
      deleteYarnStockPayload {
    isImageUpdated: boolean;
  }

  interface addEditYarnStockDialogData {
    onRefreshData: () => void;
    actionType: globalType.dialogActionType;
    data?: yarnStockData;
  }

  interface deleteYarnStockPayload {
    yarnId: number;
  }

  interface deleteYarnStockDialogData {
    data: yarnStockData;
    onRefreshData: () => void;
  }
}
