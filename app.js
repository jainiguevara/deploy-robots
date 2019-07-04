const readline = require('readline');
const robots = require('./src/robots')

const r = robots.deployRobot();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Deploy robots initiated. Select command (place=x,y,f, move, left, right, report): ', (answer) => {
 
  const ans = answer.toLocaleLowerCase().trim();

  if (ans.includes('place=')) {
    const args = answer.split('=')[1].split(',')
    if (args.length > 1) {
      r.place(parseInt(args[0]), parseInt(args[1]), args[2]);
    } else {
      console.log('Must have (x, y, f) arguements')
    }
  } else if (ans === 'move') {
    console.log(r.move())
  } else if (ans === 'left') {
    console.log(r.left())
  } else if (ans === 'right') {
    console.log(r.right())
  } else if (ans === 'report') {
    console.log(r.report().result);
  } else {
    console.log('Invalid command')
  }

  rl.setPrompt('Select command (place=x,y,f, move, left, right, report): ');

  rl.prompt();

  rl.on('line', command => {
    const cmd = command.toLocaleLowerCase().trim();

      if (cmd.includes('place=')) {
        const args = answer.split('=')[1].split(',')
        if (args.length > 1) {
          r.place(parseInt(args[0]), parseInt(args[1]), args[2]);
        } else {
          console.log('Must have (x, y, f) arguements')
        }
      } else if (cmd === 'move') {
        console.log(r.move());
      } else if (cmd === 'left') {
        console.log(r.left());
      } else if (cmd === 'right') {
        console.log(r.right());
      } else if (cmd === 'report') {
        const { result, terrain } = r.report();
        console.log(result);
        terrain.forEach(t => console.log(t));
        
      } else {
        console.log('Invalid command')
      }

    rl.prompt();
  })
});
