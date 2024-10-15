import path from "path";
import pptToPdf from "ppt-pdf";
import pdfMerger from "pdf-merger-js";

export const convertPdf = async (pptPath) => {
  try {
    // Output path same as input ppt directory
    const outputPdfPath = path.join(
      path.dirname(pptPath),
      path.basename(pptPath, path.extname(pptPath)) + ".pdf"
    );
    // Convert
    await pptToPdf(pptPath, outputPdfPath);
    return outputPdfPath;
  } catch (error) {
    throw new Error(`Error converting PPT to PDF: ${error.message}`);
  }
};

export const mergePdf = async (pdfFiles) => {
  try {
    const merger = new pdfMerger();
    for (const file of pdfFiles) {
      // Add each pdf file to merger
      merger.add(file);
    }

    // Output path in the same directory as the first pdf
    const mergedPath = path.join(
      path.dirname(pdfFiles[0]),
      "merged_output.pdf"
    );

    // Merge and save pdf
    await merger.save(mergedPath);
    return mergedPath;
  } catch (error) {
    throw new Error(`Error merging PDFs: ${error.message}`);
  }
};
