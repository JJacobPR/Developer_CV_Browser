## 📦 Introduction

This is a developer browser side project application built using **React** and **TypeScript**. Designed to provide ability to manage and browse developer CVs. The app offers a responsive and modular UI, making it easy to extend and integrate with various development tools and APIs.

## Notes

- Tests are now only configured with some exemplary added (to be changed in the future)
- State will need to be extended with new slices if the application grows
- This is a portfolio project. No plans of deploying it long term.

## ⚙️ Prerequisites

Before running the application, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 20)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager
- A modern web browser (for testing and usage)
- A configured backend running (located in the `backend` folder within this repository)

Optionally, having a code editor like [Visual Studio Code](https://code.visualstudio.com/) is recommended for development.

## 🚀 Installation

Follow these steps to get the project up and running locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JJacobPR/Developer_CV_Browser.git

   ```

2. **Navigate to the project directory:**

   ```bash
   cd Developer_CV_Browser/frontend
   ```

3. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

4. **Start the development server**

   Using npm:

   ```bash
   npm start
   ```

   Or using Yarn:

   ```bash
   yarn start
   ```

5. **Open your browser and visit**
   ```bash
   http://localhost:5173
   ```

## 🔧 Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root of the frontend project (same level as `package.json`) and add the following variable:

```env
VITE_API_URL="http://localhost:8080/api/v1"
```

VITE_API_URL: The base URL for the backend API. Update this if your backend runs on a different host or port.

## 🛠️ Build and Testing

This project includes scripts for building, testing and linting the app.

### Available Scripts

**Run tests:**

```bash
npm test
# or
yarn test
```

Executes tests using Vitest.

**Open Cypress test runner:**

```bash
npm run cy:open
# or
yarn cy:open
```

Launches Cypress UI for end-to-end testing.

**Run the build**

```bash
npm run build
# or
yarn build
```

**Run linter:**

```bash
npm run lint
# or
yarn lint
```
