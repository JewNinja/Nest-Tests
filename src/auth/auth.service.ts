import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { IRefreshToken } from './interfaces/refresh-token.interface';
import { InjectModel } from '@nestjs/mongoose';
import { LIFETIMES } from './auth.module';
import { INewUser } from 'src/users/interfaces/user.interface';


@Injectable()
export class AuthService {
  constructor(@InjectModel('RefreshToken') private readonly refreshTokenModel: Model<IRefreshToken>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && user.password === pass) {
      return this.generateTokensForUser(user)
    }
    return null;
  }

  async signupUser(userData): Promise<any> {
    const user = await this.userService.findOne({ email: userData.email });
    if (user && user.password === userData.password) {
      return this.generateTokensForUser(user)
    } else if (user) {
      return 'email occupied'
    } else {
      const user = await this.userService.create(userData);
      return this.generateTokensForUser(user)
    }
  }

  generateTokensForUser(user) {
    const res = {
      access_token: this.generateToken({ email: user.email }),
      refresh_token: this.generateRefreshToken({ type: 'refreshToken', secret: this.configService.get('JWT_SECRET'), userId: user._id, email: user.email }),
      expiresIn: moment().add(LIFETIMES.TOKEN, 'hours').format(),
    }
    this.replaceRefreshTokenInDb(res.refresh_token, user._id)
    return res
  }

  generateToken(payload) {
    return this.jwtService.sign(payload)
  }

  generateRefreshToken(payload) {
    return this.jwtService.sign(payload);
  }
  // this.jwtService.verify(refreshToken)
  async replaceRefreshTokenInDb(refreshToken, userId) {
    const isExist = await this.refreshTokenModel.exists({ userId })
    isExist
      ? this.refreshTokenModel.findOneAndUpdate({ userId }, { refreshToken, expiresIn: moment().add(LIFETIMES.REFRESH, 'hours').format() }).exec()
      : this.refreshTokenModel.create({ refreshToken, userId, expiresIn: moment().add(LIFETIMES.REFRESH, 'hours').format() });
  }

  async refreshToken(refreshToken) {
    let verifiedData
    try {
      verifiedData = this.jwtService.verify(refreshToken)
    } catch (err) {
      return false
    }
    
    if (verifiedData
        && verifiedData.userId
        && verifiedData.type === 'refreshToken'
        && verifiedData.secret === this.configService.get('JWT_SECRET')
    ) {
      const refreshTokenFromDb = await this.refreshTokenModel.findOne({ userId: verifiedData.userId }).exec()
      if (refreshTokenFromDb && refreshTokenFromDb.refreshToken === refreshToken && moment(refreshTokenFromDb.expiresIn).valueOf() - moment().valueOf() > 0) {
        return this.generateTokensForUser({ _id: verifiedData.userId, email: verifiedData.email })
      }
      return false
    }
  }

}