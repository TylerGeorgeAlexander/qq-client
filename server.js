import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static assets (e.g., your built React app)
app.use(express.static(join(__dirname, 'build')));

// Define a catch-all route
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

// Start the server
const { PORT = 3000 } = import.meta.env;
const port = Number(PORT);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

