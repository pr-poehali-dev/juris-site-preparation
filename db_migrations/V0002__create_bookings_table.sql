CREATE TABLE t_p46778180_juris_site_preparati.bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    consultation_date DATE NOT NULL,
    consultation_time VARCHAR(10) NOT NULL,
    message TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE(consultation_date, consultation_time)
);