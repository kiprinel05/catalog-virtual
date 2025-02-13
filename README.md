# Virtual Catalog for Faculty of Computer Science

This is a **virtual catalog** for a Faculty of Computer Science, built using **Spring Boot**, **HTML**, **CSS**, **JavaScript**, and **PostgreSQL**. The project is still in development, and several features are yet to be added or refined.

## Features

- **User Authentication**: Login functionality using username and password.
- **Student Management**: View, add, and delete students.
- **Course Management**: Manage courses.
- **Professor Management**: Manage professors.
- **Database Integration**: PostgreSQL is used for data storage.
- **Frontend**: Simple frontend using HTML, CSS, and JavaScript for interacting with the backend API.

## Technologies Used

- **Spring Boot**: Backend framework.
- **Spring Security**: For user authentication and authorization.
- **PostgreSQL**: Database management system.
- **HTML/CSS/JavaScript**: Frontend technologies for creating the user interface.
- **Maven**: For dependency management.
- **IntelliJ IDEA**: IDE used for development.

## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- Java 11 or higher
- PostgreSQL
- IntelliJ IDEA (or any IDE of your choice)
- Maven

### Steps to Run the Application

1. Clone the repository:

   ```bash
   git clone https://github.com/kiprinel05/catalog-virtual.git
   ```

2. Navigate to the project directory:
   ```bash
   cd catalog-virtual
   ```

3. Set up your PostgreSQL database:

 * Create a new database in PostgreSQL (e.g., catalog-virtual).
 * Update the database credentials in src/main/resources/application.properties.
 * Example application.properties:
  ```bash
  spring.datasource.url=jdbc:postgresql://localhost:5432/virtual_catalog
  spring.datasource.username=yourusername
  spring.datasource.password=yourpassword
  spring.jpa.hibernate.ddl-auto=update
  spring.datasource.driver-class-name=org.postgresql.Driver
  ```

4. Build the project
   
6. Run the application
   
7. Access the application at http://localhost:8080.
* Login with the credentials:
    - Username: admin
    - Password: admin

## Current State
- The project is in development.
- Basic functionalities (student, course, and professor management) are implemented.
- User authentication is set up but can be expanded for more advanced use cases.
- Frontend is in the initial stage and can be improved.

## TODO
- Add advanced user roles (e.g., Admin, Professor, Student).
- Implement proper password encryption.
- Extend frontend with more detailed pages and features.
- Optimize database schema and improve performance.

## Acknowledgments
- Spring Boot for the backend framework.
- PostgreSQL for the database system.
- HTML/CSS/JavaScript for the frontend development.
- Maven for dependency management.
