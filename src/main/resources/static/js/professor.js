document.addEventListener('DOMContentLoaded', () => {
    const viewProfessorsBtn = document.getElementById('view-professors-btn');
    const professorsTable = document.getElementById('professors-table').getElementsByTagName('tbody')[0];
    const addProfessorBtn = document.getElementById('add-professor-btn');
    const professorModal = document.getElementById('professor-modal');
    const closeProfessorModalBtn = document.querySelector('#professor-modal .close-btn');
    const professorForm = document.getElementById('professor-form');
    const professorsContent = document.getElementById('professors-content');

    function loadProfessors() {
        fetch('/api/professors')
            .then(response => response.json())
            .then(data => {
                professorsTable.innerHTML = '';
                data.forEach(professor => {
                    const row = professorsTable.insertRow();
                    row.innerHTML = `
                        <td>${professor.id}</td>
                        <td>${professor.name}</td>
                        <td>${professor.email}</td>
                        <td><button class="delete-btn" data-id="${professor.id}">Delete</button></td>
                    `;
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        deleteProfessor(button.getAttribute('data-id'));
                    });
                });
            })
            .catch(() => alert('Failed to load professors.'));
    }

    viewProfessorsBtn.addEventListener('click', () => {
        professorsContent.style.display = professorsContent.style.display === 'none' ? 'block' : 'none';
        if (professorsContent.style.display === 'block') loadProfessors();
    });

    function deleteProfessor(id) {
        if (confirm('Are you sure you want to delete this professor?')) {
            fetch(`/api/professors/${id}`, { method: 'DELETE' })
                .then(() => loadProfessors())
                .catch(() => alert('Failed to delete professor.'));
        }
    }

    addProfessorBtn.addEventListener('click', () => {
        professorModal.style.display = 'flex';
    });

    closeProfessorModalBtn.addEventListener('click', () => {
        professorModal.style.display = 'none';
    });

    professorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('professorName').value.trim();
        const email = document.getElementById('professorEmail').value.trim();

        if (!name || !email) {
            alert("All fields are required!");
            return;
        }

        fetch('/api/professors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
            .then(() => {
                professorModal.style.display = 'none';
                professorForm.reset();
                loadProfessors();
            })
            .catch(() => alert('Failed to add professor.'));
    });
});
