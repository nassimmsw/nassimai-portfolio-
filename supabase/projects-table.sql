-- Create projects table for portfolio
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tags TEXT[] DEFAULT '{}',
  color TEXT NOT NULL DEFAULT 'from-blue-500 via-indigo-500 to-violet-500',
  icon TEXT NOT NULL DEFAULT 'Layers',
  github TEXT DEFAULT '#',
  demo TEXT DEFAULT '#',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to projects" 
ON projects FOR SELECT 
USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage projects" 
ON projects FOR ALL 
USING (auth.role() = 'authenticated');

-- Insert existing projects
INSERT INTO projects (title, description, long_description, tags, color, icon, github, demo) VALUES
('RSN Dev Portfolio', 'Professional portfolio for RSN Dev development agency.', 'Collaborated with RSN Dev, a professional development agency, to create their portfolio website. This showcases my ability to work with professional teams and deliver real-world projects.', ARRAY['Professional', 'Web Dev', 'Collaboration'], 'from-blue-500 via-indigo-500 to-violet-500', 'Layers', '#', 'https://rsndev.netlify.app'),
('Number Guessing Game', 'A simple Python game where the computer picks a random number.', 'My first real Python project! Built a command-line game where players try to guess a random number. Added features like difficulty levels, hint system, and score tracking. Great for learning loops and conditionals.', ARRAY['Python', 'Beginner', 'CLI', 'Games'], 'from-emerald-400 via-teal-500 to-cyan-500', 'Terminal', '#', '#'),
('Simple Calculator', 'A basic calculator with a graphical interface using Tkinter.', 'Built a calculator app with buttons for basic operations. Learned about GUI programming with Tkinter, event handling, and how to structure a simple application. Can perform addition, subtraction, multiplication, and division.', ARRAY['Python', 'Tkinter', 'GUI', 'Math'], 'from-orange-400 via-amber-500 to-yellow-500', 'Code2', '#', '#'),
('Personal Portfolio', 'This website! Built to showcase my learning journey.', 'Designed and built this portfolio website to practice web development and showcase my projects. Learning about React, CSS, and how to create modern web interfaces. A work in progress as I continue to learn!', ARRAY['React', 'CSS', 'HTML', 'Web Dev'], 'from-pink-400 via-rose-500 to-red-500', 'Sparkles', '#', '#'),
('Weather App', 'Learning to fetch data from APIs and display weather info.', 'Currently working on a weather application that fetches real-time data from a weather API. This project is helping me understand how to work with APIs, handle JSON data, and display information dynamically.', ARRAY['Python', 'APIs', 'Learning', 'In Progress'], 'from-sky-400 via-blue-500 to-indigo-500', 'ExternalLink', '#', '#');
