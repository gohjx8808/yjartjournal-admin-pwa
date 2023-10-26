declare namespace yarnStock {
  interface getAllYarnStockPayload {
    yarnCategoryIds: number[];
    yarnColorCategoryIds: number[];
  }

  interface yarnStockData {
    id: number;
    detailedColor: string;
    costPerItem: number;
    inStockQuantity: number;
    usedQuantity: number;
    reorderLevel: number;
    lastOrderedAt?: string;
    yarnColorCategory: globalType.optionData;
    yarnCategory: globalType.optionData;
    reorderStatus: 'Optimum' | 'Reorder';
    imageUrl: string | null;
  }

  interface yarnStockCheckbox extends globalType.optionData {
    checked: boolean;
  }

  interface updateQuantityPayload {
    yarnId: number;
    quantity: number;
    onRefreshData: () => void;
  }

  interface filterDialogData {
    catList: yarnStockCheckbox[];
    colorCatList: yarnStockCheckbox[];
    onChange: () => void;
  }

  interface addYarnStockPayload extends addEditYarnStockPayload {
    quantity: number;
  }

  interface addEditYarnStockPayload {
    yarnCategory: globalType.optionData;
    yarnColorCategory: globalType.optionData;
    detailedColor: string;
    cost: number;
    reorderLevel: number;
    lastOrderedDate?: Date;
    image?: string | null;
  }
}
