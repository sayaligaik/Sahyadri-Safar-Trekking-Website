// Fetch trekking destinations from the API
fetch('/api/destinations')
    .then(response => response.json())
    .then(data => {
        const destinationsDiv = document.getElementById('destinations');
        data.forEach(destination => {
            const destinationItem = document.createElement('div');
            destinationItem.innerHTML = `<h3>${destination.name}</h3><p>${destination.description}</p>`;
            destinationsDiv.appendChild(destinationItem);
        });
    });

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            alert('Error sending message.');
        }
    });
});
