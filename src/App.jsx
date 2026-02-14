import { useState } from "react";
import FileInput from "./components/FileInput";

const App = () => {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

  const onCropDone = (imgCroppedArea) => {};

  const onCropCancel = () => {};

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
        <div></div>
      )}
    </div>
  );
};

export default App;
