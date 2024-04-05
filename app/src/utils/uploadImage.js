const pdf2pic = require('pdf2pic');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dpudxiylo',
  api_key: '111114412369599',
  api_secret: 'Xbm76aB7RWoNVodk6fm4oW-GJgQ'
});

// Function to convert PDF to image and upload to Cloudinary
async function convertAndUploadToCloudinary(pdfFilePath) {
  try {
    // Convert PDF to image using pdf2pic
    const converter = new pdf2pic({
      density: 150,           // Output image density
      savename: 'output',     // Output image name
      savedir: __dirname      // Output directory
    });
    const convertedImages = await converter.convert(pdfFilePath);

    // Upload images to Cloudinary
    const uploadResults = await Promise.all(
      convertedImages.map(imagePath => cloudinary.uploader.upload(imagePath))
    );

    // Extract URLs from upload results
    const imageUrls = uploadResults.map(result => result.secure_url);

    return imageUrls;
  } catch (error) {
    console.error('Error converting and uploading to Cloudinary:', error);
    throw error;
  }
}

// Usage example
const pdfFilePath = '/path/to/your/pdf/file.pdf';
convertAndUploadToCloudinary(pdfFilePath)
  .then(imageUrls => {
    console.log('Uploaded image URLs:', imageUrls);
  })
  .catch(error => {
    console.error('Failed to convert and upload to Cloudinary:', error);
  }
);
