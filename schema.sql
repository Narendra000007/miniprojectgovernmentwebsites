-- Centralized Government Opportunity Monitoring, Aggregation & Notification Platform
-- SIT Tumakuru - CSE Mini Project 2026-27 (ODD)
-- Database: PostgreSQL Schema DDL

DROP TABLE IF EXISTS application_tracking CASCADE;
DROP TABLE IF EXISTS bookmarks CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Profiles table
CREATE TABLE user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    highest_qualification VARCHAR(100) NOT NULL,
    discipline VARCHAR(150) NOT NULL,
    graduation_year INT,
    percentage_or_cgpa NUMERIC(5,2),
    age INT,
    category VARCHAR(50) DEFAULT 'General',
    state_of_residence VARCHAR(100) DEFAULT 'Karnataka',
    preferred_location VARCHAR(100) DEFAULT 'All India',
    preferred_categories VARCHAR(255),
    skills_and_interests TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Opportunities table (Central normalized schema covering 5 categories)
CREATE TABLE opportunities (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    category VARCHAR(50) NOT NULL, -- RECRUITMENT, SCHOLARSHIP, FELLOWSHIP, INTERNSHIP, COMPETITIVE_EXAM
    organization VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    eligibility_criteria TEXT NOT NULL,
    required_qualification VARCHAR(150) NOT NULL,
    allowed_disciplines VARCHAR(255) DEFAULT 'Any Discipline',
    min_percentage NUMERIC(5,2) DEFAULT 0.0,
    max_age INT,
    location VARCHAR(150) NOT NULL DEFAULT 'All India',
    application_start_date DATE,
    application_deadline DATE NOT NULL,
    official_application_url VARCHAR(500) NOT NULL,
    source_url VARCHAR(500) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, CLOSING_SOON, CLOSED
    is_verified BOOLEAN DEFAULT TRUE,
    is_sample_data BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_opportunities_category ON opportunities(category);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_deadline ON opportunities(application_deadline);
CREATE INDEX idx_opportunities_location ON opportunities(location);

-- 4. Bookmarks table
CREATE TABLE bookmarks (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id BIGINT NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_opportunity_bookmark UNIQUE (user_id, opportunity_id)
);

-- 5. Application Tracking table
CREATE TABLE application_tracking (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id BIGINT NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'INTERESTED', -- INTERESTED, PLANNING_TO_APPLY, APPLIED, NOT_APPLYING
    notes TEXT,
    applied_date DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_opportunity_tracking UNIQUE (user_id, opportunity_id)
);
