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
