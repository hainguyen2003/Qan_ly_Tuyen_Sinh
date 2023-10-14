const route = require('express').Router();
const multer = require('multer');
const appController = require('../controllers/appController');
const path = require('path');

const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('./src/', 'public/files'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    },
});

// store upload files
const uploadFile = multer({ storage: storageFile });

function appRouter(app) {
    // blogs
    route.get('/get-all-blogs', appController.GetAllBlogs);
    route.get('/get-blog-by-type', appController.GetBlogByType);
    route.get('/get-blog-by-slug', appController.GetBlogBySlug);
    route.post('/create-blog', appController.CreateBlog);
    route.put('/update-blog', appController.UpdateBlog);
    route.delete('/delete-blog/:id', appController.DeleteBlog);

    // auth
    route.post('/login', appController.Login);
    route.post('/register', appController.Register);

    // upload
    route.post('/upload-file', uploadFile.single('filesUploaded'), appController.UploadFile);

    // ung Tuyen
    route.post('/ung-tuyen-ung-vien', appController.UngTuyenUngVien);
    route.get('/get-all-ho-so-ung-tuyen', appController.GetAllHoSoUngTuyen);
    route.put('/update-status-ho-so', appController.UpdateStatusHoSoUngTuyen);
    route.get('/get-all-ho-so-filter', appController.GetAllHoSoFilter);
    route.get('/tra-cuu-thong-tin', appController.TraCuuThongTin);

    // api làm việc với bảng ALl Code trong SQL
    route.get('/get-all-code-by-type', appController.GetAllCodeByType);

    app.use('/api/v1', route);
}

module.exports = appRouter;
