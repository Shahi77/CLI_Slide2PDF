#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import boxen from "boxen";
import path from "path";
import fs from "fs";
import { convertPdf, mergePdf } from "./utils.js";

const usage = chalk.green(
  "\nUsage: create-pdf -c <convert> -m <merge_pdfs> \n " +
    boxen(chalk.blue("\nConvert PPT to PDF and merge PDFs\n"), {
      padding: 1,
      borderColor: "blue",
      dimBorder: true,
    })
);

const options = yargs(hideBin(process.argv))
  .usage(usage)
  .option("c", {
    alias: "convert",
    describe: "Convert PPT files to PDF",
    type: "string",
    demandOption: false,
  })
  .option("m", {
    alias: "merge",
    describe: "Merge multiple PDF files",
    type: "array",
    demandOption: false,
  })
  .help(true).argv;

const main = async () => {
  try {
    // Handle conversion
    if (options.convert) {
      const pptPath = path.resolve(options.convert);
      if (!fs.existsSync(pptPath)) {
        console.log(chalk.red("PPT file does not exist!"));
        process.exit(1);
      }

      const pdfPath = await convertPdf(pptPath);
      console.log(chalk.green(`PPT successfully converted to PDF: ${pdfPath}`));
    }

    // Handle merge
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
