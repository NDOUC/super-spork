CREATE TABLE IF NOT EXISTS voucher_transactions (
  id UUID PRIMARY KEY,
  voucher_id UUID REFERENCES vouchers(id),
  type VARCHAR(10),
  amount_cents INTEGER,
  reference VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
