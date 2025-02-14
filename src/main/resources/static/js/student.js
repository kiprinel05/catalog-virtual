document.addEventListener('DOMContentLoaded', () => {
    const viewStudentsBtn = document.getElementById('show-students-btn');
    const studentsTable = document.getElementById('students-table').getElementsByTagName('tbody')[0];
    const addStudentBtn = document.getElementById('add-student-btn');
    const studentModal = document.getElementById('student-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const studentForm = document.getElementById('student-form');
    const studentsContent = document.getElementById('students-content');

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
                        <td>
                            <button class="delete-btn" data-id="${student.id}">Delete</button>
                        </td>
                    `;

                    row.style.opacity = "0";
                    row.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        row.style.opacity = "1";
                        row.style.transform = "translateY(0)";
                    }, index * 100);
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.getAttribute('data-id');
                        deleteStudent(id);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                alert('Failed to load students. Please try again later.');
            });
    }

    viewStudentsBtn.addEventListener('click', () => {
        if (studentsContent.style.display === 'none') {
            studentsContent.style.display = 'block';
            loadStudents();
        } else {
            studentsContent.style.display = 'none';
        }
    });

    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`/api/students/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to delete student');
                    return response.json();
                })
                .then(() => {
                    alert('Student deleted successfully!');
                    loadStudents();
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                    alert('Failed to delete student.');
                });
        }
    }

    addStudentBtn.addEventListener('click', () => {
        studentModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        studentModal.style.display = 'none';
    });

    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const studyYear = document.getElementById('studyYear').value.trim();
        const subgroup = document.getElementById('subgroup').value.trim();

        if (!firstName || !lastName || !email || !password || !studyYear || !subgroup) {
            alert("All fields are required!");
            return;
        }

        fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                studyYear: parseInt(studyYear),
                subgroup
            })
        })
            .then(response => response.json())
            .then(data => {
                studentModal.style.display = 'none';
                studentForm.reset();
                loadStudents();
            })
            .catch(error => {
                console.error('Error adding student:', error);
                alert('Failed to add student.');
            });
    });
});
