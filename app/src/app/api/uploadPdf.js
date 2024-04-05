import cloudinary from 'cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Configure Cloudinary
      cloudinary.v2.config({
        cloud_name: 'dpudxiylo',
        api_key: '111114412369599',
        api_secret: 'Xbm76aB7RWoNVodk6fm4oW-GJgQ'
      });

      // Extract PDF data from request body
      const { file, upload_preset } = req.body;

      // Upload PDF to Cloudinary
      const result = await cloudinary.v2.uploader.upload(file, {
        upload_preset: upload_preset
      });

      // Return Cloudinary URL of the uploaded file
      res.status(200).json({ secure_url: result.secure_url });
    } catch (error) {
      console.error('Error uploading PDF to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload PDF to Cloudinary' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
