declare module "pdf.js-controller" {

  class PDFJSController {
    public readonly pdfContainer: Element;
    public readonly pdfDoc: any;
    public pageNum: number;

    constructor(options: {
      container: Element,
      pdfjsDistDir?: string,
    });

    public loadDocument(pdfUrl: string | Uint8Array): Promise<void>;

    public prevPage(): Promise<void>;
    public nextPage(): Promise<void>;
    public renderPage(pageNum: number): Promise<void>;

    public fitItSize(): Promise<void>;
  }

  namespace PDFJSController {
    export enum Events {
      before_pdf_rendering,
      after_pdf_rendering,
    }
  }

  export = PDFJSController;
}
