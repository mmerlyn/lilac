import { Controller, Body, Post, Get, Headers } from '@nestjs/common';
import {
  refreshTokenDTO,
  signUpRequestDTO,
  signinDTO,
  signupInitDTO,
  signupVerifyDTO,
} from 'src/dto/request.dto';
import { UserService } from 'src/services/user.service';

@Controller('/user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('profile')
  getProfile(
    @Headers('Authorization') accessToken: string,
    @Headers('idToken') idToken: string,
  ) {
    const profile = this.userService.getProfile({ accessToken, idToken });
    return profile;
  }

  @Post('signup/init')
  signupInit(@Body() request: signupInitDTO) {
    const response = this.userService.signupInit(request);
    return response;
  }

  @Post('signup/verify')
  signupVerify(@Body() request: signupVerifyDTO) {
    const response = this.userService.signupVerify(request);
    return response;
  }

  @Post('signup')
  signUp(@Body() request: signUpRequestDTO) {
    const response = this.userService.signUp(request);
    return response;
  }

  @Post('login')
  login(@Body() request: signinDTO) {
    const response = this.userService.login(request);
    return response;
  }

  @Post('token/refresh')
  refreshToken(@Body() request: refreshTokenDTO) {
    const response = this.userService.refreshToken(request);
    return response;
  }
}
