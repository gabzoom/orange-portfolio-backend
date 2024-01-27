import multer from "multer";
import { extname } from 'path';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'D:/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + extname(file.originalname));
    }
});

const upload = multer({ storage: storage});

export default upload;