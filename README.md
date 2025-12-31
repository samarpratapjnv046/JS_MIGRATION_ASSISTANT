# JavaScript Migration Assistant

A web application that helps migrate legacy JavaScript code to modern ES6+ or TypeScript using AI.

## Features

- Monaco Editor for code input
- AI-powered code migration using OpenAI API
- Side-by-side diff viewer
- Accept, edit, and export migrated code
- MongoDB storage for migration sessions
- History view of past migrations

## Tech Stack

- **Frontend**: React, Monaco Editor, React Diff Viewer
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **AI**: OpenAI API

## Setup Instructions

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Create a `.env` file in the server directory with your API keys:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the backend server:
   ```bash
   cd server && npm start
   ```
5. Start the frontend development server:
   ```bash
   cd client && npm run dev
   ```
6. Open http://localhost:5173 in your browser

## Usage

1. Paste your legacy JavaScript code in the left editor
2. Click "Migrate Code" to transform it using AI
3. Review the changes in the diff viewer
4. Accept the migration or make further edits
5. Export the migrated code as a file

## Sample Migration Session

See `sample-session.json` for an example of a migration session data structure.



## API Endpoints

- `POST /migrate`: Migrate code using AI
- `GET /history`: Get migration history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
