import { Address } from './address';
import { CartItem } from './cart-item';
import { Order } from './order';
import { OrderItem } from './order-item';

export class Purchase {
    customer: CartItem;
    shippingAddress: Address;
    billingAddress: Address;
    order: Order;
    orderItems: OrderItem[];
}
