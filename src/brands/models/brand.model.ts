import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../car/models/car.model';

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand> {
  @ApiProperty({ description: 'Brand nomi', example: 'Tesla' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ description: 'Brand haqida maʼlumot', example: 'Electric car manufacturer', required: false })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  information: string;

  @ApiProperty({ description: 'Brand veb-sayti', example: 'https://www.tesla.com', required: false })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  web_site: string;

  @ApiProperty({ description: 'Brand faolmi yoki yo\'q', example: true })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @HasMany(() => Car)
  cars: Car[];
}
