import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";
import { CarFinancing } from "../../car_financing/models/car_financing.entity";

interface IClientCreationAttr {
  full_name: string;
  email: string;
  hashed_password: string;
  phone_number: string;
  is_active: boolean;
  is_owner: boolean;
}

@Table({ tableName: 'client' })
export class Client extends Model<Client, IClientCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Client unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Feruz Rustamov',
    description: 'client full_name',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: 'client@gmail.com',
    description: 'client unique email',
  })
  @Column({
    type: DataType.STRING,
    allowNull:false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'hashpassword',
    description: 'client password',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998200032406',
    description: 'client phone number',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;


  @HasMany(() => Order)
  orders:Order[]

  @HasMany(() => CarFinancing)
  car_financing: CarFinancing[]
}
