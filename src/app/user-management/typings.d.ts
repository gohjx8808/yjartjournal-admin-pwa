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

  interface addNewUserPayload extends addUpdatePayload {
    email: string;
    roleIds?: number[];
  }

  type updateUserPayload = addUpdatePayload & userIdPayload;

  interface addUpdatePayload {
    name: string;
    preferredName?: string | null;
    countryCode: string;
    phoneNumber: string;
    gender: genderOption;
    dob: string;
  }

  type genderOption = 'M' | 'F';

  interface userIdPayload {
    userId: number;
  }

  type deleteUserPayload = userIdPayload;

  interface deleteUserDialogData {
    data: userData;
    onRefreshData: () => void;
  }
}
