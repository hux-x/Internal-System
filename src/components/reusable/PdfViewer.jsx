import React from "react";

const PDFViewer = ({ pdfUrl = "/Docs.pdf" }) => {
  return (
    <div className="flex items-center justify-center h-screen">
  <iframe
  src="https://drive.google.com/file/d/1GX0Oe8SOYHH8oi-iJl8q6sXS0F879wW-/view"

  className="w-[60vw] h-[90vh] rounded-lg shadow-lg"
  title="PDF Viewer"
  style={{ border: "none" }}
></iframe>

    </div>
  );
};

export default PDFViewer;
