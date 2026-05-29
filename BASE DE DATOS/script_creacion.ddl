-- ==============================================================================
-- PROYECTO: PLATAFORMA WEB - INGENIERÍA DE SOFTWARE
-- MOTOR DE BASE DE DATOS: PostgreSQL
-- DESCRIPCIÓN: Script de creación de esquemas, tablas y relaciones (DDL)
-- ==============================================================================

-- ==========================================
-- 1. MÓDULO DE SEGURIDAD (CMS)
-- ==========================================

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- ==========================================
-- 2. MÓDULO ACADÉMICO
-- ==========================================

CREATE TABLE study_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    year_active INT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_plan_id UUID NOT NULL,
    number INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT fk_semesters_study_plan FOREIGN KEY (study_plan_id) REFERENCES study_plans(id) ON DELETE CASCADE
);

CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    semester_id UUID NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    credits INT NOT NULL,
    description TEXT,
    bibliography TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_subjects_semester FOREIGN KEY (semester_id) REFERENCES semesters(id) ON DELETE CASCADE
);

CREATE TABLE subject_prerequisites (
    subject_id UUID NOT NULL,
    prerequisite_id UUID NOT NULL,
    PRIMARY KEY (subject_id, prerequisite_id),
    CONSTRAINT fk_prereq_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    CONSTRAINT fk_prereq_required FOREIGN KEY (prerequisite_id) REFERENCES subjects(id) ON DELETE CASCADE,
    CONSTRAINT chk_different_subjects CHECK (subject_id <> prerequisite_id) -- Evita que una materia sea prerrequisito de sí misma
);

-- ==========================================
-- 3. MÓDULO DE COMUNIDAD
-- ==========================================

CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    specialty VARCHAR(200) NOT NULL,
    bio TEXT,
    linkedin_url VARCHAR(255),
    photo_url VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teacher_subjects (
    teacher_id UUID NOT NULL,
    subject_id UUID NOT NULL,
    PRIMARY KEY (teacher_id, subject_id),
    CONSTRAINT fk_ts_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    CONSTRAINT fk_ts_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE alumni (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    graduation_year INT NOT NULL,
    current_company VARCHAR(150),
    current_position VARCHAR(150),
    linkedin_url VARCHAR(255),
    photo_url VARCHAR(255),
    is_visible BOOLEAN NOT NULL DEFAULT TRUE
);

-- ==========================================
-- 4. MÓDULO DE CONTENIDO (EVENTOS Y NOTICIAS)
-- ==========================================

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL,
    category_id UUID NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('NEWS', 'EVENT')),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    cover_image_url VARCHAR(255),
    event_start_date TIMESTAMP WITH TIME ZONE,
    event_end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(200),
    external_registration_url VARCHAR(255),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_posts_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    -- Restricción para asegurar que si es EVENTO, tenga fechas, y si es NOTICIA, no.
    CONSTRAINT chk_event_dates CHECK (
        (type = 'NEWS') OR 
        (type = 'EVENT' AND event_start_date IS NOT NULL AND event_end_date IS NOT NULL)
    )
);

-- ==========================================
-- 5. MÓDULO MULTIMEDIA E INSTITUCIONAL
-- ==========================================

CREATE TABLE banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    target_url VARCHAR(255),
    position_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_start TIMESTAMP WITH TIME ZONE,
    display_end TIMESTAMP WITH TIME ZONE
);

CREATE TABLE gallery_albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    cover_image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(200),
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_gallery_album FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE CASCADE
);

-- ==========================================
-- 6. ÍNDICES DE RENDIMIENTO (OPCIONAL PERO RECOMENDADO)
-- ==========================================
-- Estos índices mejoran la velocidad de las consultas más comunes en el frontend
CREATE INDEX idx_subjects_code ON subjects(code);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX idx_semesters_study_plan ON semesters(study_plan_id);