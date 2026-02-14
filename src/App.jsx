import { useState } from "react";
import FileInput from "./components/FileInput";
import ImageCropper from "./components/ImageCropper";

const App = () => {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEl = document.createElement("canvas");
    canvasEl.width = imgCroppedArea.width;
    canvasEl.height = imgCroppedArea.height;

    const context = canvasEl.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = () => {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height,
      );

      const dataURL = canvasEl.toDataURL("image/jpeg");

      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <div className="container">
      {currentPage === "choose-img" ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentPage === "crop-img" ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div>
          <div>
            <img src={imgAfterCrop} className="cropped-img" />
          </div>

          <button
            onClick={() => {
              setCurrentPage("crop-img");
            }}
            className="btn"
          >
            Crop
          </button>

          <button
            onClick={() => {
              setCurrentPage("choose-img");
              setImage("");
            }}
            className="btn"
          >
            New Image
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
