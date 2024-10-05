import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique IDs

// Define the storage destination and filename for saving images to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/Events Booking Platform/backend/uploads"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4(); // Generate a unique ID
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // Use the unique ID and the original extension
  },
});

// Set up the multer middleware for file uploads using the disk storage engine
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB (optional)
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed"));
    }
  },
});

export { upload };
