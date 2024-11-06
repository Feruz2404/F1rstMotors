import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)
        private readonly cartModel: typeof Cart,
    ) {}

    async create(createCartDto: CreateCartDto): Promise<Cart> {
        return this.cartModel.create({ ...createCartDto, added_date: new Date() });
    }

    async findAll(): Promise<Cart[]> {
        return this.cartModel.findAll();
    }

    async findOne(id: number): Promise<Cart> {
        const cartItem = await this.cartModel.findByPk(id);
        if (!cartItem) {
            throw new NotFoundException(`Cart item with ID ${id} not found`);
        }
        return cartItem;
    }

  	async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
      	const [numberOfAffectedRows, [updatedItem]] = await this.cartModel.update(updateCartDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Cart item with ID ${id} not found`);
      	}

      	return updatedItem;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.cartModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Cart item with ID ${id} not found`);
      	}
  	}
}