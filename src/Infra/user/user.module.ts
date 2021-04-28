import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { JWT_EXPIRATION_IN_HOURS, JWT_SECRET } from '../configs/env';
import { JwtStrategy } from './services/jwt-strategy';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { SignUpUseCase } from '@app/sign-up-use-case/sign-up.use-case';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: `${JWT_EXPIRATION_IN_HOURS}h`,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserMapper,
      useFactory: () => new UserMapper(),
    },
    JwtStrategy,
    SignInUseCase,
    SignUpUseCase,
    UserRepository,
    UserService,
  ],
})
export class UserModule {}