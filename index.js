const fs = require('fs');

var argv = require('yargs')
  .usage('node magstrip-filegen')
  .options({
    'input': {
      alias: 'i',
      demandOption: true,
      describe: 'Input file of single line keycard codes.',
      type: 'string'
    },
    'output': {
      alias: 'o',
      demandOption: true,
      describe: 'Output file name and location.',
      type: 'string'
    // },
    // 'break': {
    //   alias: 'b',
    //   demandOption: false,
    //   describe: 'Number of entries before making a new file.',
    //   type: 'number'
    }
  })
  .argv
;

let outputString = [];
const lineReader = require('readline').createInterface({
  input: fs.createReadStream(argv.input)
});

lineReader.on('line', function(line) {
  // console.log('Line:', line);
  outputString.push('%' + line + '?');
  outputString.push(';' + line + '?');
  outputString.push('+' + line + '?');
  outputString.push('');
});

lineReader.on('close', function() {
  console.info(outputString.join('\n'));

  let outputBufferPath = argv.output + '.txt';

  fs.writeFile(outputBufferPath, outputString.join('\n'), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('Output written to: ' + outputBufferPath);
  })
})
