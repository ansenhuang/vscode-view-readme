import fs from 'fs';
import path from 'path';

export function findNodeModules(dirname: string): string | void {
  let nodeModulesPath;
  while (dirname !== '/') {
    nodeModulesPath = path.join(dirname, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      return nodeModulesPath;
    } else {
      dirname = path.dirname(dirname);
    }
  }
}
