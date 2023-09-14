const express = require('express');
const path = require('path');
const app = express();

// Serve static assets (e.g., your built React app)
app.use(express.static(path.join(__dirname, 'build')));

// Define a catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
