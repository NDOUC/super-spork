import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createVoucher, getVoucher } from './voucherController.js';
import { initRecharge, paystackWebhook } from './paymentController.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post('/api/vouchers', createVoucher);
app.get('/api/vouchers/:code', getVoucher);
app.post('/api/payments/init', initRecharge);
app.post('/api/payments/webhook', paystackWebhook);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Voucher API running on port ${port}`));
