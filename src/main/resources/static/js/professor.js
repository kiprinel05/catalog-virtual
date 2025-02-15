document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing scripts...');

    const professorsTable = document.getElementById('professors-table').getElementsByTagName('tbody')[0];
    const addProfessorBtn = document.getElementById('add-professor-btn');
    const viewProfessorsBtn = document.getElementById('view-professors-btn');
    const professorsContent = document.getElementById('professors-content');
    const professorModal = document.getElementById('professor-modal');
    const closeProfessorModalBtn = document.querySelector('#professor-modal .close-btn');
    const professorForm = document.getElementById('professor-form');

    let deleteProfessorId = null;

    // Create confirmation modal
    const confirmModal = document.createElement('div');
    confirmModal.classList.add('modal');
    confirmModal.style.display = 'none';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <h2 id="confirm-text">Are you sure you want to delete this professor?</h2>
            <button id="confirm-delete" class="modern-button">Confirm</button>
            <button id="cancel-delete" class="modern-button">Cancel</button>
        </div>`;
    document.body.appendChild(confirmModal);

    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    function loadProfessors() {
        console.log('Loading professors...');
        fetch('/api/professors')
            .then(response => response.json())
            .then(data => {
                console.log('Professors loaded:', data);
                professorsTable.innerHTML = '';
                data.forEach(professor => {
                    const row = professorsTable.insertRow();
                    row.innerHTML = `
                        <td>${professor.id}</td>
                        <td>${professor.name}</td>
                        <td>${professor.email}</td>
                        <td><button class="delete-btn" data-id="${professor.id}" data-name="${professor.name}">Delete</button></td>
                    `;
                });
                professorsContent.style.display = 'block';

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        deleteProfessorId = event.target.getAttribute('data-id');
                        const name = event.target.getAttribute('data-name') || 'Unknown Professor';
                        console.log(`Delete button clicked for Professor ID: ${deleteProfessorId}, Name: ${name}`);
                        showConfirmModal(name);
                    });
                });
            })
            .catch(error => console.error('Error loading professors:', error));
    }

    function showConfirmModal(name) {
        console.log(`Showing confirm modal for Professor: ${name}`);
        document.getElementById('confirm-text').innerText = `Are you sure you want to delete Professor "${name}"?`;
        confirmModal.style.display = 'flex';
    }

    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'confirm-delete' && deleteProfessorId) {
            console.log(`Confirm delete clicked for Professor ID: ${deleteProfessorId}`);
            deleteProfessor(deleteProfessorId);
            deleteProfessorId = null;
            confirmModal.style.display = 'none';
        }
        if (event.target.id === 'cancel-delete') {
            console.log('Cancel delete clicked');
            confirmModal.style.display = 'none';
        }
    });

    function deleteProfessor(id) {
        console.log(`Attempting to delete Professor ID: ${id}`);
        fetch(`/api/professors/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete');
                console.log(`Professor ID: ${id} deleted successfully`);
                return Promise.resolve();
            })
            .then(() => {
                setTimeout(loadProfessors, 300);
            })
            .catch(error => console.error('Error deleting professor:', error));
    }

    addProfessorBtn.addEventListener('click', () => {
        console.log('Add professor button clicked');
        professorModal.style.display = 'flex';
    });

    closeProfessorModalBtn.addEventListener('click', () => {
        console.log('Close professor modal button clicked');
        professorModal.style.display = 'none';
    });

    professorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const professorName = document.getElementById('professorName').value.trim();
        const professorEmail = document.getElementById('professorEmail').value.trim();

        if (!professorName || !professorEmail) {
            alert("Please fill in all fields correctly!");
            return;
        }

        const professorData = { name: professorName, email: professorEmail };

        console.log('Adding professor:', professorData);

        fetch('/api/professors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(professorData)
        })
            .then(() => {
                console.log('Professor added successfully');
                professorModal.style.display = 'none';
                professorForm.reset();
                setTimeout(loadProfessors, 300);
            })
            .catch(error => console.error('Error adding professor:', error));
    });

    viewProfessorsBtn.addEventListener('click', () => {
        console.log('View professors button clicked');
        professorsContent.style.display = professorsContent.style.display === 'none' ? 'block' : 'none';
        if (professorsContent.style.display === 'block') {
            loadProfessors();
        }
    });
});
