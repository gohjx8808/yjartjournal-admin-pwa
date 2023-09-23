declare namespace masterData {
  interface addEditData {
    data?: globalType.optionData;
    isAdd: boolean;
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
