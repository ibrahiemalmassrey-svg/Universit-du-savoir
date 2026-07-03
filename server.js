const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// الدورات التجريبية
const courses = [
  {
    id: '1',
    title: 'Introduction à la Programmation',
    description: 'Apprenez les bases de la programmation avec Python',
    instructor: 'Dr. Ahmed Benali',
    category: 'Informatique',
    level: 'Débutant',
    duration: '12 semaines',
    students: 156,
    rating: 4.7
  },
  {
    id: '2',
    title: 'Développement Web Full-Stack',
    description: 'Maîtrisez React, Node.js et les bases de données',
    instructor: 'Mme. Fatima Zahra',
    category: 'Informatique',
    level: 'Intermédiaire',
    duration: '16 semaines',
    students: 89,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Intelligence Artificielle',
    description: 'Introduction au Machine Learning',
    instructor: 'Dr. Karim El Amrani',
    category: 'Data Science',
    level: 'Avancé',
    duration: '20 semaines',
    students: 234,
    rating: 4.8
  }
];

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue à Universite du savoir API',
    version: '1.0.0',
    status: 'En ligne',
    courses: courses.length
  });
});

// فحص الصحة
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// جميع الدورات
app.get('/api/courses', (req, res) => {
  res.json({ count: courses.length, courses });
});

// دورة واحدة
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Cours non trouvé' });
  res.json(course);
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(`Serveur Universite du savoir demarre sur port ${PORT}`);
});

module.exports = app;
