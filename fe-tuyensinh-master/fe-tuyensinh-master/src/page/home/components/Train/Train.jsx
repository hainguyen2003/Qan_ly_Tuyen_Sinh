import { Link } from "react-router-dom";

export default function Train() {
    return (
        <div className="train-wp">
            <div className="container">
                <h2>CÁC NGÀNH NGHỀ ĐÀO TẠO</h2>
                <p>
                    Với đội ngũ giảng dạy có trình độ cao và giàu kinh nghiệm,
                    Trường Đại học Công nghệ Giao thông vận tải đào tạo 29
                    chuyên ngành thuộc 4 khối ngành Công trình xây dựng, Cơ khí,
                    Kinh tế vận tải và Công nghệ thông tin, điện tử viễn thông
                </p>
                <div className="row train-wp-item">
                    <div className="col-3">
                        <Link to="/blog/nghanh-cong-trinhcffd47eb-32e1-4fdc-afe0-c248060bf27d">
                            <div>
                                <i className="bi bi-terminal"></i>
                                <p>Nghành công trình</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link to="/blog/nganh-co-khi58982c95-a6e5-4960-9852-52b102ab1718">
                            <div>
                                <i className="bi bi-textarea"></i>
                                <p>Ngành cơ khí</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link to="/blog/nganh-kinh-te2ce8532f-30c3-43bc-80ea-d433e4469e53">
                            <div>
                                <i className="bi bi-ticket"></i>
                                <p>Nghành công trình</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link to="/blog/cong-nghe-thong-tin021faa5d-c2b9-4c72-ae54-626fe1fb0d9b">
                            <div>
                                <i className="bi bi-transparency"></i>
                                <p>Nghành công nghệ thông tin</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
