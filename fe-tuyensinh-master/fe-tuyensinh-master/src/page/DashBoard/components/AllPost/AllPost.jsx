import { Link } from "react-router-dom";
import axios from "../../../../axios";
import { useEffect, useState } from "react";

export default function AllPost() {
    const [allPost, setAllPost] = useState([]);

    const _fetch = async () => {
        const res = await axios.get("/api/v1/get-all-blogs");

        if (res && res.errCode === 0) {
            setAllPost(res.data);
        }
    };

    useEffect(() => {
        _fetch();
    }, []);

    const handleDeletePost = async (id) => {
        const check = confirm("Bạn xác nhận xóa bài này chứ?");

        if (!check) {
            return;
        }

        const res = await axios.delete(`/api/v1/delete-blog/${id}`);

        if (res && res.errCode === 0) {
            alert("Bạn đã xóa thành công bài viết!");
            _fetch();
        } else {
            alert(res.msg);
        }
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">thumbnail</th>
                        <th scope="col">Tên Bài Viết</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {allPost && allPost.length > 0 ? (
                        allPost.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img
                                        style={{
                                            width: 50,
                                            height: 50,
                                            objectFit: "cover",
                                        }}
                                        src={`http://localhost:8080/files/${item.thumbnail}`}
                                        alt="Hình ảnh"
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td>{item?.typeData?.title}</td>
                                <td>
                                    <button
                                        className="btn btn-primary me-1 mb-1"
                                        style={{
                                            background: "#0d6efd",
                                        }}
                                        onClick={() =>
                                            handleDeletePost(item.id)
                                        }
                                    >
                                        <i className="bi bi-trash2"></i>
                                    </button>
                                    <Link
                                        to={`/admin/handle-post?edit=${item.slug}`}
                                        className="btn btn-primary"
                                        style={{
                                            background: "#0d6efd",
                                        }}
                                    >
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
