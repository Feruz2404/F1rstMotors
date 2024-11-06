import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';
import { ClientGuard } from '../guards/client.guard';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(ClientGuard)
  @Post()
  @ApiOperation({ summary: 'Add a car to the cart' })
  @ApiResponse({ status: 201, description: 'Car added to the cart successfully.', type: Cart })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @UseGuards(ClientGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all items in the cart' })
  @ApiResponse({ status: 200, description: 'List of all items in the cart.', type: [Cart] })
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(ClientGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific item in the cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart item found.', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @UseGuards(ClientGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing cart item' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  
  @UseGuards(ClientGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from the cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart item removed successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
