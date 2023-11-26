declare namespace address {
  interface userAddress {
    id: number;
    receiverName: string;
    receiverCountryCode: string;
    receiverPhoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    postcode: string;
    city: string;
    state: {
      name: string;
    };
    country: string;
    isDefault: boolean;
    tag: string;
    createdAt: string;
  }

  interface addressFormOptions {
    tags: string[];
    states: globalType.optionData[];
  }

  interface addEditDialogData {
    actionType: globalType.dialogActionType;
    userId: number;
    data?: userAddress;
  }

  interface addAddressPayload extends users.userIdPayload {
    receiverName: string;
    receiverCountryCode: string;
    receiverPhoneNumber: string;
    addressLineOne: string;
    addressLineTwo?: string;
    postcode: string;
    city: string;
    state: globalType.optionData;
    country: string;
    isDefault: boolean;
    tag?: string;
  }

  interface deleteAddressPayload {
    addressId: number;
  }

  type updateAddressPayload = addAddressPayload & deleteAddressPayload;

  interface deleteDialogData extends users.userIdPayload {
    data: userAddress;
  }
}
