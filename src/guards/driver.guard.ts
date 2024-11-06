import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrderService } from '../orders/orders.service';
import { EmployeeService } from '../employees/employees.service';

@Injectable()
export class DriverGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly ordersService: OrderService,
        private readonly employeesService: EmployeeService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user, params } = request;
        const orderId = params.id;

        const employee = await this.employeesService.findOne(user.id);
        if (!employee || employee.position !== 'Driver') {
            throw new ForbiddenException('Only drivers can update order status.');
        }

        const order = await this.ordersService.findOne(orderId);
        if (!order) {
            throw new ForbiddenException('Order not found.');
        }

        if (order.client_id !== user.id) {
            throw new ForbiddenException('This order does not belong to the client.');
        }

        return true;
    }
}
