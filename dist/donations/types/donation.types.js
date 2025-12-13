"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.PaymentMethods = void 0;
var PaymentMethods;
(function (PaymentMethods) {
    PaymentMethods["CARTAO_DE_CREDITO"] = "Cart\u00E3o de Cr\u00E9dito";
    PaymentMethods["CARTAO_DE_DEBITO"] = "Cart\u00E3o de D\u00E9bito";
    PaymentMethods["PIX"] = "PIX";
})(PaymentMethods || (exports.PaymentMethods = PaymentMethods = {}));
var Status;
(function (Status) {
    Status["APROVADO"] = "Aprovado";
    Status["NEGADO"] = "Negado";
    Status["EM_PROCESSAMENTO"] = "Em Processamento";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=donation.types.js.map