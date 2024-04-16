const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/dist') {
        const projectPath = parsedUrl.query.projectPath;
        const entryPoint = parsedUrl.query.entryPoint;
        const bundle = generateBundle(projectPath, entryPoint);
        
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(bundle);
    } else {
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

function generateBundle(projectPath, entryPoint) {
    // Implement your bundling logic here
    // This is a simple example, you can use tools like Webpack or Rollup for real projects
    // Resolve dependencies, minify code, etc.
    // For demonstration purposes, let's assume concatenation of files
    const files = [
        fs.readFileSync(path.join(projectPath, entryPoint), 'utf-8')
    ];
    
    return files.join('\n');
}
