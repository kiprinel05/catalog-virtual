document.addEventListener('DOMContentLoaded', () => {
    const viewCoursesBtn = document.getElementById('view-courses-btn');
    const coursesTable = document.getElementById('courses-table').getElementsByTagName('tbody')[0];
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseModal = document.getElementById('course-modal');
    const closeCourseModalBtn = document.querySelector('#course-modal .close-btn');
    const courseForm = document.getElementById('course-form');
    const coursesContent = document.getElementById('courses-content');

    let deleteCourseId = null;

    // Create confirmation modal
    const confirmModal = document.createElement('div');
    confirmModal.classList.add('modal');
    confirmModal.style.display = 'none';
    confirmModal.innerHTML = `
        <div class="modal-content">
            <h2 id="confirm-text">Are you sure you want to delete this course?</h2>
            <button id="confirm-delete" class="modern-button">Confirm</button>
            <button id="cancel-delete" class="modern-button">Cancel</button>
        </div>`;
    document.body.appendChild(confirmModal);

    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

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
                        <td><button class="delete-btn" data-id="${course.id}" data-name="${course.name || 'N/A'}">Delete</button></td>
                    `;
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', (event) => {
                        deleteCourseId = event.target.getAttribute('data-id'); // Store ID
                        const name = event.target.getAttribute('data-name') || 'Unknown Course';
                        showConfirmModal(name);
                    });
                });
            })
            .catch(error => console.error('Error loading courses:', error));
    }

    function showConfirmModal(name) {
        document.getElementById('confirm-text').innerText = `Are you sure you want to delete the course "${name}"?`;
        confirmModal.style.display = 'flex';
    }

    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'confirm-delete' && deleteCourseId) {
            deleteCourse(deleteCourseId);
            deleteCourseId = null;
            confirmModal.style.display = 'none';
        }
        if (event.target.id === 'cancel-delete') {
            confirmModal.style.display = 'none';
        }
    });

    function deleteCourse(id) {
        fetch(`/api/courses/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete');
                return Promise.resolve();
            })
            .then(() => {
                setTimeout(loadCourses, 300);
            })
            .catch(error => console.error('Error deleting course:', error));
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

        const courseName = document.getElementById('courseName').value.trim();
        const courseCredits = parseInt(document.getElementById('courseCredits').value.trim());
        const teacherId = document.getElementById('courseTeacher').value.trim();

        if (!courseName || isNaN(courseCredits) || courseCredits <= 0) {
            alert("Please fill in all fields correctly!");
            return;
        }

        const courseData = { name: courseName, credits: courseCredits };

        if (teacherId) {
            courseData.teacher = { id: parseInt(teacherId) };
        }

        fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        })
            .then(() => {
                courseModal.style.display = 'none';
                courseForm.reset();
                setTimeout(loadCourses, 300);
            })
            .catch(error => console.error('Error adding course:', error));
    });
});
