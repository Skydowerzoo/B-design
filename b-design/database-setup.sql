-- Création de la table pour les projets de design automobile
CREATE TABLE IF NOT EXISTS car_design_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des projets avec tous les champs nécessaires
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  year VARCHAR(20) NOT NULL,
  image_url VARCHAR(255),
  client VARCHAR(255),
  role VARCHAR(255),
  detailed_description TEXT,
  process TEXT[],
  gallery TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Création d'une fonction pour mettre à jour automatiquement le champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création d'un trigger pour appliquer la fonction
DROP TRIGGER IF EXISTS update_car_design_projects_updated_at ON car_design_projects;
CREATE TRIGGER update_car_design_projects_updated_at
BEFORE UPDATE ON car_design_projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Appliquer le même trigger pour mettre à jour le champ updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Création de la table utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user'
);

-- Créer un utilisateur admin par défaut
-- Le mot de passe est "admin123" (hashé avec bcrypt)
INSERT INTO users (username, email, password, role)
VALUES 
  ('admin', 'admin@example.com', '$2a$10$rIU.JeZzJHRO3eKYzVKbt.9SbKLuYPdmr5C4mG1XTFc8hkJsbgH/e', 'admin')
ON CONFLICT (email) DO NOTHING;