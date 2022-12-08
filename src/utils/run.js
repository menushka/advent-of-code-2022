import { execSync } from 'child_process';

const arg = process.argv[2] || '1'; // Default value `dv` if no args provided via CLI.

execSync(`(cd src/${arg} && node index.js)`, {stdio:[0, 1, 2]});
