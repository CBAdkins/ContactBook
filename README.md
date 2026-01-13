# ContactBook

ContactBook is a simple full-stack web application built as part of a technical hiring exercise. The goal of the project was to demonstrate clean application structure, practical CRUD functionality, and clear separation between frontend and backend concerns.

The application allows users to create, view, update, and delete contacts through a web-based user interface backed by a RESTful API.

---

## Tech Stack

**Frontend**
- Angular
- TypeScript
- HTML / CSS

**Backend**
- ASP.NET Core Web API
- C#
- RESTful services

**Data**
- Relational database (via backend API)

---

## Features

- Create, read, update, and delete contact records
- Client-side form handling and validation
- RESTful API integration between frontend and backend
- Clear separation of concerns between UI and server logic
- Basic error handling for failed API requests

---

## Project Structure

ContactBook/
├── Client/ # Angular frontend
│ ├── src/
│ └── ...
│
├── API/ # ASP.NET Core Web API
│ ├── Controllers/
│ ├── Models/
│ ├── Services/
│ └── ...
│
└── README.md

---


The frontend is responsible for user interaction and presentation, while the backend exposes REST endpoints for all data operations.

---

## Running the Project Locally

### Backend (API)
1. Navigate to the API project directory
2. Restore dependencies
3. Run the application using Visual Studio or the .NET CLI
4. The API will start on a local port (configured in launch settings)

### Frontend (Angular)
1. Navigate to the Client directory
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:

ng serve


Open a browser to the Angular development URL (default: http://localhost:4200)

Ensure the frontend is configured to point to the correct API base URL.
