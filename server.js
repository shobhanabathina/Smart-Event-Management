
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let events = [];
let id = 1;

// Add event
app.post('/api/events', (req, res) => {
    const { name, date, venue } = req.body;

    const event = { id: id++, name, date, venue };
    events.push(event);

    res.status(201).json(event);
});

// Display events
app.get('/api/events', (req, res) => {
    res.json(events);
});

// Update event
app.put('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id == req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    Object.assign(event, req.body);
    res.json(event);
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
    events = events.filter(e => e.id != req.params.id);
    res.json({ message: 'Event deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
