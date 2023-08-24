declare namespace auth {
  interface signInPayload extends signInFormData {
    role: number;
  }

  interface signInFormData {
    email: string;
    password: string;
  }

  interface signInResponse {
    accessToken: string;
  }
}
