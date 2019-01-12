const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('App Home');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
