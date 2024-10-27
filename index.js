const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const response = { message: '' };

    if (url === '/') {
      switch (method) {
        case 'GET':
          response.message = 'Welcome to the Basic Node.js Server!';
          res.statusCode = 200;
          break;
        case 'POST':
          response.message = 'Resource successfully created!';
          res.statusCode = 201;
          break;
        case 'PUT':
        case 'PATCH':
          response.message = 'Resource successfully updated!';
          res.statusCode = 200;
          break;
        case 'DELETE':
          response.message = 'Resource successfully removed!';
          res.statusCode = 200;
          break;
        default:
          response.message = 'Invalid HTTP method.';
          res.statusCode = 405;
      }
    } else {
      response.message = 'Route not found.';
      res.statusCode = 404;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
