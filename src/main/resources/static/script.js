document.addEventListener('DOMContentLoaded', () => {
    const viewStudentsBtn = document.getElementById('view-students-btn');
    const studentsTable = document.getElementById('students-table').getElementsByTagName('tbody')[0];

    // Fetch and display students
    viewStudentsBtn.addEventListener('click', () => {
        fetch('/api/students')
            .then(response => response.json())
            .then(data => {
                studentsTable.innerHTML = ''; // Clear existing data
                data.forEach(student => {
                    const row = studentsTable.insertRow();
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.firstName} ${student.lastName}</td>
                        <td>${student.email}</td>
                        <td>
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    `;
                });
            })
            .catch(error => console.error('Error fetching students:', error));
    });

    // Function to delete student
    window.deleteStudent = (id) => {
        fetch(`/api/students/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                alert('Student deleted');
                location.reload(); // Reload page to reflect changes
            })
            .catch(error => console.error('Error deleting student:', error));
    };
});