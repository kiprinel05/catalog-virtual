document.addEventListener('DOMContentLoaded', () => {
    const viewCoursesBtn = document.getElementById('view-courses-btn');
    const coursesTable = document.getElementById('courses-table').getElementsByTagName('tbody')[0];
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseModal = document.getElementById('course-modal');
    const closeCourseModalBtn = document.querySelector('#course-modal .close-btn');
    const courseForm = document.getElementById('course-form');
    const coursesContent = document.getElementById('courses-content');
    const confirmModal = document.createElement('div');
    confirmModal.classList.add('modal');
    confirmModal.innerHTML = `
        <div class="modal-content">
            <h2 id="confirm-text"></h2>
            <button id="confirm-delete" class="modern-button">Confirmă</button>
            <button id="cancel-delete" class="modern-button">Anulează</button>
        </div>`;
    document.body.appendChild(confirmModal);

    function loadCourses() {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => {
                coursesTable.innerHTML = '';
                data.forEach(course => {
                    const row = coursesTable.insertRow();
                    row.innerHTML = `
                        <td>${course.id}</td>
                        <td>${course.name}</td>
                        <td>${course.credits}</td>
                        <td>${course.teacher ? course.teacher.name : 'N/A'}</td>
                        <td><button class="delete-btn" data-id="${course.id}" data-name="${course.name}">Șterge</button></td>
                    `;
                });
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.getAttribute('data-id');
                        const name = button.getAttribute('data-name');
                        showConfirmModal(id, name);
                    });
                });
            })
            .catch(error => console.error('Eroare la încărcarea cursurilor:', error));
    }

    function showConfirmModal(id, name) {
        document.getElementById('confirm-text').innerText = `Ești sigur că vrei să ștergi cursul ${name}?`;
        confirmModal.style.display = 'flex';
        document.getElementById('confirm-delete').onclick = () => {
            deleteCourse(id);
            confirmModal.style.display = 'none';
        };
        document.getElementById('cancel-delete').onclick = () => {
            confirmModal.style.display = 'none';
        };
    }

    function deleteCourse(id) {
        fetch(`/api/courses/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Eșec la ștergere');
                return response.json();
            })
            .then(() => {
                setTimeout(loadCourses, 300);
            })
            .catch(error => console.error('Eroare la ștergere:', error));
    }

    viewCoursesBtn.addEventListener('click', () => {
        coursesContent.style.display = coursesContent.style.display === 'none' ? 'block' : 'none';
        if (coursesContent.style.display === 'block') loadCourses();
    });

    addCourseBtn.addEventListener('click', () => {
        courseModal.style.display = 'flex';
    });

    closeCourseModalBtn.addEventListener('click', () => {
        courseModal.style.display = 'none';
    });

    courseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fields = ['courseName', 'courseCredits', 'courseTeacher'];
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
        fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('courseName').value.trim(),
                credits: parseInt(document.getElementById('courseCredits').value.trim()),
                teacher: { id: parseInt(document.getElementById('courseTeacher').value.trim()) }
            })
        })
            .then(() => {
                courseModal.style.display = 'none';
                courseForm.reset();
                setTimeout(loadCourses, 300);
            })
            .catch(error => console.error('Eroare la adăugare curs:', error));
    });
});
