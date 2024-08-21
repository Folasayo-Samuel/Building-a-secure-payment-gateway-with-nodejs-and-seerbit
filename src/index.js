"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/create-payment-link', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { publicKey, bearerToken } = req.body;
    const paymentLinkData = {
        // status: "ACTIVE",
        // paymentLinkName: "Test Payment Link",
        // description: "This is a test payment link",
        // currency: "NGN",
        // country: "NG",
        // successMessage: "Thank you for your payment!",
        publicKey: publicKey || "SBTESTPUBK_RQ1FN3iuPMBtKs8gocxp5DzIZNHdDv8x", // Replace with your actual public key
        amount: "5000",
        currency: "NGN",
        country: "NG",
        paymentReference: "payment",
        email: "test@examples.com",
        fullName: "Halil TSS",
        tokenize: "false",
        callbackUrl: "https://seerbit.com/api/"
        // paymentFrequency: "ONE-TIME",
        // linkExpirable: "false",
        // amount: "5000",
        // customerName: "John Doe",
        // mobileNumber: "08012345678",
        // email: "johndoe@example.com"
    };
    try {
        const response = yield axios_1.default.post('https://seerbitapi.com/api/v2/payments', paymentLinkData, {
            headers: {
                'Authorization': `Bearer ${bearerToken || "gOhJCgkvSA5eKn/SaNYysq4s8T8njS7C5/fludXUpAx0yZw0J5xo9c9BR9ytcxhKab7YsJoQpCDDAJ7uHcml2V/aG5ahtW0AWvvA8S6mI8q61nAtYWZbgkFpzPOBJiZ6"}`, // Replace with your actual bearer token
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.log("Errrroor!!!!!!!");
        console.log((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
        res.status(500).json({ message: 'Payment link creation failed', error: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
