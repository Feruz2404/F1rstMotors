import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { compare, hash } from 'bcrypt';
import { Admin } from '../admin/models/admin.model';
import { Tokens } from '../types';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { SignInAdminDto, SignInClientDto } from './dto';
import { ClientService } from '../clients/client.service';
import { Client } from '../clients/models/client.model';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { generateOTP } from '../helpers/generate-otp';
import { MailService } from '../mail/mail.service';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { AddMinutesToDate } from '../helpers/addMinutes';
import * as uuid from 'uuid';
import { timestamp } from 'rxjs';
import { decode, encode } from 'punycode';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpAgainDto } from './dto/send-otp-again.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Otp) private otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly clientService: ClientService,
    private readonly mailService: MailService,
  ) {}

  // ------------------------- Admin Auth --------------------------------

  async generateAdminTokens(admin: Admin): Promise<Tokens> {
    const payload = {
      id: admin.id,
      login: admin.login,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_ADMIN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateAdminRefreshToken(id: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.adminService.updateRefreshToken(id, hashed_refresh_token);
  }

  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const newAdmin = await this.adminService.create(createAdminDto);

    if (!newAdmin) {
      throw new InternalServerErrorException("Yangi Admin qo'shishda xatolik");
    }

    const tokens = await this.generateAdminTokens(newAdmin);
    await this.updateAdminRefreshToken(newAdmin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return { id: newAdmin.id, access_token: tokens.access_token };
  }

  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findByLogin(signInAdminDto.login);

    if (!admin) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    const validPassword = await compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    admin.is_active = true;
    await admin.save();

    const tokens = await this.generateAdminTokens(admin);
    await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return {
      message: 'Admin sign in succesfully',
      id: admin.id,
      access_token: tokens.access_token,
    };
  }

  async signOutAdmin(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      const admin = await this.adminService.findByLogin(payload.login);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token');
      }
      admin.is_active = false;
      admin.hashed_refresh_token = null;
      admin.save();

      res.clearCookie('refresh_token');

      return { message: 'Admin sign out' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshAdminToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      const admin = await this.adminService.findByLogin(payload.login);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await compare(
        refresh_token,
        admin.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateAdminTokens(admin);
      await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.COOKIE_TIME,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // ------------------------- Client Auth -----------------------
  async generateClientTokens(client: Client): Promise<Tokens> {
    const payload = {
      id: client.id,
      email: client.email,
      is_active: client.is_active,
      is_owner: client.is_owner,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateClientRefreshToken(id: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.clientService.updateRefreshToken(id, hashed_refresh_token);
  }

  async signUpClient(createClientDto: CreateClientDto, res: Response) {
    const newClient = await this.clientService.create(createClientDto);

    if (!newClient) {
      throw new InternalServerErrorException("Yangi Admin qo'shishda xatolik");
    }

    const tokens = await this.generateClientTokens(newClient);
    await this.updateClientRefreshToken(newClient.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    const OTP = generateOTP();
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { email: createClientDto.email } });

    const newOtp = await this.otpModel.create({
      id: uuid.v4(),
      otp: OTP,
      expiration_time,
      email: createClientDto.email,
    });
    const details = {
      timestamp: now,
      email: createClientDto.email,
      otp_id: newOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    try {
      await this.mailService.sendMail(newClient, OTP);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Xat yuborishda xatolik');
    }

    return {
      id: newClient.id,
      access_token: tokens.access_token,
      details: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const currentDate = new Date();
    const decodedData = await decode(verifyOtpDto.verification_key);
    const details = JSON.parse(decodedData);
    if (details.email !== verifyOtpDto.email) {
      throw new BadRequestException("OTP didn't send this email");
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: details.otp_id },
    });

    if (!resultOtp) {
      throw new BadRequestException('There is no such otp');
    }
    if (resultOtp.verified) {
      throw new BadRequestException('This OTP has been verified before');
    }
    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException('This OTP has expired');
    }
    if (resultOtp.otp !== verifyOtpDto.otp) {
      throw new BadRequestException('OTP is not eligible');
    }
    const client = await this.clientService.updateClientByEmail(verifyOtpDto.email);
    if (!client) {
      throw new BadRequestException('No such client exists');
    }
    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } },
    );

    return { message: 'Client activated', is_active: client.is_active };
  }

  async sendOtpAgain(sendOtpAgainDto: SendOtpAgainDto) {
    try {
      const client = await this.clientService.findByEmail(sendOtpAgainDto.email)
      if (!client) {
        throw new NotFoundException("Client not found")
      }
      if (client.is_active) {
        return {message:"Client already activated"}
      }
      const OTP = generateOTP();
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      await this.otpModel.destroy({ where: { email: sendOtpAgainDto.email } });

      const newOtp = await this.otpModel.create({
        id: uuid.v4(),
        otp: OTP,
        expiration_time,
        email: sendOtpAgainDto.email,
      });
      const details = {
        timestamp: now,
        email: sendOtpAgainDto.email,
        otp_id: newOtp.id,
      };

      const encodedData = await encode(JSON.stringify(details));

      try {
        await this.mailService.sendMail(client, OTP);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Xat yuborishda xatolik');
      }

      return { message:"OTP sended your email address", details: encodedData };
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Error in send otp again")
    }
  }

  async signInClient(signInClientDto: SignInClientDto, res: Response) {
    const client = await this.clientService.findByEmail(signInClientDto.email);

    if (!client) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    const validPassword = await compare(
      signInClientDto.password,
      client.hashed_password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    client.is_active = true;
    await client.save();

    const tokens = await this.generateClientTokens(client);
    await this.updateClientRefreshToken(client.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return {
      message: 'Client sign in succesfully',
      id: client.id,
      access_token: tokens.access_token,
    };
  }

  async signOutClient(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const client = await this.clientService.findByEmail(payload.email);
      if (!client) {
        throw new BadRequestException('Invalid refresh token');
      }
      client.is_active = false;
      client.hashed_refresh_token = null;
      client.save();

      res.clearCookie('refresh_token');

      return { message: 'Client sign  out' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshClientToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const client = await this.clientService.findByEmail(payload.email);
      if (!client) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await compare(
        refresh_token,
        client.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateClientTokens(client);
      await this.updateClientRefreshToken(client.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.COOKIE_TIME,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: client.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
