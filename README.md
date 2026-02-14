# Image Cropper

A lightweight, state-driven React application designed for selecting, cropping, and previewing images using the **HTML5 Canvas API**. This component manages a complete client-side image processing workflow without the need for backend overhead.

## 🚀 Features

- **State-Driven Workflow**: Seamlessly transitions between selection, cropping, and preview modes.
- **Canvas-Based Processing**: Uses the native `drawImage` API to extract precise pixel data.
- **Base64 Export**: Generates a JPEG `dataURL` ready for immediate upload or local display.
- **Interactive UI**: Includes options to re-crop the existing image or start fresh with a new file.

## 🛠️ Architecture & Flow

The application functions as a simple state machine controlled by the `currentPage` state variable.

| State         | View             | Description                                                             |
| :------------ | :--------------- | :---------------------------------------------------------------------- |
| `choose-img`  | **FileInput**    | The entry point where the user selects an image file.                   |
| `crop-img`    | **ImageCropper** | The workspace where the user defines the cropping coordinates.          |
| `img-cropped` | **Preview**      | Displays the final result with options to "Crop again" or "Start Over." |

## ⚙️ Core Logic

The heavy lifting is handled by the `onCropDone` function, which utilizes the browser's native Canvas rendering context to slice the image:

```javascript
// Step 1: Create a hidden canvas
const canvasEl = document.createElement("canvas");
const context = canvasEl.getContext("2d");

// Step 2: Draw only the selected portion of the image
context.drawImage(
  imageObj1,
  imgCroppedArea.x, // Source X
  imgCroppedArea.y, // Source Y
  imgCroppedArea.width, // Source Width
  imgCroppedArea.height, // Source Height
  0,
  0, // Destination X, Y
  imgCroppedArea.width, // Destination Width
  imgCroppedArea.height, // Destination Height
);

// Step 3: Convert to a usable image format
const dataURL = canvasEl.toDataURL("image/jpeg");
```
