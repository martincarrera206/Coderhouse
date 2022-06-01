const userForm = document.getElementById('userForm')

userForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const lastname = document.getElementById('lastname').value
    const age = document.getElementById('age').value

    const user = {
        name: name,
        lastname: lastname,
        age: age
    }

    fetch('http://localhost:8080/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( user )
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})