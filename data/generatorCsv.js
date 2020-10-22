/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generator = async (filename, lines, create, unit) => {
  const filenameParam = filename || 'output.csv';
  const linesParam = lines || 1000000;

  const getHeader = create();

  fs.unlinkSync(filenameParam);

  const csvWriter = createCsvWriter({
    path: filenameParam,
    header: getHeader.header,
    append: true,
  });

  let recordCount = 0;
  while (recordCount < linesParam) {
    let records = [];
    for (let i = 0; i < linesParam / 100; i += 1) {
      const record = create();
      records.push(record.line);

      if (i % (linesParam / 1000) === 0 && i > 0) {
        console.log(`${i} records created`);
      }
      recordCount += 1;
    }

    await csvWriter.writeRecords(records)
      // eslint-disable-next-line no-loop-func
      .then(() => {
        console.log(`${recordCount}/${linesParam} ${unit} written to ${filenameParam}`);
      })
      .then(() => {
        records = [];
      });
    // .catch(err => console.log(err))
  }
};

module.exports = generator;
