import cloudinary from ('cloudinary').v2;

export const config = () => {
  return cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
};
export const upload = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, { folder });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.log(error);
  }
};