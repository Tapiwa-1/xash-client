import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { mainMenu } from './menus/mainMenu.js';

const rl = readline.createInterface({ input, output });

// Start the application with rl instance
mainMenu(rl).catch(err => {
  console.error('Application error:', err);
  process.exit(1);
});