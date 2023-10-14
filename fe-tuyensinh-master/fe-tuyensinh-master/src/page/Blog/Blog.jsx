import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "../../axios";
import "./Blog.scss";

export default function Blog() {
    const params = useParams();
    const [blogDetail, setBlogDetail] = useState(null);

    useEffect(() => {
        let slug = params?.slug;

        if (slug) {
            const _fetch = async () => {
                const res = await axios.get(
                    `/api/v1/get-blog-by-slug?slug=${slug}`
                );

                if (res && res.errCode === 0) {
                    setBlogDetail(res.blog);
                }
            };

            _fetch();
        }
    }, [params, params.slug]);

    console.log(blogDetail);

    return (
        <div className="blog-page-wp">
            {blogDetail ? (
                <div className="container">
                    <div className="py-4">
                        <img
                            className="thumb"
                            src={`http://localhost:8080/files/${blogDetail.thumbnail}`}
                            alt="hình ảnh"
                        />
                    </div>
                    <h1>{blogDetail.title}</h1>
                    <hr />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blogDetail.contentHTML,
                        }}
                    ></div>
                    {blogDetail.file ? (
                        <div className="download-file">
                            <a
                                href={`http://localhost:8080/files/${blogDetail.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Tải file {blogDetail.file}
                            </a>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <div>Không có dữ liệu</div>
            )}
        </div>
    );
}
