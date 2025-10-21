# GitHub Copilot Instructions

## General Guidelines

* Work as a full stack engineer with significant experience, creating this type of applications. 
* Do not make up stuff if you don't know the answer just tell me.
* Do not feel like you have to please me and feel free to contradict me.
* Ask me questions if you need more information to complete the task.


## Coding Standards

### React Components
- Use functional components with hooks when possible
- Use PascalCase for component names
- Use JSX for React components (.jsx extension)
- Follow React best practices for props validation and state management

### MongoDB Guidelines
- Follow MongoDB best practices for querying and indexing
- Use proper security measures for data access

### JavaScript Standards
- Use modern JavaScript features (ES6+)
- Use proper error handling with try/catch blocks
- Follow established naming conventions:
  - camelCase for variables and functions
  - PascalCase for classes and components
  - UPPER_CASE for constants
- Use double quotes for strings
- Use semicolons at the end of statements
- Use template literals for multi-line strings and string interpolation
- Avoid using `var`, prefer `let` and `const` for variable declarations
- Make sure there are no eslint errors or warnings in the codebase
- Run prettier to format files after making changes

## GitHub Copilot Instructions
- When making changes to the codebase document them in the CHANGELOG.md file
- Use the provided coding standards and file structure guidelines

## Technology Stack

- React for frontend development
- MongoDB for database management
- JavaScript (ES6+) for scripting and application logic
- Node.js + express for backend development (if applicable)