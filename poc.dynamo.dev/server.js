const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const bundle = require('./src/bundler');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Function to set CORS headers
    function setCorsHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow GET, POST, and OPTIONS methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow only Content-Type header
    }

    if (pathname === '/dist') {
        const projectPath = './'; // Adjust this according to your project structure
        const entryPoint = './src/main.js'; // Adjust this according to your project structure
        const bundledCode = bundle(projectPath, entryPoint); // Call the bundle function with projectPath and entryPoint
        setCorsHeaders(res); // Set CORS headers for bundle response
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(bundledCode);
    }
    else if (pathname.startsWith('/src/') && pathname.endsWith('.js')) {
        // Serve JavaScript files from the 'src' directory
        setCorsHeaders(res); // Set CORS headers for JavaScript files

        const filePath = path.join(__dirname, pathname);
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath);
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(fileContent);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
        }
    }
    else {
        // Serve HTML page with client-side code
        const htmlPath = path.join(__dirname, 'index.html');
        const html = fs.readFileSync(htmlPath);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
