/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const fs = require('fs');

const generator = (filename, lines, create, unit) => {
  const filenameParam = filename || 'output.csv';
  const linesParam = lines || 1000000;
  const stream = fs.createWriteStream(filenameParam, { autoClose: true });

  const startWriting = (writeStream, encoding, done) => {
    let i = linesParam;
    function writing() {
      const canWrite = true;

      do {
        i -= 1;
        if (i % 100000 === 0) {
          console.log(`${i} ${unit} remaining`);
        }
        const post = create();
        // Check if i ==== 0 so we would write and call `done`
        if (i === 0) {
          // We are done, so fire the callback
          writeStream.write(post, encoding, done);
        } else {
          // We are not done, so don't fire the callback
          writeStream.write(post, encoding);
        }

        // Else call write and continue looping
      } while (i > 0 && canWrite);
      if (i > 0 && !canWrite) {
        // Our buffer for the stream is filled and we need to wait for a drain
        // Write some more once it drains.
        console.log('Draining...');
        writeStream.once('drain', writing);
      }
    }
    // initiate our writing function
    writing();
  };

  // //write our `header` line before we invoke the loop
  // stream.write(`userId,title,content,image,date\n`, 'utf-8')
  // invoke startWriting and pass callback
  startWriting(stream, 'utf-8', () => {
    stream.end();
  });
};

module.exports = generator;
