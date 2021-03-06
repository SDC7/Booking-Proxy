const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const options = {
  target: process.env.HOST || `http://localhost:${port}`,
  changeOrigin: true,
  router: {
    '/api': 'http://airjld-reivews.us-east-2.elasticbeanstalk.com',
    '/rooms': 'http://airjldbooking.us-west-2.elasticbeanstalk.com',
    '/listings': 'http://airjld2-env.nhf7jyknam.us-east-2.elasticbeanstalk.com',
    '/description': 'http://jackscrap.us-west-1.elasticbeanstalk.com',
  },
};

const apiProxy = proxy(options);

app.use('/api', apiProxy);
app.use('/rooms', apiProxy);
app.use('/listings', apiProxy);
app.use('/description', apiProxy);

app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
