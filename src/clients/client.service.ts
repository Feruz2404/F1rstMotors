import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { hash } from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientModel: typeof Client) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const condidate = await this.clientModel.findOne({
        where: { email: createClientDto.email },
      });

      if (condidate) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }

      if (createClientDto.password !== createClientDto.confirm_password) {
        throw new BadRequestException('Parrollar mos emas');
      }

      const hashed_password = await hash(createClientDto.password, 7);
      const newClient = await this.clientModel.create({
        ...createClientDto,
        hashed_password,
      });

      return newClient;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.clientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.clientModel.findByPk(id, { include: { all: true } });
  }

  async findByEmail(email: string) {
    const client = await this.clientModel.findOne({ where: { email } });
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    if (updateClientDto.password && updateClientDto.confirm_password) {
      if (updateClientDto.password !== updateClientDto.confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }
      const hashed_password = await hash(updateClientDto.password, 7);
      const client = await this.clientModel.update(
        { ...updateClientDto },
        { where: { id }, returning: true },
      );
      return client[1][0];
    }
    const updatedClient = await this.clientModel.update(
      { ...updateClientDto },
      { where: { id }, returning: true },
    );
    return updatedClient[1][0];
  }

  async updateClientByEmail(email: string) {
    const client = await this.clientModel.update(
      { is_active: true },
      { where: { email }, returning: true },
    );
    return client[1][0]
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.clientModel.update(
      { hashed_refresh_token },
      { where: { id }, returning: true },
    );
  }

  remove(id: number) {
    return this.clientModel.destroy({ where: { id } });
  }
}
