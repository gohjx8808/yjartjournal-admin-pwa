declare namespace role {
  interface userRole {
    id: 1;
    role: {
      name: string;
    };
    createdAt: string;
  }

  interface deleteRoleDialogData extends users.userIdPayload {
    data: userRole;
  }

  interface deleteUserRolePayload {
    userRoleId: number;
  }

  interface addUserRolePayload extends users.userIdPayload {
    roleId: number;
  }
}
