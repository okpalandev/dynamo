// src/bundler/server.ts

import * as http from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import * as worker from "worker"

interface ServerOptions {
  projectPath: string;
  entryPoint: string;
}

export class Server {
  private options: ServerOptions;

  constructor(options: ServerOptions) {
    this.options = options;
  }

  start() {
    http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const pathname = parsedUrl.pathname;

      if (pathname === '/bundle') {
        const bundle = this.generateBundle();

        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(bundle);
      } else {
        // Serve HTML page with client-side code
        const htmlPath = path.join(__dirname, 'index.html');
        const html = fs.readFileSync(htmlPath);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
      }
    }).listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }

}
