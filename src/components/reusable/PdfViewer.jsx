import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import  { useContext, useState } from 'react';
import { OverallContext } from '../context/Overall';


import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';



//this is not working

pdfjs.GlobalWorkerOptions.workerSrc = new URL( //also tried the cdnjs.cloudfare script
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const {selectedTemplate} = useContext(OverallContext); //contains the file path. default: /tempaltes/resume.pdf

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPrevPage = () => 
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));

  const goToNextPage = () => 
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages));

  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  if (!selectedTemplate) {
    return <div className="flex items-center justify-center h-full bg-gray-100">
      <p className="text-gray-500">No PDF selected</p>
    </div>;
  }

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-white rounded border border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={goToNextPage} 
            disabled={pageNumber >= numPages}
            className="px-3 py-1 bg-white rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
          <span className="px-3 py-1">
            Page {pageNumber} of {numPages || '--'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={zoomOut}
            className="px-3 py-1 bg-white rounded border border-gray-300"
          >
            -
          </button>
          <span className="px-3 py-1">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={zoomIn}
            className="px-3 py-1 bg-white rounded border border-gray-300"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-50 flex justify-center p-4">
        <Document
          file={selectedTemplate}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div>Loading PDF...</div>}
          error={<div>Error loading PDF. Please try again.</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};
export default PDFViewer;