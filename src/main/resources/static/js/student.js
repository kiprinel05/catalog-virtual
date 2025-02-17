document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const viewStudentsBtn = document.getElementById('show-students-btn');
        const studentsTable = document.querySelector('#students-table tbody');
        const addStudentBtn = document.getElementById('add-student-btn');
        const studentModal = document.getElementById('student-modal');
        const closeModalBtn = document.querySelector('#student-modal .close-btn');
        const studentForm = document.getElementById('student-form');
        const studentsContent = document.getElementById('students-content');

        if (!viewStudentsBtn || !studentsContent || !addStudentBtn || !studentModal || !studentForm || !studentsTable) {
            console.error("One or more required elements are missing from the DOM.");
            console.log({ viewStudentsBtn, studentsContent, addStudentBtn, studentModal, studentForm, studentsTable });
            return;
        }

        function loadStudents() {
            fetch('/api/students')
                .then(response => response.json())
                .then(data => {
                    studentsTable.innerHTML = '';
                    data.forEach((student, index) => {
                        const row = studentsTable.insertRow();
                        row.innerHTML = `
                            <td>${student.id}</td>
                            <td>${student.firstName} ${student.lastName}</td>
                            <td>${student.email}</td>
                            <td><button class="delete-btn" data-id="${student.id}">Delete</button></td>
                        `;
                        row.style.opacity = "0";
                        row.style.transform = "translateY(20px)";
                        setTimeout(() => {
                            row.style.opacity = "1";
                            row.style.transform = "translateY(0)";
                        }, index * 100);
                    });
                    attachDeleteEventListeners();
                })
                .catch(error => console.error('Error loading students:', error));
        }

        function attachDeleteEventListeners() {
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const studentId = e.target.getAttribute('data-id');
                    deleteStudent(studentId);
                });
            });
        }

        function deleteStudent(id) {
            fetch(`/api/students/${id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(() => {
                    setTimeout(loadStudents, 300);
                })
                .catch(error => console.error('Error deleting student:', error));
        }

        viewStudentsBtn.addEventListener('click', () => {
            studentsContent.style.display = studentsContent.style.display === 'none' ? 'block' : 'none';
            if (studentsContent.style.display === 'block') loadStudents();
        });

        addStudentBtn.addEventListener('click', () => {
            studentModal.style.display = 'flex';
        });

        closeModalBtn?.addEventListener('click', () => {
            studentModal.style.display = 'none';
        });

        studentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const studentData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                studyYear: parseInt(document.getElementById('studyYear').value.trim()),
                subgroup: document.getElementById('subgroup').value.trim()
            };

            fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            })
                .then(response => response.json())
                .then(() => {
                    studentModal.style.display = 'none';
                    studentForm.reset();
                    loadStudents();
                })
                .catch(error => console.error('Error adding student:', error));
        });
    }, 100);
});
