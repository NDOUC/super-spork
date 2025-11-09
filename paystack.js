import axios from 'axios';
const PAYSTACK_BASE = 'https://api.paystack.co';

export async function initializePayment(email, amount, reference) {
  const res = await axios.post(`${PAYSTACK_BASE}/transaction/initialize`, {
    email, amount, reference
  }, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  });
  return res.data.data;
}

export async function verifyPayment(reference) {
  const res = await axios.get(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
  });
  return res.data.data;
}
