import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles('./src');
let failed = 0;
for (const f of files) {
  try {
    execSync(`node --check "${f}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error('SYNTAX ERROR in', f, ':', err.stderr.toString());
    failed++;
  }
}
console.log(`Checked ${files.length} files. Total failures: ${failed}`);
if (failed > 0) process.exit(1);
