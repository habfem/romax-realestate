import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});
console.log(process.env.CLOUD_NAME);
const cloudinaryUploadImg = async (fileToUploads, folder) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileToUploads,
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        `romax/${fileToDelete}`,
        {
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
             console.log(result);
            // Check if the image was successfully deleted
            if (result.result === "ok") {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        }
      );
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { cloudinaryDeleteImg, cloudinaryUploadImg };
