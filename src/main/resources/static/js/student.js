document.addEventListener('DOMContentLoaded', () => {
    const viewStudentsBtn = document.getElementById('show-students-btn');
    const studentsTable = document.getElementById('students-table')?.getElementsByTagName('tbody')[0];
    const addStudentBtn = document.getElementById('add-student-btn');
    const studentModal = document.getElementById('student-modal');
    const closeModalBtn = studentModal?.querySelector('.close-btn');
    const studentForm = document.getElementById('student-form');
    const studentsContent = document.getElementById('students-content');

    // Modal pentru confirmare ștergere
    const confirmModal = document.createElement('div');
    confirmModal.classList.add('modal');
    confirmModal.innerHTML = `
        <div class="modal-content">
            <h2 id="confirm-text"></h2>
            <button id="confirm-delete" class="modern-button">Confirmă</button>
            <button id="cancel-delete" class="modern-button">Anulează</button>
        </div>`;
    document.body.appendChild(confirmModal);

    function loadStudents() {
        fetch('/api/students')
            .then(response => response.json())
            .then(data => {
                if (!studentsTable) return;
                studentsTable.innerHTML = '';
                data.forEach((student, index) => {
                    const row = studentsTable.insertRow();
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.firstName} ${student.lastName}</td>
                        <td>${student.email}</td>
                        <td><button class="delete-btn" data-id="${student.id}" data-name="${student.firstName} ${student.lastName}">Șterge</button></td>
                    `;
                    row.style.opacity = "0";
                    row.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        row.style.opacity = "1";
                        row.style.transform = "translateY(0)";
                    }, index * 100);
                });
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = button.getAttribute('data-id');
                        const name = button.getAttribute('data-name');
                        showConfirmModal(id, name);
                    });
                });
            })
            .catch(error => console.error('Eroare la încărcarea studenților:', error));
    }

    function showConfirmModal(id, name) {
        if (!name) {
            console.error("Numele studentului este invalid sau lipsă!");
            return;
        }
        document.getElementById('confirm-text').innerText = `Ești sigur că vrei să-l ștergi pe studentul ${name}?`;
        confirmModal.style.display = 'flex';

        const confirmBtn = document.getElementById('confirm-delete');
        confirmBtn.replaceWith(confirmBtn.cloneNode(true));
        document.getElementById('confirm-delete').addEventListener("click", () => {
            deleteStudent(id);
            confirmModal.style.display = 'none';
        });

        document.getElementById('cancel-delete').onclick = () => {
            confirmModal.style.display = 'none';
        };
    }

    function deleteStudent(id) {
        fetch(`/api/students/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Eșec la ștergere');
                return response.json();
            })
            .then(() => {
                setTimeout(loadStudents, 300);
            })
            .catch(error => console.error('Eroare la ștergere:', error));
    }

    viewStudentsBtn?.addEventListener('click', () => {
        if (!studentsContent) return;
        studentsContent.style.display = studentsContent.style.display === 'none' ? 'block' : 'none';
        if (studentsContent.style.display === 'block') loadStudents();
    });

    addStudentBtn?.addEventListener('click', () => {
        studentModal.style.display = 'flex';
    });

    closeModalBtn?.addEventListener('click', () => {
        studentModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === studentModal) studentModal.style.display = 'none';
    });

    studentForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const fields = [
            'firstName', 'lastName', 'email', 'password', 'studyYear', 'subgroup'
        ];
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
        fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                studyYear: parseInt(document.getElementById('studyYear').value.trim()),
                subgroup: document.getElementById('subgroup').value.trim()
            })
        })
            .then(response => response.json())
            .then(() => {
                studentModal.style.display = 'none';
                studentForm.reset();
                setTimeout(loadStudents, 300);
            })
            .catch(error => console.error('Eroare la adăugare student:', error));
    });
});
