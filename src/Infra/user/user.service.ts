import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Payload } from './interfaces/payload.interface';
import { SignUpUseCase } from '@app/sign-up-use-case/sign-up.use-case';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(SignInUseCase) private readonly signInUseCase: SignInUseCase,
    @Inject(SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
    @Inject(UserRepository) private readonly userRepo: UserRepository,
  ) {}

  async signIn(dto: SignInDto): Promise<void> {
    const result = await this.signInUseCase.execute(dto);
    //
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async SignUp(dto: SignUpDto): Promise<Payload> {
    const result = await this.signUpUseCase.execute(dto);
    if (result.isFailure) {
      //
      throw new PreconditionFailedException(result.error);
    }
    return { token: result.getResult().token };
  }

  // Query Repository
  async getMyProfile(id: string): Promise<User> {
    return this.userRepo.getMyProfile(id);
  }
}