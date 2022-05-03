import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repsitories/UsersRepository';
import UserTokensRepository from '../typeorm/repsitories/UserTokensRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
