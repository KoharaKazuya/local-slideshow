export default class DroppableArea {
  public onFileChange: (data: string | Uint8Array) => void;

  constructor() {
    // Check for the various File API support.
    if (!File || !FileReader || !FileList || !Blob) {
      const message = "The File APIs are not fully supported in this browser.";
      alert(message);
      throw new Error(message);
    }

    this.onFileChange = () => console.error("not found onFileChange handler");

    const dropzone = document.querySelector("#dropzone");
    const dropicon = dropzone.querySelector(".drop-here");
    dropzone.addEventListener("dragover", event => {
      event.stopPropagation();
      event.preventDefault();

      dropicon.classList.add("active");

      (event as DragEvent).dataTransfer.dropEffect = "copy";
    }, false);
    dropzone.addEventListener("dragleave", () => {
      dropicon.classList.remove("active");
    });
    dropzone.addEventListener("drop", event => {
      event.stopPropagation();
      event.preventDefault();

      dropzone.classList.remove("active");
      dropzone.classList.add("inactive");

      const dropEvent = event as DragEvent;
      const files = dropEvent.dataTransfer.files;
      if (files.length === 0) { return; }
      const file = files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const buf = new Uint8Array(fileReader.result);
        this.onFileChange(buf);
      };
      fileReader.readAsArrayBuffer(file);
    }, false);

    dropzone.classList.remove("inactive");
    dropzone.classList.add("active");
  }
}
