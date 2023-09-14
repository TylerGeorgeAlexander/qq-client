const express = require('express');
const path = require('path');
const app = express();

// Serve static assets (e.g., your built React app)
app.use(express.static(path.join(__dirname, 'dist')));

// Define a catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
