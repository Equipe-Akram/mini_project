CREATE TABLE professor (
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(20) NOT NULL, 
    prenom VARCHAR(20) NOT NULL, 
    email VARCHAR(40) UNIQUE NOT NULL, 
    password TEXT NOT null
);

CREATE TABLE professor_student (
    professor_id INT NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY (professor_id, student_id),
    FOREIGN KEY (professor_id) REFERENCES professors(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);