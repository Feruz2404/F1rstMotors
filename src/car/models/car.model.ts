import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Brand } from '../../brands/models/brand.model';
import { ApiProperty } from '@nestjs/swagger';
import { Wishlist } from '../../wishlist/models/wishlist.model';
import { Service } from '../../services/models/service.model';
import { Order } from '../../orders/models/order.model';
import { Cart } from '../../cart/models/cart.model';
import { CarFinancing } from '../../car_financing/models/car_financing.entity';
import { CarInventory } from '../../car_invertory/models/car_invertory.model';

@Table({ tableName: 'cars' })
export class Car extends Model<Car> {
    @ApiProperty({
        description: 'Brand ID associated with the car',
        example: 1,
    })
    @ForeignKey(() => Brand)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    brand_id: number;
    @BelongsTo(() => Brand)
    brand: Brand;

    @ApiProperty({
        description: 'Car model name',
        example: 'Sedan LX',
    })
    @Column({
        type: DataType.STRING,
    })
    model: string;

    @ApiProperty({
        description: 'Variant of the car',
        example: 'Sport',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    variant: string;

    @ApiProperty({
        description: 'Color of the car',
        example: 'Red',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    color: string;

    @ApiProperty({
        description: 'Manufacturing year',
        example: 2022,
    })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    year: number;

    @ApiProperty({
        description: 'Mileage of the car in kilometers',
        example: 25000,
    })
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    milage: number;

    @ApiProperty({
        description: 'Price of the car in USD',
        example: 30000,
    })
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    price: number;

    @ApiProperty({
        description: 'Availability of the car',
        example: true,
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    is_available: boolean;

    @ApiProperty({
        description: 'Engine type of the car',
        example: 'V6',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    engine_type: string;

    @ApiProperty({
        description: 'URL of the car image',
        example: 'https://example.com/car-image.jpg',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image_url: string;

    @ApiProperty({
        description: 'Transmission type',
        example: 'Automatic',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    transmission: string;

    @ApiProperty({
        description: 'Fuel efficiency in miles per gallon',
        example: 25.5,
    })
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    fuel_efficiency: number;

    @ApiProperty({
        description: 'Description of the car',
        example: 'A reliable family sedan with great fuel efficiency.',
    })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @ApiProperty({
        description: 'Indicates if the car is on promotion',
        example: true,
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    promotion: boolean;

    @HasMany(() => Wishlist)
    wishlists: Wishlist[];

    @HasMany(() => Service)
    services: Service[];

    @HasMany(() => Order)
    orders: Order[];

    @HasMany(() => Cart)
    carts: Cart[];

    @HasMany(() => CarInventory)
    car_invertory: CarInventory[];

    @HasMany(() => CarFinancing)
    car_financing: CarFinancing[];
}
