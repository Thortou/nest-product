// src/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './src/img',
    filename: (req, file, callback) => {
      const currentDate = new Date();
      const curdate = currentDate.getFullYear();
      function generateName(): string {
        const characters = 'Bb13N';
        let randomName = '';
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomName += characters.charAt(randomIndex);
        }
        return randomName;
      }
      const randomName = generateName();
      const extension = extname(file.originalname);
      callback(null, `banner-${curdate}-${randomName}${extension}`);
     
    },
  }),
  fileFilter: (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|tif|tiff|webp|ico|svg|heif|heic)$/i)) {
      return cb(null, false)
    }
    cb(null, true)
  }
};


