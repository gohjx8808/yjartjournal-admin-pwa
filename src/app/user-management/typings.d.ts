declare namespace users {
  interface userListReponse {
    users: userData[];
    totalFiltered: number;
  }

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
    state: {
      name: string;
    };
    country: string;
    isDefault: boolean;
    tag: string;
    createdAt: string;
  }

  interface userRole {
    id: 1;
    role: {
      name: string;
    };
    createdAt: string;
  }

  interface getUserListPayload {
    sortBy: sortOption;
    filter?: string;
    pagination: {
      pageSize: number;
      page: number;
    };
  }

  interface sortOption {
    name?: string;
    order: sortOrder;
  }

  type sortOrder = 'DESC' | 'ASC' | '';

  interface addEditDialogData {
    data?: userData;
    actionType: 'Add' | 'Edit';
    onRefreshData: () => void;
  }

  interface formOption {
    roles: globalType.checkboxOption[];
    gender: globalType.stringOptionData[];
  }

  interface addNewUserPayload {
    name: string;
    preferredName?: string | null;
    email: string;
    countryCode: string;
    phoneNumber: string;
    gender: string;
    dob: string;
    roleIds?: number[];
  }

  interface updateUserPayload {
    userId: number;
    name: string;
    preferredName: string;
    countryCode: string;
    phoneNumber: string;
    gender: 'M' | 'F';
    dob: string;
  }

  interface deleteUserPayload {
    userId: number;
  }
}
