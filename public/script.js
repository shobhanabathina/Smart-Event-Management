
const API = '/api/events';

// Display events
async function loadEvents() {
    const response = await fetch(API);
    const events = await response.json();

    const table = document.getElementById('eventTable');
    table.innerHTML = '';

    events.forEach(event => {
        table.innerHTML += `
            <tr>
                <td>${event.id}</td>
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>${event.venue}</td>
                <td>
                    <button onclick="deleteEvent(${event.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Add event
async function addEvent() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const venue = document.getElementById('venue').value;

    if (!name || !date || !venue) {
        alert('Please fill all fields');
        return;
    }

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, venue })
    });

    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('venue').value = '';

    loadEvents();
}

// Delete event
async function deleteEvent(id) {
    await fetch(`${API}/${id}`, {
        method: 'DELETE'
    });

    loadEvents();
}

loadEvents();
