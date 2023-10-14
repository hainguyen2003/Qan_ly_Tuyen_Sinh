const paginate = (query, { page, pageSize }) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return {
        ...query,
        offset: Number(offset),
        limit: Number(limit),
    };
};

const findAndPaginate = async (model, page, pageSize, query) => {
    const result = await model.findAndCountAll(paginate(query, { page, pageSize }));

    const { count } = result;
    const totalPage = Math.ceil(count / pageSize);

    return {
        data: result.rows,
        totalPage,
    };
};

module.exports = findAndPaginate;
