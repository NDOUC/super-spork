import { v4 as uuidv4 } from 'uuid';
import pool from './db.js';
import { initializePayment, verifyPayment } from './paystack.js';

export async function initRecharge(req, res) {
  const { email, amount_cents, voucher_code } = req.body;
  const reference = uuidv4();
  const payInit = await initializePayment(email, amount_cents, reference);
  await pool.query('INSERT INTO voucher_transactions(id, type, amount_cents, reference, metadata) VALUES($1,$2,$3,$4,$5)', [uuidv4(), 'credit', amount_cents, reference, JSON.stringify({ voucher_code })]);
  res.json({ authorization_url: payInit.authorization_url, reference });
}

export async function paystackWebhook(req, res) {
  const event = req.body;
  if (event.event === 'charge.success') {
    const ref = event.data.reference;
    const verified = await verifyPayment(ref);
    if (verified.status === 'success') {
      const meta = JSON.parse(verified.metadata || '{}');
      const { voucher_code } = meta;
      await pool.query('UPDATE vouchers SET balance_cents = balance_cents + $1 WHERE code=$2', [verified.amount, voucher_code]);
    }
  }
  res.sendStatus(200);
}
