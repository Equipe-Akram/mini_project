CREATE TABLE IF NOT EXISTS refresh_token (
    id SERIAL PRIMARY KEY,
    professor_id INT REFERENCES professor(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);