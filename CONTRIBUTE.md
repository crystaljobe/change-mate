# Contributing to ChangeMate

Welcome to ChangeMate! We appreciate your interest in contributing to our project. Before you start contributing, please take a moment to read through these guidelines.

## Getting Started

To contribute to ChangeMate, you'll need to set up the project environment on your local machine. Follow these steps:

### Prerequisites

Make sure you have the following installed on your system:

- Python 3.x
- Node.js and npm
- Git

### Setup Instructions

1. **Fork the Repository:** Click the "Fork" button in the top-right corner of the repository page to create your own copy of the project.

2. **Clone the Repository:** Clone your forked repository to your local machine using the following command:
   ```
   git clone https://github.com/your-username/ChangeMate.git
   ```

3. **Navigate to the Project Directory:** Change to the project directory:
   ```
   cd ChangeMate
   ```

4. **Backend Setup (Django):**
   - Create a virtual environment:
     ```
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```
       venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```
       source venv/bin/activate
       ```
   - Install Django requirements:
     ```
     pip install -r backend/requirements.txt
     ```
   - Apply database migrations:
     ```
     python backend/manage.py migrate
     ```
   - Load initial data fixtures (if available):
     ```
     python backend/manage.py loaddata fixtures/[fixture-name].json
     ```

5. **Frontend Setup (React):**
   - Navigate to the frontend directory:
     ```
     cd frontend
     ```
   - Install Node.js dependencies:
     ```
     npm install
     ```

6. **API Keys:**
   If the project requires API keys for third-party services, please reach out to the project team to obtain the necessary keys. Once you have the API keys, create a `.env` file in the root of the project directory and add the keys following the format specified by the team.

   ```
   # Example .env file
   API_KEY=your-api-key
   ```

## Making Contributions

Once you have set up the project environment, you're ready to start contributing! Here are the steps to contribute:

1. **Create a New Branch:** Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/my-feature
   ```
   or
   ```
   git checkout -b bugfix/my-bug-fix
   ```

2. **Make Changes:** Make your changes to the codebase.

3. **Commit Changes:** Commit your changes with descriptive commit messages:
   ```
   git commit -m 'Add some feature'
   ```

4. **Push Changes:** Push your changes to your forked repository:
   ```
   git push origin feature/my-feature
   ```

5. **Open a Pull Request:** Submit a pull request against the `main` branch of the original repository.

## Code Review and Feedback

Once you've submitted a pull request, the project maintainers will review your changes. Please be patient during this process and be open to feedback. Make any necessary changes based on the feedback provided.

## Questions or Issues

If you have any questions or encounter issues while setting up the project or contributing, feel free to reach out to the project team or create a new issue in the repository.

Thank you for your contribution to ChangeMate!
