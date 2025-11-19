export type CreateDonation = {
    userId: string;
    amount: number;
    paymentMethod: PaymentMethods;
    status: Status;
};
export type UpdateDonation = {
    userId?: string;
    amount?: number;
    paymentMethod?: PaymentMethods;
    status?: Status;
};
export declare enum PaymentMethods {
    CARTAO_DE_CREDITO = "Cart\u00E3o de Cr\u00E9dito",
    CARTAO_DE_DEBITO = "Cart\u00E3o de D\u00E9bito",
    PIX = "PIX"
}
export declare enum Status {
    APROVADO = "Aprovado",
    NEGADO = "Negado",
    EM_PROCESSAMENTO = "Em Processamento"
}
