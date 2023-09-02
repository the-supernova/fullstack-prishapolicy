import axios from "axios";

export const uploadToCloudinary = async (file: File, type: string) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'bookData');

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxkgx5g5i/${type}/upload`,
        data
      );

    if (!response.data) {
        throw new Error('Something went wrong while uploading the image');
    }

    return response.data.secure_url;
}
