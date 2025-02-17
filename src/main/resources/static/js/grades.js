document.addEventListener("DOMContentLoaded", () => {
    const gradesTable = document.getElementById("grades-table").getElementsByTagName("tbody")[0];
    const courseSelector = document.getElementById("course-selector");

    let editId = null;
    let deleteId = null;
    let addStudentId = null;
    let addCourseId = null;

    function loadCourses() {
        fetch("/api/courses")
            .then(response => response.json())
            .then(courses => {
                courseSelector.innerHTML = "";
                courses.forEach(course => {
                    const option = document.createElement("option");
                    option.value = course.id;
                    option.textContent = course.name;
                    courseSelector.appendChild(option);
                });
                loadGrades(courses[0].id);
            });
    }

    function loadGrades(courseId) {
        Promise.all([
            fetch(`/api/students?courseId=${courseId}`).then(response => response.json()),
            fetch(`/api/grades/${courseId}`).then(response => response.json())
        ]).then(([students, grades]) => {
            gradesTable.innerHTML = "";
            students.forEach(student => {
                const studentGrade = grades.find(g => g.student.id === student.id);
                const row = gradesTable.insertRow();
                row.innerHTML = `
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${studentGrade ? studentGrade.grade : "No grade"}</td>
                    <td>
                        ${studentGrade ?
                    `<button class="edit-btn" data-id="${studentGrade.id}" data-grade="${studentGrade.grade}">Edit</button>
                            <button class="delete-btn" data-id="${studentGrade.id}">Delete</button>`
                    :
                    `<button class="add-grade-btn" data-student-id="${student.id}" data-course-id="${courseId}">Add Grade</button>`
                }
                    </td>
                `;
            });
            attachEventListeners();
        });
    }

    function attachEventListeners() {
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", event => {
                editId = event.target.dataset.id;
                document.getElementById("edit-grade-input").value = event.target.dataset.grade;
                openModal("edit-modal");
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", event => {
                deleteId = event.target.dataset.id;
                openModal("delete-modal");
            });
        });

        document.querySelectorAll(".add-grade-btn").forEach(button => {
            button.addEventListener("click", event => {
                addStudentId = event.target.dataset.studentId;
                addCourseId = event.target.dataset.courseId;
                openModal("add-modal");
            });
        });
    }

    function openModal(id) {
        document.getElementById(id).style.display = "block";
    }

    function closeModal() {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.style.display = "none";
        });
    }

    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", closeModal);
    });

    document.getElementById("save-edit-btn").addEventListener("click", () => {
        const newGrade = document.getElementById("edit-grade-input").value;
        fetch(`/api/grades/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ grade: parseFloat(newGrade) })
        }).then(() => {
            loadGrades(courseSelector.value);
            closeModal();
        });
    });

    document.getElementById("confirm-delete-btn").addEventListener("click", () => {
        fetch(`/api/grades/${deleteId}`, { method: "DELETE" }).then(() => {
            loadGrades(courseSelector.value);
            closeModal();
        });
    });

    document.getElementById("save-add-btn").addEventListener("click", () => {
        const newGrade = document.getElementById("add-grade-input").value;
        fetch("/api/grades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ student: { id: addStudentId }, course: { id: addCourseId }, grade: parseFloat(newGrade) })
        }).then(() => {
            loadGrades(addCourseId);
            closeModal();
        });
    });

    courseSelector.addEventListener("change", () => loadGrades(courseSelector.value));
    loadCourses();
});
