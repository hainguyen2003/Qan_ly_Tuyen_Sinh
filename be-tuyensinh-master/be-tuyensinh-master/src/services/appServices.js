const slug = require('slug');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const db = require('../models');
const findAndPaginate = require('../helpers/Paginate');

const saltRounds = 10;

class appService {
    GetAllBlogs() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.Blog.findAll({
                    include: [
                        {
                            model: db.Allcode,
                            as: 'typeData',
                        },
                    ],
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    data,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    GetBlogByType(type) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required type',
                    });
                }

                const data = await db.Blog.findAll({
                    where: {
                        type,
                    },
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    data,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    GetBlogBySlug(slug) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!slug) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required slug',
                    });
                }

                const blog = await db.Blog.findOne({
                    where: {
                        slug,
                    },
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    blog,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    CreateBlog(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.title ||
                    !data.thumbnail ||
                    !data.title ||
                    !data.type ||
                    !data.contentHTML ||
                    !data.contentMarkdown
                ) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                let slugBlog = slug(data.title) + uuidv4();

                const blogCreated = await db.Blog.create({
                    title: data.title,
                    thumbnail: data.thumbnail,
                    title: data.title,
                    type: data.type,
                    file: data.file,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    slug: slugBlog,
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    blogCreated,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    UpdateBlog(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.title ||
                    !data.thumbnail ||
                    !data.title ||
                    !data.type ||
                    !data.contentHTML ||
                    !data.contentMarkdown ||
                    !data.slug
                ) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                let newSlug = data.slug;

                const blogUpdated = await db.Blog.update(
                    {
                        title: data.title,
                        thumbnail: data.thumbnail,
                        title: data.title,
                        type: data.type,
                        file: data.file,
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        slug: newSlug,
                    },
                    {
                        where: {
                            slug: data.slug,
                        },
                    },
                );

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    blogUpdated,
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    DeleteBlog(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const blogDeleted = await db.Blog.destroy({
                    where: {
                        id,
                    },
                });
                resolve({
                    errCode: 0,
                    msg: 'ok',
                    blogDeleted,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    Login(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email || !data.password) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                console.log(data);

                const user = await db.User.findOne({
                    where: {
                        email: data.email,
                    },
                });

                if (!user) {
                    return resolve({
                        errCode: 1,
                        msg: 'Email của bạn không tồn tại trong hệ thống!',
                    });
                }

                const isMatch = await bcrypt.compare(data.password, user.password);

                if (isMatch) {
                    const NewUser = { ...user.toJSON() };

                    delete NewUser.password;

                    return resolve({
                        errCode: 0,
                        msg: 'ok',
                        user: NewUser,
                    });
                } else {
                    return resolve({
                        errCode: 1,
                        msg: 'Mật khẩu không đúng!',
                    });
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    Register(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.firstName || !data.lastName || !data.email || !data.password) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameters',
                    });
                }

                const checkEmailExists = await db.User.findOne({
                    where: {
                        email: data.email,
                    },
                });

                if (checkEmailExists) {
                    return resolve({
                        errCode: 1,
                        msg: 'Email đã tồn tại',
                    });
                }

                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(data.password, salt);

                const user = await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hash,
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    user,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    UngTuyenUngVien(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.fullName || !data.birthDay || !data.address || !data.keHoach || !data.file || !data.cccd) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameters',
                    });
                }

                const checkUngTuyenExits = await db.UngTuyen.findOne({
                    where: {
                        fullName: data.fullName,
                        keHoach: data.keHoach,
                        cccd: data.cccd,
                    },
                });

                if (checkUngTuyenExits) {
                    return resolve({
                        errCode: 1,
                        msg: 'Bạn đã ứng tuyển trong thời gian này vui lòng chờ kết quả hoặc tra cứu!',
                    });
                }

                const hoSoUngTuyen = await db.UngTuyen.create({
                    fullName: data.fullName,
                    birthDay: data.birthDay,
                    address: data.address,
                    keHoach: data.keHoach,
                    status: 'S1',
                    file: data.file,
                    note: data.note,
                    cccd: data.cccd,
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    hoSoUngTuyen,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    /* page , pageSize : phát triển tính năng phân trang  */
    GetAllHoSoUngTuyen(page = 1, pageSize = 10) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data, totalPage } = await findAndPaginate(db.UngTuyen, page, pageSize, {
                    include: [
                        {
                            model: db.Allcode,
                            as: 'keHoachData',
                        },
                    ],
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    data,
                    meta: {
                        currentPage: +page,
                        pageSize: +pageSize,
                        totalPage,
                    },
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    /* page , pageSize : phát triển tính năng phân trang  */
    GetAllHoSoFilter(page = 1, pageSize = 10, xt) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!xt) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameter',
                    });
                }

                const { data, totalPage } = await findAndPaginate(db.UngTuyen, page, pageSize, {
                    where: {
                        keHoach: xt,
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'keHoachData',
                        },
                    ],
                });

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    data,
                    meta: {
                        currentPage: +page,
                        pageSize: +pageSize,
                        totalPage,
                    },
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    UpdateStatusHoSoUngTuyen(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.status || !data.id) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameters',
                    });
                }

                const hoSoUngTuyen = await db.UngTuyen.update(
                    {
                        status: data.status,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    },
                );

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    hoSoUngTuyen,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    TraCuuThongTin(cccd) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!cccd) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameter',
                    });
                }

                const hoSo = await db.UngTuyen.findOne({
                    where: {
                        cccd: cccd,
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'statusData',
                        },
                        {
                            model: db.Allcode,
                            as: 'keHoachData',
                        },
                    ],
                });

                if (!hoSo) {
                    return resolve({
                        errCode: 1,
                        msg: 'Không tìm thấy thông tin',
                    });
                } else {
                    return resolve({
                        errCode: 0,
                        msg: 'ok',
                        hoSo,
                    });
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    GetAllCodeByType(type, status = 'null') {
        return new Promise(async (resolve, reject) => {
            try {
                if (!type) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameter',
                    });
                }

                let data;

                if (status === 'null') {
                    data = await db.Allcode.findAll({
                        where: {
                            type: type,
                        },
                    });
                } else {
                    data = await db.Allcode.findAll({
                        where: {
                            type: type,
                            status: status,
                        },
                    });
                }

                resolve({
                    errCode: 0,
                    msg: 'ok',
                    data,
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}

module.exports = new appService();
