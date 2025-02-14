document.addEventListener('DOMContentLoaded', () => {
    const viewCoursesBtn = document.getElementById('view-courses-btn');
    const coursesTable = document.getElementById('courses-table').getElementsByTagName('tbody')[0];
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseModal = document.getElementById('course-modal');
    const closeCourseModalBtn = document.querySelector('#course-modal .close-btn');
    const courseForm = document.getElementById('course-form');
    const coursesContent = document.getElementById('courses-content');

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
                        <td><button class="delete-btn" data-id="${course.id}">Delete</button></td>
                    `;
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        deleteCourse(button.getAttribute('data-id'));
                    });
                });
            })
            .catch(() => alert('Failed to load courses.'));
    }

    viewCoursesBtn.addEventListener('click', () => {
        coursesContent.style.display = coursesContent.style.display === 'none' ? 'block' : 'none';
        if (coursesContent.style.display === 'block') loadCourses();
    });

    function deleteCourse(id) {
        if (confirm('Are you sure you want to delete this course?')) {
            fetch(`/api/courses/${id}`, { method: 'DELETE' })
                .then(() => loadCourses())
                .catch(() => alert('Failed to delete course.'));
        }
    }

    addCourseBtn.addEventListener('click', () => {
        courseModal.style.display = 'flex';
    });

    closeCourseModalBtn.addEventListener('click', () => {
        courseModal.style.display = 'none';
    });

    courseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('courseName').value.trim();
        const credits = parseInt(document.getElementById('courseCredits').value.trim());
        const teacherId = parseInt(document.getElementById('courseTeacher').value.trim());

        if (!name || !credits || !teacherId) {
            alert("All fields are required!");
            return;
        }

        fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, credits, teacher: { id: teacherId } })
        })
            .then(() => {
                courseModal.style.display = 'none';
                courseForm.reset();
                loadCourses();
            })
            .catch(() => alert('Failed to add course.'));
    });
});