declare namespace users {
  interface userData {
    id: number;
    name: string;
    preferredName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
    dob: string;
    createdAt: string;
    addresses: userAddress[];
    userRoles: userRole[];
  }

  interface userAddress {
    id: number;
    receiverName: string;
    receiverCountryCode: string;
    receiverPhoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    postcode: string;
    city: string;
    country: string;
    isDefault: boolean;
    tag: string;
    createdAt: string;
  }

  interface userRole {
    id: 1;
    role: {
      name: 'customer';
    };
    createdAt: '2023-06-19T00:07:32.981Z';
  }
}
