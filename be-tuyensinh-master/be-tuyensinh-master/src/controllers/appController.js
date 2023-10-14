const appServices = require('../services/appServices');

class appController {
    async GetAllBlogs(req, res) {
        try {
            const data = await appServices.GetAllBlogs();

            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async GetBlogByType(req, res) {
        try {
            const data = await appServices.GetBlogByType(req.query.type);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async GetBlogBySlug(req, res) {
        try {
            const data = await appServices.GetBlogBySlug(req.query.slug);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async CreateBlog(req, res) {
        try {
            const data = await appServices.CreateBlog(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async UpdateBlog(req, res) {
        try {
            const data = await appServices.UpdateBlog(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async DeleteBlog(req, res) {
        try {
            const data = await appServices.DeleteBlog(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async Login(req, res) {
        try {
            const data = await appServices.Login(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async Register(req, res) {
        try {
            const data = await appServices.Register(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async UploadFile(req, res) {
        try {
            return res.status(200).json({
                errCode: 0,
                msg: 'ok',
                file: req.file,
            });
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async UngTuyenUngVien(req, res) {
        try {
            const data = await appServices.UngTuyenUngVien(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async GetAllHoSoUngTuyen(req, res) {
        try {
            const data = await appServices.GetAllHoSoUngTuyen(req.query.page, req.query.pageSize);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async UpdateStatusHoSoUngTuyen(req, res) {
        try {
            const data = await appServices.UpdateStatusHoSoUngTuyen(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async GetAllHoSoFilter(req, res) {
        try {
            const data = await appServices.GetAllHoSoFilter(req.query.page, req.query.pageSize, req.query.xt);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async TraCuuThongTin(req, res) {
        try {
            const data = await appServices.TraCuuThongTin(req.query.cccd);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }

    async GetAllCodeByType(req, res) {
        try {
            const data = await appServices.GetAllCodeByType(req.query.type, req.query.status);
            res.status(200).json(data);
        } catch (error) {
            res.status(200).json({
                errCode: -1,
                msg: 'error from server',
                dataErr: `${error}`,
            });
        }
    }
}

module.exports = new appController();
