import { PaymentMethods } from '../types/donation.types';
import { Status } from '../types/donation.types';
export declare class CreateDonationDto {
    userId: string;
    amount: number;
    paymentMethod: PaymentMethods;
    status: Status;
}
