CREATE TABLE t_p46778180_juris_site_preparati.contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);