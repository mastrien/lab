/**
 * DocToTex - ZIP Compression and Packaging Module
 */
class ZipPackager {
    /**
     * Packages the files and images and downloads the ZIP file.
     * @param {Object} parsedDoc - The parsed document containing images
     * @param {Object} latexData - The generated LaTeX strings { cls, tex, bib }
     * @param {Object} options - Selected document configuration options
     */
    static async download(parsedDoc, latexData, options) {
        const zip = new JSZip();
        
        // Add LaTeX files
        zip.file("main.tex", latexData.tex);

        if (options.classFormat === 'cls') {
            zip.file("doctotex.cls", latexData.cls);
        }

        if (options.citations !== 'none') {
            zip.file("references.bib", latexData.bib);
        }

        // Add extracted media images
        if (parsedDoc.images.length > 0) {
            const imgFolder = zip.folder("images");
            parsedDoc.images.forEach(img => {
                imgFolder.file(img.filename, img.blob);
            });
        }

        // Generate and trigger download
        const blobContent = await zip.generateAsync({ type: "blob" });
        const downloadUrl = URL.createObjectURL(blobContent);
        
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "doctotex-template.zip";
        document.body.appendChild(a);
        a.click();
        
        // Cleanup download link
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        }, 100);
    }
}

window.ZipPackager = ZipPackager;
