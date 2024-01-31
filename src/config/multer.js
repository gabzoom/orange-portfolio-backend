import multer from "multer";
import { extname } from 'path';

//aqui faz a inserção da imagem na pasta upload esse método passa o path

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "src/uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + extname(file.originalname));
    }
});

const upload = multer({ storage: storage});

export default upload;