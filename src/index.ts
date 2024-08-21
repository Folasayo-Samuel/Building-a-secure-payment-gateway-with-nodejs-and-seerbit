import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/create-payment-link', async (req, res) => {
    const paymentLinkData = {
        publicKey: process.env.publicKey, 
        amount: "5000",
        currency: "NGN",
        country: "NG",
        paymentReference: "payment",
        email: "test@examples.com",
        fullName: "Halil TSS",
        tokenize: "false",
        callbackUrl: "https://seerbit.com"
    };
    
    try {
        const response = await axios.post('https://seerbitapi.com/api/v2/payments', paymentLinkData, {
            headers: {
                'Authorization': `Bearer ${process.env.bearerToken}`, 
                'Content-Type': 'application/json'
            }
        });
        
        res.json(response.data);
    } catch (error: any) {
        console.log("Errrroor!!!!!!!")
        console.log(error.response?.data)
        res.status(500).json({ message: 'Payment link creation failed', error: error.response?.data });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
