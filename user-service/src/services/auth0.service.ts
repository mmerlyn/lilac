// auth0.service.ts
import { Injectable } from '@nestjs/common';
import * as auth0 from 'auth0';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0Service {
  private auth0MangementClient: auth0.ManagementClient;
  private auth0AuthenticationClient: auth0.AuthenticationClient;

  constructor(private configService: ConfigService) {
    const auth0Domain = this.configService.get('AUTH_DOMAIN');
    const authToken = this.configService.get<string>('AUTH_TOKEN');
    const auth0ClientId = this.configService.get<string>('AUTH_CLIENT_ID');
    const auth0ClientSecret =
      this.configService.get<string>('AUTH_CLIENT_SECRET');

    this.auth0MangementClient = new auth0.ManagementClient({
      token: authToken,
      domain: auth0Domain,
    });

    this.auth0AuthenticationClient = new auth0.AuthenticationClient({
      domain: auth0Domain,
      clientId: auth0ClientId,
      clientSecret: auth0ClientSecret,
    });
  }

  async createUser(user: auth0.CreateUserData): Promise<any> {
    try {
      const createdUser = await this.auth0MangementClient.createUser(user);
      return createdUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async authorizeUser(
    username: string,
    password: string,
  ): Promise<auth0.TokenResponse> {
    try {
      const token: auth0.TokenResponse =
        await this.auth0AuthenticationClient.passwordGrant({
          username,
          password,
          realm: 'Username-Password-Authentication',
          scope: 'openid profile email offline_access',
        });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async authorizeRefreshToken(
    refreshToken: string,
  ): Promise<auth0.TokenResponse> {
    try {
      const token: auth0.TokenResponse =
        await this.auth0AuthenticationClient.refreshToken({
          refresh_token: refreshToken,
        });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
