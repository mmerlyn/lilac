export class signUpRequestDTO {
  sessionId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: number;
}

export class signupInitDTO {
  email: string;
}

export class signupVerifyDTO {
  sessionId: string;
  otp: number;
}

export class signinDTO {
  email: string;
  password: string;
}

export class refreshTokenDTO {
  refreshToken: string;
}

export class tokenRequestDTO {
  accessToken: string;
  idToken: string;
}
