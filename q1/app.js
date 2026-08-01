const express = require('express');
const app = express();
const PORT = 3000;

const analyticsRoutes = require('./routes/analyticsRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());
app.use('/', analyticsRoutes);
app.use('/', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});