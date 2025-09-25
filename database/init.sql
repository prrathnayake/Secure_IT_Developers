-- Secure IT Developers initial database schema.
-- Run this script against a PostgreSQL database before deploying the customer portal.

BEGIN;

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'AUD',
    category VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (cart_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    total NUMERIC(12, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'AUD',
    reference VARCHAR(32) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price_each NUMERIC(12, 2) NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'AUD'
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_carts_customer ON carts(customer_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_orders_cart ON orders(cart_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

INSERT INTO products (slug, name, description, price, category)
VALUES
    ('security-audit', 'Security & compliance audit', 'Deep-dive review mapped to OWASP and ISO controls.', 3600.00, 'Security'),
    ('seo-technical', 'Technical SEO & content sprint', 'Optimise Core Web Vitals, schema, and editorial workflows.', 2950.00, 'Growth'),
    ('performance-hardening', 'Performance hardening', 'Stress-test and tune critical journeys with profiling and caching.', 2400.00, 'Engineering'),
    ('api-integration', 'API & integration build', 'Design and ship robust REST or GraphQL endpoints.', 4200.00, 'Engineering'),
    ('mobile-polish', 'Mobile polish sprint', 'Stabilise Flutter or React Native apps with performance tuning.', 3300.00, 'Mobile'),
    ('ux-accessibility', 'Accessibility & UX review', 'Audit flows against WCAG 2.2 AA with actionable remediation.', 1750.00, 'Experience')
ON CONFLICT (slug) DO NOTHING;

COMMIT;
