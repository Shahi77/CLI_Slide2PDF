import path from "path";
import fs from "fs";
import officeToPdf from "office-to-pdf";
import pdfMerger from "pdf-merger-js";

export const convertPdf = async (pptPath) => {
  try {
    // Read the PPT file as a buffer
    const pptBuffer = fs.readFileSync(pptPath);

    // Convert to PDF
    const pdfBuffer = await officeToPdf(pptBuffer);

    // Output PDF path (same directory as input PPT)
    const outputPdfPath = path.join(
      path.dirname(pptPath),
      path.basename(pptPath, path.extname(pptPath)) + ".pdf"
    );

    // Write the converted PDF to the output path
    fs.writeFileSync(outputPdfPath, pdfBuffer);

    return outputPdfPath;
  } catch (error) {
    throw new Error(`Error converting PPT to PDF: ${error.message}`);
  }
};

export const mergePdf = async (pdfFiles) => {
  try {
    const merger = new pdfMerger();

    // Add each PDF file to the merger
    for (const file of pdfFiles) {
      merger.add(file);
    }

    // Output path in the same directory as the first PDF
    const mergedPath = path.join(
      path.dirname(pdfFiles[0]),
      "merged_output.pdf"
    );

    // Merge and save the final merged PDF
    await merger.save(mergedPath);

    return mergedPath;
  } catch (error) {
    throw new Error(`Error merging PDFs: ${error.message}`);
  }
};
