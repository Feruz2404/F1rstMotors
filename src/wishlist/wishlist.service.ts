import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
    constructor(
        @InjectModel(Wishlist)
        private readonly wishlistModel: typeof Wishlist,
    ) {}

    async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
        return this.wishlistModel.create({ ...createWishlistDto, added_date: new Date() });
    }

    async findAll(): Promise<Wishlist[]> {
        return this.wishlistModel.findAll();
    }

    async findOne(id: number): Promise<Wishlist> {
        const wishlistItem = await this.wishlistModel.findByPk(id);
        if (!wishlistItem) {
            throw new NotFoundException(`Wishlist item with ID ${id} not found`);
        }
        return wishlistItem;
    }

  	async update(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
      	const [numberOfAffectedRows, [updatedItem]] = await this.wishlistModel.update(updateWishlistDto, {
          	where: { id },
          	returning: true,
      	});

      	if (numberOfAffectedRows === 0) {
          	throw new NotFoundException(`Wishlist item with ID ${id} not found`);
      	}

      	return updatedItem;
  	}

  	async remove(id: number): Promise<void> {
      	const deletedCount = await this.wishlistModel.destroy({ where: { id } });
      	if (deletedCount === 0) {
          	throw new NotFoundException(`Wishlist item with ID ${id} not found`);
      	}
  	}
}