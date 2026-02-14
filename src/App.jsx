import { useState } from "react";
import FileInput from "./components/FileInput";

const App = () => {
  const [image, setImage] = useState("");

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
  };

  return (
    <div className="container">
      <FileInput onImageSelected={onImageSelected} />
      <div>{image}</div>
    </div>
  );
};

export default App;
