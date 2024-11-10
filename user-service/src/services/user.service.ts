import { Injectable, Logger } from '@nestjs/common';
import {
  refreshTokenDTO,
  signUpRequestDTO,
  signinDTO,
  signupInitDTO,
  signupVerifyDTO,
  tokenRequestDTO,
} from 'src/dto/request.dto';
import * as auth0 from 'auth0';
import { Auth0Service } from './auth0.service';
import { UserDao } from 'src/dao/user.dao';
import { SignupSessionDao } from 'src/dao/signupSession.dao';
import { ObjectId } from 'mongodb';

import {
  ProfileResponseDTO,
  SignupInitResponseDTO,
  SignupVerifyResponseDTO,
  TokenResponseDTO,
} from 'src/dto/response.dto';
import { APIResponseDTO } from 'src/dto/common.dto';
import jwtDecode from 'jwt-decode';
import { idTokenInterface } from 'src/interfaces/token.interface';
import { UserDataDao } from 'src/dao/user-data.dao';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    private readonly userDao: UserDao,
    private readonly auth0Service: Auth0Service,
    private readonly signupSessionDao: SignupSessionDao,
    private readonly userDataDao: UserDataDao,
  ) {}

  async signUp(request: signUpRequestDTO) {
    const response = new APIResponseDTO<TokenResponseDTO>();
    try {
      const session = await this.signupSessionDao.readSession(
        new ObjectId(request.sessionId),
      );

      if (session.verified === false || session.email !== request.email) {
        throw new Error(`registration not verified`);
      }

      const userId = await this.userDao.createDocument({
        firstName: request.firstName,
        lastName: request.lastName,
        phoneNumber: request.phoneNumber,
        email: request.email,
      });

      await Promise.all([
        this.userDataDao.createDocument({
          userId: new ObjectId(userId),
          address: [
            {
              place: request.address,
              locality: request.locality,
              city: request.city,
              state: request.state,
              pinCode: request.pincode,
            },
          ],
        }),
        this.auth0Service.createUser({
          name: `${request.firstName} ${request.lastName}`,
          user_id: userId,
          email: request.email,
          password: request.password,
          connection: 'Username-Password-Authentication',
        }),
      ]);

      const token = await this.auth0Service.authorizeUser(
        request.email,
        request.password,
      );

      response.payload = new TokenResponseDTO(
        token.access_token,
        token.id_token ? token.id_token : '',
        token.refresh_token ? token.refresh_token : '',
        token.expires_in,
      );

      return response;
    } catch (error) {
      this.logger.error(
        `User signup failed for username: ${request.email} error:${error.message}`,
      );
      response.status.setError(error.message);
      return response;
    }
  }

  async getProfile(request: tokenRequestDTO) {
    let userId = '';
    const response = new APIResponseDTO<ProfileResponseDTO>();
    try {
      const tokenInfo: idTokenInterface = jwtDecode(request.idToken);
      userId = tokenInfo.sub.split('|')[1];
      const profile = await this.userDao.getProfile(new ObjectId(userId));
      response.payload = new ProfileResponseDTO(
        profile._id,
        profile.firstName,
        profile.lastName,
        profile.phoneNumber,
        profile.email,
        profile.result.address,
      );

      this.logger.log(`profile info fetch complete for userId: ${userId}`);

      return response;
    } catch (error) {
      this.logger.error(
        `Profile info fetch failed for userId: ${userId} error:${error.message}`,
      );

      response.status.setError(error.message);
      return response;
    }
  }

  async signupInit(request: signupInitDTO) {
    const response = new APIResponseDTO<SignupInitResponseDTO>();

    try {
      await this.userDao.isUserExists(request.email);
      //const otp = Math.floor(100000 + Math.random() * 900000);
      const otp = 123456;
      const ack = await this.signupSessionDao.createDocument({
        email: request.email,
        otp,
        verified: false,
      });

      /* sending email to the user. will be done later  */

      response.payload = new SignupInitResponseDTO(ack[0]._id.toString());

      return response;
    } catch (error) {
      this.logger.error(`SignupInit error occured ${error.message}`);
      response.status.setError(error.message);
      return response;
    }
  }

  async signupVerify(request: signupVerifyDTO) {
    const response = new APIResponseDTO<SignupVerifyResponseDTO>();

    try {
      const session = await this.signupSessionDao.readSession(
        new ObjectId(request.sessionId),
      );
      if (session.otp == request.otp) {
        await this.signupSessionDao.updateSession(
          new ObjectId(request.sessionId),
        );
        response.payload = new SignupVerifyResponseDTO(true);
      } else {
        throw new Error('Incorrect OTP');
      }
      return response;
    } catch (error) {
      this.logger.error(`SignupVerify error occured ${error.message}`);
      response.status.setError(error.message);
      return response;
    }
  }

  async login(request: signinDTO) {
    const response = new APIResponseDTO<TokenResponseDTO>();
    try {
      const token = await this.auth0Service.authorizeUser(
        request.email,
        request.password,
      );

      response.payload = new TokenResponseDTO(
        token.access_token,
        token.id_token ? token.id_token : '',
        token.refresh_token ? token.refresh_token : '',
        token.expires_in,
      );

      return response;
    } catch (error) {
      this.logger.error(`SignupVerify error occured ${error.message}`);
      response.status.setError(error.message);
      return response;
    }
  }

  async refreshToken(request: refreshTokenDTO) {
    const response = new APIResponseDTO<TokenResponseDTO>();
    try {
      const token = await this.auth0Service.authorizeRefreshToken(
        request.refreshToken,
      );

      response.payload = new TokenResponseDTO(
        token.access_token,
        token.id_token ? token.id_token : '',
        token.refresh_token ? token.refresh_token : '',
        token.expires_in,
      );
      return response;
    } catch (error) {
      this.logger.error(`Refresh token authorization failed: ${error.message}`);
      response.status.setError(error.message);
      return response;
    }
  }
}
