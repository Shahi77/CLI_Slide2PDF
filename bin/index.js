#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const path = require("path");
const fs = require("fs");

const usage = chalk.green(
  "\nUsage:  -c <convert> -m <merge_pdfs> \n " +
    boxen(chalk.blue("\nConvert PPT to PDF and merfe PDFs\n"), {
      padding: 1,
      borderColor: "blue",
      dimBorder: true,
    })
);
const options = yargs
  .usage(usage)
  .option("c", {
    alias: "convert",
    describe: "Convert PPT files to PDF",
    type: "string",
    demandOption: false,
  })
  .option("m", {
    alias: "merge",
    describe: "Merge multiple pdf files",
    type: "array",
    demandOption: false,
  })
  .help(true).argv;

const main = async () => {
  try {
    const { convertPdf, mergePdf } = await import("./utils.js");

    //Handle conversion
    if (options.convert) {
      const pptPath = path.resolve(options.convert);
      if (!fs.existsSync(pptPath)) {
        console.log(chalk.red("PPT file does not exist!"));
        process.exit(1);
      }

      const pdfPath = await convertPdf(pptPath);
      console.log(chalk.green(`PPT successfully converted to PDF: ${pdfPath}`));
    }

    //Handle merging
    if (options.merge) {
      const pdfFiles = options.merge.map((file) => path.resolve(file));
      pdfFiles.forEach((file) => {
        if (!fs.existsSync(file)) {
          console.log(chalk.red(`PDF file does not exist: ${file}`));
          process.exit(1);
        }
      });

      const mergedPdfPath = await mergePdf(pdfFiles);
      console.log(
        chalk.green(`PDFs successfully merged into: ${mergedPdfPath}`)
      );
    }
  } catch (error) {
    console.log(chalk.red("Error occurred:", error.message));
  }
};
main();
