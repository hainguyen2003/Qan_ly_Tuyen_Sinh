import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "../../../../axios";
import SauDH from "../../../../assets/imgs/dao-tao-sau-dai-hoc.jpg";
import QuocTE from "../../../../assets/imgs/dao-tao-quoc-te.jpg";
import VB2 from "../../../../assets/imgs/dao-tao-vb2.jpg";

export default function MoreInfo() {
    const [sauDH, setSauDH] = useState([]);
    const [quocTE, setQuocTE] = useState([]);
    const [vb2, setVb2] = useState([]);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const [resDH, resQT, resVB] = await Promise.all([
                    axios.get("/api/v1/get-blog-by-type?type=B1"),
                    axios.get("/api/v1/get-blog-by-type?type=B2"),
                    axios.get("/api/v1/get-blog-by-type?type=B3"),
                ]);

                if (resDH && resQT && resVB) {
                    setSauDH(resDH.data);
                    setQuocTE(resQT.data);
                    setVb2(resVB.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);

    return (
        <div className="py-5 my-1">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="item-more-info">
                            <h3>Đào tạo sau đại học</h3>
                            <hr />
                            <div>
                                <img src={SauDH} alt="Hình ảnh more info" />
                                <ul>
                                    {sauDH && sauDH.length > 0 ? (
                                        sauDH.map((item, index) => (
                                            <li key={index}>
                                                <Link to={`/blog/${item.slug}`}>
                                                    <strong>
                                                        <i className="bi bi-chevron-double-right"></i>
                                                    </strong>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li>Không có dữ liệu</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="item-more-info">
                            <h3>Đào tạo quốc tế</h3>
                            <hr />
                            <div>
                                <img src={QuocTE} alt="Hình ảnh more info" />
                                <ul>
                                    {quocTE && quocTE.length > 0 ? (
                                        quocTE.map((item, index) => (
                                            <li key={index}>
                                                <Link to={`/blog/${item.slug}`}>
                                                    <strong>
                                                        <i className="bi bi-chevron-double-right"></i>
                                                    </strong>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li>Không có dữ liệu</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="item-more-info">
                            <h3>Liên thông - Văn bằng 2</h3>
                            <hr />
                            <div>
                                <img src={VB2} alt="Hình ảnh more info" />
                                <ul>
                                    {vb2 && vb2.length > 0 ? (
                                        vb2.map((item, index) => (
                                            <li key={index}>
                                                <Link to={`/blog/${item.slug}`}>
                                                    <strong>
                                                        <i className="bi bi-chevron-double-right"></i>
                                                    </strong>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li>Không có dữ liệu</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
