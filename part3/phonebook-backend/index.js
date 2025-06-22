require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/Person');

const app = express();

app.use(express.json());
app.use(cors());

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  if (['POST', 'DELETE'].includes(req.method)) {
    console.log('Body:  ', req.body);
  }
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(p => ({
      name: p.name,
      number: p.number,
      id: p._id.toString()
    })));
  });
});

app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date();
      res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })
    .catch(error => {
      console.error('Error counting documents:', error.message);
      res.status(500).end();
    });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'malformatted id' });
  }

  console.log('Deleting ID:', id);
  Person.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'person not found' });
      }
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => {
      res.json(savedPerson);
    })
    .catch(error => next(error));
});

// unknown endpoint handler
app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
});

// centralized error handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 