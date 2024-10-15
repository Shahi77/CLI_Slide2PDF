const pptToPdf = require("ppt-pdf");
const pdfMerger = require("pdf-merger-js");
const path = require("path");

const convertPdf = async (pptPath) => {
  try {
    //output path same as input ppt directory
    const outputPdfPath = path.join(
      path.dirname(pptPath),
      path.basename(pptPath, path.extname(pptPath)) + ".pdf"
    );
    //convert
    await pptToPdf(pptPath, outputPdfPath);
    return outputPdfPath;
  } catch (error) {
    throw new Error(`Error converting PPT to PDF :${error.message}`);
  }
};

const mergePdf = async (pdfFiles) => {
  try {
    const merger = new pdfMerger();
    for (const file of pdfFiles) {
      //add each pdf file to merger
      merger.add(file);
    }

    //output path in same directory as first pdf
    const mergedPath = path.join(
      path.dirname(pdfFiles[0]),
      "merged_output.pdf"
    );

    //merge and save pdf
    await merger.save(mergedPath);
    return mergedPath;
  } catch (error) {
    throw new Error(`Error merging PDFs :${error.message}`);
  }
};

export { convertPdf, mergePdf };
