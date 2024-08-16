# -Movie-Booking-backend-Project
This system includes User, Admin, Movies, and Booking modules. Users can sign up, log in, update, and delete accounts. Admins, authenticated via JWT, manage movies and user accounts. The Booking module allows users to book, update, and search reservations by ID.
Project Overview
This project is a comprehensive movie management system with four key modules: User, Admin, Movies, and Booking. Admins use JWT (JSON Web Token) for authentication and authorization, ensuring secure access. Each module is tailored to manage user interactions, administrative tasks, movie data, and bookings.

Modules Description
1. User Module
The User module handles user management and interactions. It includes:

Signup: Users can create accounts by providing necessary details like name, email, and password.
Login: Users authenticate using their credentials to access their accounts.
Update Profile: Users can update their personal information, such as email or password.
Delete Account: Users have the option to delete their accounts and remove their data from the system.
2. Admin Module
The Admin module is designed for administrative management, using JWT for secure access. It includes:

Signup: Admins can create new admin accounts with specific roles and permissions.
Login: Admins authenticate via JWT to access admin functionalities.
Update Profile: Admins can modify their account details.
Delete Account: Admins can delete or deactivate admin accounts as needed.
3. Movies Module
The Movies module focuses on managing movie data and is accessible only to admins. It includes:

Add Movies: Admins can add new movies, including details like title, genre, and release date.
Update Movies: Admins can update movie information as required.
Delete Movies: Admins can remove movies from the system.
Movie Configuration: Admins manage movie categories and showtimes.
4. Booking Module
The Booking module manages reservations and allows users to:

Add New Booking: Users can book tickets for movies, selecting showtimes and seats.
Search Booking by ID: Users and admins can search for bookings using a unique booking ID to view details or manage reservations.
Booking Management: Includes features for viewing, updating, or canceling bookings based on availability.
Integration and Security
JWT Authentication: Admins use JWT for secure access to administrative features. Users authenticate with standard credentials.
Role-Based Access: Ensures appropriate access levels for users and admins, protecting sensitive operations and data.
User Experience
Responsive Design: Accessible and user-friendly across various devices.
Intuitive Navigation: Easy-to-use interface for seamless access to functionalities.
Conclusion
This system provides a robust solution for managing movie-related operations, with distinct modules for users, admins, movies, and bookings. JWT authentication for admins ensures secure and efficient management, while user interactions are handled through straightforward account functionalities.
