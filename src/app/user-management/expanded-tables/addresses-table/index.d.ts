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
}
