ALTER TABLE t_p46778180_juris_site_preparati.bookings
    ADD COLUMN manage_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'confirmed';