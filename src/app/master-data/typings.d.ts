declare namespace masterData {
  interface addEditDialogData {
    data?: globalType.optionData;
    isAdd: boolean;
    isYarnCategory: boolean;
  }

  interface deleteDialogData {
    data: globalType.optionData;
    isYarnCategory: boolean;
  }

  interface addMasterDataPayload {
    name: string;
  }

  interface deleteMasterDataPayload {
    id: number;
  }

  type updateMasterDataPayload = addMasterDataPayload & deleteMasterDataPayload;
}
