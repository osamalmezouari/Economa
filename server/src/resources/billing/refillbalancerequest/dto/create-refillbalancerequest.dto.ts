export class CreateRefillbalancerequestDto {
    paymentType: 'cash' | 'bank-transfer';
    file: Express.Multer.File | null;
    amount: number;
}
