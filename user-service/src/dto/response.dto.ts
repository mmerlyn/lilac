import { ObjectId } from 'mongodb';

export class ProfileResponseDTO {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: Array<AddressDTO>;

  constructor(
    userId: ObjectId,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    address: Array<AddressDTO>,
  ) {
    this.userId = userId.toString();
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
  }
}
export class AddressDTO {
  place: string;
  locality: string;
  city: string;
  state: string;
  pincode: number;
}

export class SignupInitResponseDTO {
  sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }
}

export class SignupVerifyResponseDTO {
  verified: boolean;

  constructor(verified: boolean) {
    this.verified = verified;
  }
}

export class TokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiryIn: number;

  constructor(
    accessToken: string,
    idToken: string,
    refreshToken: string,
    expiryIn: number,
  ) {
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.expiryIn = expiryIn;
  }
}
