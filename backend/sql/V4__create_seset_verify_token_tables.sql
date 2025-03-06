CREATE TABLE reset_password_token (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255) NOT NULL,
    reset_token_expiry TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE verification_token (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);