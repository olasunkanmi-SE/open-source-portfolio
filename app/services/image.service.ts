import { v2 as cloudinary, UploadApiResponse, UploadApiOptions, ResourceApiOptions } from "cloudinary";

class CloudinaryService {
  constructor() {
    cloudinary.config({
      secure: true,
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }
  private async uploadImage(imagePath: string): Promise<UploadApiResponse | undefined> {
    const options: UploadApiOptions = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(imagePath, options);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async getAssetInfo(publicId: string): Promise<string[][] | undefined> {
    const options: ResourceApiOptions = {
      colors: true,
    };

    try {
      const result = await cloudinary.api.resource(publicId, options);
      console.log(result);
      return result.colors;
    } catch (error) {
      console.error(error);
    }
  }

  createImageTag(publicId: string, ...colors: string[]): string {
    const [effectColor, backgroundColor] = colors;

    const imageTag = cloudinary.image(publicId, {
      transformation: [
        { width: 250, height: 250, gravity: "faces", crop: "thumb" },
        { radius: "max" },
        { effect: "outline:10", color: effectColor },
        { background: backgroundColor },
      ],
    });

    return imageTag;
  }

  async main() {
    const imagePath = "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";

    const response = await this.uploadImage(imagePath);
    console.log(response);
    if (!response) {
      console.error("Failed to upload image.");
      return;
    }

    const colors = await this.getAssetInfo(response.public_id);
    console.log(colors);

    if (!colors) {
      console.error("Failed to get asset info.");
      return;
    }

    const imageTag = this.createImageTag(response.publicId, colors[0][0], colors[1][0]);

    console.log(imageTag);
  }
}

const cloudinaryService = new CloudinaryService();
cloudinaryService.main();
