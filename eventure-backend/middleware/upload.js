import multer from "multer";
import path from "path";

// Store files in "uploads/" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Optional: file filter (only images)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
