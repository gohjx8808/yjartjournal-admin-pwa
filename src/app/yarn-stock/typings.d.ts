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
    imageUrl: string | null;
  }

  interface yarnStockCheckbox extends globalType.optionData {
    checked: boolean;
  }

  interface updateQuantityPayload extends refreshData {
    yarnId: number;
    quantity: number;
  }

  interface filterDialogData {
    catList: yarnStockCheckbox[];
    colorCatList: yarnStockCheckbox[];
    onChange: () => void;
  }

  interface addYarnStockPayload extends addEditYarnStockPayload, refreshData {
    quantity: number;
  }

  interface addEditYarnStockPayload {
    yarnCategoryId: number;
    yarnColorCategoryId: number;
    name: string;
    cost: number;
    reorderLevel: number;
    lastOrderedDate?: Date;
    image?: string | null;
  }

  interface refreshData {
    onRefreshData: () => void;
  }
}
