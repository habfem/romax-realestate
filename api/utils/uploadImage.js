import multer from "multer";
import {cloudinaryUploadImg} from "../config/cloudinary.js"


const storage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const Multer = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 5000000 },
});

const uploadImages = async (req, res, next) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "romax");
    const urls = [];

    if (Array.isArray(req.files)) {
      // Multiple files
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
      }
    } else if (req.file) {
      // Single file
      const { path } = req.file;
      const newpath = await uploader(path);
      urls.push(newpath);
    }

    const images = urls.map((file) => {
      return file;
    });
    req.images = images;
    next();
  } catch (error) {
    res.status(500).json({message: "Something went wrong, Please try again!"});
  }
};
 

export {
  Multer,
  uploadImages
};