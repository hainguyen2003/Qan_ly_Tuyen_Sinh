import { Link } from "react-router-dom";
import { router } from "../../../../utils/constant";

export default function SideBar() {
    return (
        <div className="sidebar-wp">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a
                    href="/"
                    className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                >
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul
                    className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu"
                >
                    <li className="nav-item">
                        <a href="#" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">
                                Home
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#submenu1"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 align-middle"
                        >
                            <i className="fs-4 bi-speedometer2"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">
                                Bài Viết
                            </span>
                        </a>
                        <ul
                            className="collapse show nav flex-column ms-1"
                            id="submenu1"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/admin/handle-post"
                                    className="nav-link px-0"
                                >
                                    <span className="d-none d-sm-inline">
                                        Thêm bài Viết
                                    </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link
                                    to={`/admin${router.admin.allPost}`}
                                    className="nav-link px-0"
                                >
                                    <span className="d-none d-sm-inline">
                                        Tất cả bài viết
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-table"></i>{" "}
                            <span className="ms-1 d-none d-sm-inline">
                                Ứng Tuyển
                            </span>
                        </a>
                        <ul
                            className="collapse show nav flex-column ms-1"
                            id="submenu1"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/admin/tuyen-sinh"
                                    className="nav-link px-0"
                                >
                                    <span className="d-none d-sm-inline">
                                        Quản lí người ứng tuyển
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
