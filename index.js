const fs = require('fs');
const json2csv = require('json2csv').parse;
const inputDir = './jsonfiles/';
const outputDir = './csvfiles/';
const combinedData = []; // store the combined data from all input files

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    let count = 0; // keep track of how many files have been processed
    files.forEach(file => {
      fs.readFile(inputDir + file, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let jsonData = JSON.parse(data);
          if (!Array.isArray(jsonData)) {
            jsonData = [jsonData]; // wrap jsonData in an array if it's not already an array
          }
          const relevantData = jsonData.map(item => {
            const containers = item.containers || [];
            const dataArr = [];
            containers.forEach(container => {
              const names = container.Names || [];
              names.forEach(name => {
                const _Healthy = container._Healthy || '';
                const status = container.Status || '';
                dataArr.push({
                  create: item.created,
                  name,
                  _Healthy,
                  status
                });
              });
            });
            return dataArr;
          }).flat();
          combinedData.push(...relevantData); // add the relevant data to the combinedData array
          count++;
          if (count === files.length) { // check if all files have been processed
            const fields = ['create', 'name', '_Healthy', 'status'];
            const csvData = json2csv(combinedData, { fields });
            fs.writeFile(outputDir + 'combined.csv', csvData, err => {
              if (err) {
                console.log(err);
              } else {
                console.log('Combined data saved to combined.csv');
              }
            });
          }
        }
      });
    });
  }
});




//v2

//const fs = require('fs');
//const json2csv = require('json2csv').parse;
//const inputDir = './jsonfiles/';
//const outputDir = './csvfiles/';
//
//// Read all JSON files in input directory
//fs.readdir(inputDir, (err, files) => {
//  if (err) {
//    console.log(err);
//  } else {
//    // Process each file
//    files.forEach(file => {
//      fs.readFile(inputDir + file, (err, data) => {
//        if (err) {
//          console.log(err);
//        } else {
//          // Parse JSON data
//          const jsonData = JSON.parse(data);
//
//          // Extract relevant data
//          const relevantData = jsonData.map(item => {
//            const containers = item.containers || [];
//            const dataArr = [];
//            containers.forEach(container => {
//              const names = container.Names || [];
//              names.forEach(name => {
//                const _Healthy = container._Healthy || '';
//                const status = container.Status || '';
//                dataArr.push({
//                  create: item.created,
//                  name,
//                  _Healthy,
//                  status
//                });
//              });
//            });
//            return dataArr;
//          }).flat();
//
//          // Convert to CSV
//          const fields = ['create', 'name', '_Healthy', 'status'];
//          const csvData = json2csv(relevantData, { fields });
//
//          // Write CSV to output directory with same filename
//          const outputFilename = file.replace('.json', '.csv');
//          fs.writeFile(outputDir + outputFilename, csvData, err => {
//            if (err) {
//              console.log(err);
//            } else {
//              console.log(`Converted ${file} to ${outputFilename}`);
//            }
//          });
//        }
//      });
//    });
//  }
//});

//---------------------------------------------------------------------------------------//

//v1

//const fs = require('fs');
//const path = require('path');
//const json2csv = require('json2csv');
//
//const jsonFolder = path.join(__dirname, 'jsonfiles');
//const csvFolder = path.join(__dirname, 'csvfiles');
//
//fs.readdir(jsonFolder, (err, files) => {
//  if (err) {
//    console.error(err);
//    return;
//  }
//
//  files.forEach((file) => {
//    const filePath = path.join(jsonFolder, file);
//    fs.readFile(filePath, 'utf-8', (err, data) => {
//      if (err) {
//        console.error(err);
//        return;
//      }
//
//      const jsonData = JSON.parse(data);
//      const csvData = json2csv.parse(jsonData);
//
//      const csvFilePath = path.join(csvFolder, `${path.parse(file).name}.csv`);
//      fs.writeFile(csvFilePath, csvData, (err) => {
//        if (err) {
//          console.error(err);
//          return;
//        }
//
//        console.log(`File ${csvFilePath} saved successfully.`);
//      });
//    });
//  });
//});