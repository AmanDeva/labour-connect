const CLOUDINARY_CLOUD_NAME = "dff0a69dr";
const CLOUDINARY_UPLOAD_PRESET = "Labour Profiles"; // Updated to match the exact preset name

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    console.log('Starting image upload to Cloudinary...');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload failed:', errorData);
      throw new Error(errorData.error?.message || 'Failed to upload image');
    }

    const responseData = await response.json();
    console.log('Image upload successful:', responseData.secure_url);
    return responseData.secure_url;
  } catch (error) {
    console.error('Detailed upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};