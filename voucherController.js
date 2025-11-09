import { v4 as uuidv4 } from 'uuid';
import pool from './db.js';

export async function createVoucher(req, res) {
  const { email, amount_cents } = req.body;
  const code = 'VCHR-' + uuidv4().slice(0, 8).toUpperCase();
  const id = uuidv4();

  await pool.query('INSERT INTO vouchers(id, code, owner_email, balance_cents) VALUES($1,$2,$3,$4)', [id, code, email, amount_cents]);
  res.json({ code, message: 'Voucher created successfully' });
}

export async function getVoucher(req, res) {
  const { code } = req.params;
  const { rows } = await pool.query('SELECT * FROM vouchers WHERE code=$1', [code]);
  if (rows.length === 0) return res.status(404).json({ error: 'Voucher not found' });
  res.json(rows[0]);
}
