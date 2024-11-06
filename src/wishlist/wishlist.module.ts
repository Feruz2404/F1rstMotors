import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';

@Module({
  imports: [SequelizeModule.forFeature([Wishlist])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
