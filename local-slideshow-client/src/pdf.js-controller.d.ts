declare module 'pdf.js-controller' {

  class PDFJSController {
    pdfContainer: Element;
    pdfDoc: any;

    constructor(options: {
      container: Element,
      pdfjsDistDir: string,
    });

    loadDocument(pdfUrl: string | Uint8Array): Promise<void>;

    prevPage(): Promise<void>;
    nextPage(): Promise<void>;

    fitItSize(): Promise<void>;
  }

  module PDFJSController {
    export enum Events {
      before_pdf_rendering,
      after_pdf_rendering,
    }
  }

  export = PDFJSController;
}
