import { useEffect, useState } from "react";

import axios from "../../../../axios";
import { Link } from "react-router-dom";

export default function TuyenSinh() {
    const [data, setData] = useState([]);
    const [metaData, setMetaData] = useState(null);
    const [dataFilter, setDataFilter] = useState("");
    const [keHoach, setKeHoach] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [allStatus, setAllStatus] = useState([]);

    useEffect(() => {
        const _fetch = async () => {
            const [res, resAllStatus] = await Promise.all([
                axios.get("/api/v1/get-all-code-by-type?type=xt"),
                axios.get("/api/v1/get-all-code-by-type?type=status"),
            ]);

            if (res && res.errCode === 0) {
                setKeHoach(res.data);
                const activeKeHoach = res.data.find(
                    (item) => item.status === "true"
                );

                setDataFilter(activeKeHoach?.keyMap);
            }

            if (resAllStatus && resAllStatus.errCode === 0) {
                setAllStatus(resAllStatus.data);
            }
        };

        _fetch();
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const ResAllHoSo = await axios.get(
                `/api/v1/get-all-ho-so-filter?page=${currentPage}&pageSize=10&xt=${dataFilter}`
            );

            if (ResAllHoSo && ResAllHoSo.errCode === 0) {
                setData(ResAllHoSo.data);
                setMetaData(ResAllHoSo.meta);
            }
        };

        fetchAPI();
    }, [currentPage, dataFilter]);

    const handleChangeStatus = async (e, id) => {
        const check = confirm(
            "Bạn chắc chắn muốn chuyển đổi trạng thái cho hồ sơ này?"
        );

        if (!check) {
            return;
        }

        let data = {
            id,
            status: e.target.value,
        };

        const res = await axios.put("/api/v1/update-status-ho-so", data);

        if (res && res.errCode === 0) {
            window.location.reload();
        } else {
            alert(res.msg);
        }
    };

    const handleClickNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="tuyen-sinh-wp">
            <h2 className="text-center">Tuyển Sinh</h2>
            <div
                className="my-3 mt-4"
                style={{
                    width: "50%",
                }}
            >
                <select
                    className="form-control"
                    value={dataFilter}
                    onChange={(e) => setDataFilter(e.target.value)}
                >
                    {keHoach &&
                        keHoach.length > 0 &&
                        keHoach.map((item) => (
                            <option key={item.keyMap} value={item.keyMap}>
                                {item.title}
                            </option>
                        ))}
                </select>
            </div>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Họ Và Tên</th>
                            <th scope="col">Ngày Sinh</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">CCCD</th>
                            <th scope="col">File</th>
                            <th scope="col">Kế Hoạch</th>
                            <th scope="col">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.fullName}</td>
                                    <td>{item.birthDay}</td>
                                    <td>{item.address}</td>
                                    <td>{item.cccd}</td>
                                    <td>
                                        <Link
                                            target="_blank"
                                            to={`http://localhost:8080/files/${item.file}`}
                                        >
                                            Tải file tại đây
                                        </Link>
                                    </td>
                                    <td>{item.keHoachData.title}</td>
                                    <td className="col-2">
                                        <select
                                            onChange={(e) =>
                                                handleChangeStatus(e, item.id)
                                            }
                                            style={{
                                                width: "100%",
                                            }}
                                            className="form-control"
                                            value={item.status}
                                        >
                                            {allStatus &&
                                                allStatus.length > 0 &&
                                                allStatus.map((item) => (
                                                    <option
                                                        key={item.keyMap}
                                                        value={item.keyMap}
                                                    >
                                                        {item.title}
                                                    </option>
                                                ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {metaData && currentPage < metaData.totalPage && (
                    <div className="my-3 d-flex justify-content-center">
                        <button
                            onClick={handleClickNextPage}
                            className="btn btn-primary"
                        >
                            Xem Thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
