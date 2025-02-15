document.addEventListener('DOMContentLoaded', () => {
    const viewProfessorsBtn = document.getElementById('view-professors-btn');
    const professorsTable = document.getElementById('professors-table')?.getElementsByTagName('tbody')[0];
    const addProfessorBtn = document.getElementById('add-professor-btn');
    const professorModal = document.getElementById('professor-modal');
    const closeProfessorModalBtn = professorModal?.querySelector('.close-btn');
    const professorForm = document.getElementById('professor-form');
    const professorsContent = document.getElementById('professors-content');

    // Creare și adăugare fereastră de confirmare în DOM
    const confirmModal = document.createElement('div');
    confirmModal.classList.add('modal');
    confirmModal.style.display = 'none'; // Inițial ascuns
    confirmModal.innerHTML = `
        <div class="modal-content">
            <h2 id="confirm-text">Ești sigur?</h2>
            <button id="confirm-delete" class="modern-button">Confirmă</button>
            <button id="cancel-delete" class="modern-button">Anulează</button>
        </div>`;
    document.body.appendChild(confirmModal);

    // Obținem referințele butoanelor după ce au fost adăugate în DOM
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmText = document.getElementById('confirm-text');

    let deleteProfessorId = null;

    function loadProfessors() {
        fetch('/api/professors')
            .then(response => response.json())
            .then(data => {
                if (!professorsTable) return;
                professorsTable.innerHTML = '';

                data.forEach(professor => {
                    const row = professorsTable.insertRow();
                    row.innerHTML = `
                        <td>${professor.id}</td>
                        <td>${professor.name}</td>
                        <td>${professor.email}</td>
                        <td><button class="delete-btn" data-id="${professor.id}" data-name="${professor.name}">Șterge</button></td>
                    `;
                });

                // Adăugare event listener pentru fiecare buton de ștergere
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = button.getAttribute('data-id');
                        const name = button.getAttribute('data-name');
                        showConfirmModal(id, name);
                    });
                });
            })
            .catch(error => console.error('Eroare la încărcarea profesorilor:', error));
    }

    function showConfirmModal(id, name) {
        deleteProfessorId = id; // Salvăm ID-ul profesorului de șters
        confirmText.innerText = `Ești sigur că vrei să-l ștergi pe profesorul ${name}?`;
        confirmModal.style.display = 'flex';
    }

    confirmDeleteBtn.addEventListener('click', () => {
        if (deleteProfessorId) {
            deleteProfessor(deleteProfessorId);
            deleteProfessorId = null;
        }
        confirmModal.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    });

    function deleteProfessor(id) {
        fetch(`/api/professors/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Eșec la ștergere');
                return response.json();
            })
            .then(() => {
                setTimeout(loadProfessors, 300);
            })
            .catch(error => console.error('Eroare la ștergere:', error));
    }

    viewProfessorsBtn?.addEventListener('click', () => {
        if (!professorsContent) return;
        professorsContent.style.display = professorsContent.style.display === 'none' ? 'block' : 'none';
        if (professorsContent.style.display === 'block') loadProfessors();
    });

    addProfessorBtn?.addEventListener('click', () => {
        professorModal.style.display = 'flex';
    });

    closeProfessorModalBtn?.addEventListener('click', () => {
        professorModal.style.display = 'none';
    });

    professorForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const fields = ['professorName', 'professorEmail'];
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input?.value.trim() === '') {
                input.style.border = '2px solid red';
                isValid = false;
            } else {
                input.style.border = '';
            }
        });

        if (!isValid) return;

        fetch('/api/professors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('professorName').value.trim(),
                email: document.getElementById('professorEmail').value.trim()
            })
        })
            .then(() => {
                professorModal.style.display = 'none';
                professorForm.reset();
                setTimeout(loadProfessors, 300);
            })
            .catch(error => console.error('Eroare la adăugare profesor:', error));
    });
});
