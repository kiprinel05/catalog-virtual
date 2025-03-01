# 🎓 Virtual Catalog for Faculty of Computer Science

This **📚 virtual catalog** is designed for managing students, courses, and professors in a Faculty of Computer Science. Built with **🚀 Spring Boot**, **🎨 HTML, CSS, JavaScript**, and **🐘 PostgreSQL**, it is currently **a work in progress**, with exciting features on the way!

## 🎥 Presentation Video


https://github.com/user-attachments/assets/e231f3eb-9e99-4332-b16c-0e932edb1cde



## ✨ Features

- 🔐 **User Authentication**: Secure login system.
- 👨‍🎓 **Student Management**: View, add, and delete students.
- 🏫 **Course & Professor Management**: Organize academic courses and faculty.
- 🗄️ **Database Integration**: Uses PostgreSQL for efficient data storage.
- 🎭 **Simple & Interactive Frontend**: Built with HTML, CSS, and JavaScript.

## 🛠️ Technologies Used

- **🖥️ Spring Boot** – Backend framework
- **🛡️ Spring Security** – Authentication & authorization
- **🐘 PostgreSQL** – Database management
- **🎨 HTML, CSS, JavaScript** – Frontend technologies
- **🧩 Maven** – Dependency management
- **💡 IntelliJ IDEA** – Development environment

## ⚙️ Installation

### 📌 Prerequisites
- ☕ Java 11 or higher
- 🐘 PostgreSQL
- 💻 IntelliJ IDEA (or another IDE)
- 🔧 Maven

### 🚀 Setup & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/kiprinel05/catalog-virtual.git
   cd catalog-virtual
   ```
2. Configure the PostgreSQL database:
   - 🏗️ Create a database (e.g., `catalog_virtual`).
   - Update `application.properties` with your credentials:
   ```bash
   spring.datasource.url=jdbc:postgresql://localhost:5432/catalog_virtual
   spring.datasource.username=yourusername
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.datasource.driver-class-name=org.postgresql.Driver
   ```
3. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```
4. 🎯 Access the application at `http://localhost:8080`.
   - 🔑 Default login: **admin / admin**

## 🚧 Development Status
- ✅ Basic functionalities (student, course, and professor management) are implemented.
- 🔄 User authentication is in place but needs improvements.
- 🎨 The frontend is in its early stages and will be expanded.

## 📅 Roadmap
- 🔑 Implement role-based access control (Admin, Professor, Student).
- 🔐 Improve password security and encryption.
- 🎭 Expand frontend with a more user-friendly interface.
- ⚡ Optimize database performance.

## 🙌 Acknowledgments
- **🚀 Spring Boot** for backend development
- **🐘 PostgreSQL** for database management
- **🎨 HTML, CSS, JavaScript** for frontend design
- **🧩 Maven** for dependency management

