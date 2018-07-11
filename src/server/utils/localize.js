// import path from 'path';
// import fs from 'fs';

// let messages = fs.readFileSync(path.join(__dirname, '../../../resources/i18n/en.json'), 'utf8');
// messages = JSON.parse(messages);
// console.log(1111, messages);

const messages = {};

export default function(...args) {
  console.log(2222, args);
  if (!messages[args[0]]) return args[0];

  const string = messages[args[0]];
  let index = 1;
  while(string.includes('%s')) {
    string.replace('%s', args[index]);
    index++;
  }
  return string;
}
