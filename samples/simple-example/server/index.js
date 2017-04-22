const express = require('express');

const app = express();

app.get('/api/people', (req, res) => {
  console.log('Requested with: ', req.header('X-Requested-With'));

  return res.send([
    {
      id: 1,
      firstname: 'John',
      lastname: 'Smith'
    },
    {
      id: 2,
      firstname: 'Meliana',
      lastname: 'Corpenskii'
    }
  ]);
});

app.listen(4000, () => {
  console.log('Listening to port 4000.');
})