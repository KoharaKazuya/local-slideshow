import PDFController = require("pdf.js-controller");
import DroppableArea from "./droppable";

export function bootstrap(): PDFController {
  const slides = document.querySelector("#slides");
  const nav = document.querySelector("#bottom-nav");
  const controller = new PDFController({
    container: slides,
    pdfjsDistDir: "/pdfjs-dist/",
  });
  const droppable = new DroppableArea();
  droppable.onFileChange = (data: Uint8Array) => {
    controller.loadDocument(data)
      .then(() => {
        window.addEventListener("resize", () => controller.fitItSize());
        controller.fitItSize();

        document.onkeydown = event => {
          if (event.shiftKey || event.ctrlKey || event.metaKey) {
              return;
          }

          const code = event.keyCode;
          if (code === 37 || code === 38) {  // LEFT, UP
            event.preventDefault();
            controller.prevPage();
          } else if (code === 39 || code === 40) {  // RIGHT, DOWN
            event.preventDefault();
            controller.nextPage();
          }
        };
      })
      ;
  };

  slides.classList.remove("inactive");
  slides.classList.add("active");
  nav.classList.remove("inactive");
  nav.classList.add("active");

  return controller;
}
