import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { Link } from "react-router-dom";

export default function Blog() {
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        const _fetch = async () => {
            const res = await axios.get("/api/v1/get-blog-by-type?type=B4");

            if (res && res.errCode === 0) {
                setBlogs(res.data);
            }
        };

        _fetch();
    }, []);

    return (
        <div>
            <div className="blog-home-wp">
                <div className="container">
                    <h2>TUYỂN SINH ĐẠI HỌC</h2>
                    <div className="row mt-3">
                        {blogs && blogs.length > 0 ? (
                            blogs.map((item, index) => (
                                <div className="col-4 mb-5" key={index}>
                                    <Link to={`/blog/${item.slug}`}>
                                        <div className="item-blog">
                                            <img
                                                src={`http://localhost:8080/files/${item.thumbnail}`}
                                                alt="Hình ảnh bài viết"
                                            />
                                            <h3>{item.title}</h3>
                                            <div className="overlay">
                                                <button>
                                                    <i className="bi bi-link-45deg"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div>
                                <h4>Không có bài viết nào</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
