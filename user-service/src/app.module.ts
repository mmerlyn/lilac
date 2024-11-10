import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MONGO_CONNECTION } from './consts/user.conts';
import { Auth0Service } from './services/auth0.service';
import { MUserData, UserDataSchema } from './models/m_user_data.model';
import { MUser, UserSchema } from './models/m_user.model';
import { UserDao } from './dao/user.dao';
import { SignupSessionDao } from './dao/signupSession.dao';
import {
  MSignupSession,
  SignupSessionSchema,
} from './models/m_signup_session.model';
import { UserDataDao } from './dao/user-data.dao';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.CONFIG_DIR!.trim()}/${process.env.ENVIRONMENT!.trim()}.env`,
    }),
    MongooseModule.forRootAsync({
      connectionName: MONGO_CONNECTION,
      useFactory: async () => {
        const MONGO_USERNAME = process.env.MONGO_USERNAME;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
        const MONGO_HOST = process.env.MONGO_HOST;
        const MONGO_DATABASE = process.env.MONGO_DATABASE;
        const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
        return {
          uri: URI,
        };
      },
    }),
    MongooseModule.forFeature(
      [
        {
          name: MUserData.name,
          schema: UserDataSchema,
        },
        { name: MUser.name, schema: UserSchema },
        {
          name: MSignupSession.name,
          schema: SignupSessionSchema,
        },
      ],
      MONGO_CONNECTION,
    ),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    Auth0Service,
    UserDao,
    SignupSessionDao,
    UserDataDao,
  ],
})
export class AppModule {}
