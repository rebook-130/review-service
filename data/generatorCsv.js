/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generator = async (filename, lines, create, unit) => {
  const filenameParam = filename || 'output.csv';
  const cassandra = filenameParam.split('/').includes('cassandra');
  const linesParam = lines || 1000000;

  try {
    fs.accessSync(filenameParam, fs.F_OK); // check if file exists
    fs.unlinkSync(filenameParam); // if it does, delete it
    console.log(`${filenameParam} deleted`);
  } catch (err) {
    console.log(`File doesn't exist: ${err}`); // otherwise, continue
  }

  const getHeader = create(); // keys stored in object under "header" property
  const csvWriter = createCsvWriter({
    path: filenameParam,
    header: getHeader.header,
    append: true,
  });

  let recordCount = 0;
  while (recordCount < linesParam) {
    let records = [];
    for (let i = 0; i < linesParam / 100; i += 1) {
      recordCount += 1;
      const record = create();
      if (cassandra) {
        record.line.id = recordCount;
      }
      records.push(record.line);

      if (i % (linesParam / 1000) === 0 && i > 0) {
        console.log(`${i} records created`);
      }
    }

    await csvWriter.writeRecords(records)
      // eslint-disable-next-line no-loop-func
      .then(() => {
        console.log(`${recordCount}/${linesParam} ${unit} written to ${filenameParam}`);
      })
      .catch((err) => console.log(err));
  }
};

module.exports = generator;
