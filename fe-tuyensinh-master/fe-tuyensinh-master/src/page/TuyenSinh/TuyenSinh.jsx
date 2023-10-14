import { useEffect, useState } from "react";

import axios from "../../axios";
import "./TuyenSinh.scss";
import ModalTraCuu from "./Modal";

export default function TuyenSinh() {
    const [fullName, setFullName] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [address, setAddress] = useState("");
    const [keHoach, setKeHoach] = useState("");
    const [file, setFile] = useState("");
    const [note, setNote] = useState("");
    const [cccd, setCCCD] = useState("");

    const [keHoachActive, setKeHoachActive] = useState([]);
    const [search, setSearch] = useState("");
    const [textSearchDeounce, setTextSearchDeounce] = useState("");
    const [result, setResult] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const _fetch = async () => {
            const Res = await axios.get(
                "/api/v1/get-all-code-by-type?type=xt&status=true"
            );

            if (Res && Res.errCode === 0) {
                setKeHoachActive(Res.data);
                setKeHoach(Res.data[0].keyMap);
            }
        };

        _fetch();
    }, []);

    // debounce value
    useEffect(() => {
        const id = setTimeout(() => {
            setTextSearchDeounce(search);
        }, 700);

        return () => {
            clearTimeout(id);
        };
    }, [search]);

    useEffect(() => {
        if (textSearchDeounce.length === 0) {
            setResult(null);
        } else {
            const _fetch = async () => {
                const Res = await axios.get(
                    `/api/v1/tra-cuu-thong-tin?cccd=${textSearchDeounce}`
                );

                if (Res && Res.errCode === 0) {
                    setResult(Res.hoSo);
                } else {
                    alert(Res.msg);
                }
            };

            _fetch();
        }
    }, [textSearchDeounce]);

    const handleChangeFile = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const ResImage = await axios.post(
                "/api/v1/upload-file",
                {
                    filesUploaded: file,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (ResImage && ResImage.errCode === 0) {
                setFile(ResImage.file?.filename);
            }
        }
    };

    const validate = () => {
        const arr = [fullName, birthDay, address, keHoach, cccd, file];
        let isValid = true;

        for (let i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const check = validate();

        if (!check) {
            alert("Vui lòng nhập đầy đủ các trường!");
            return;
        }

        const dataBuild = {
            fullName,
            birthDay,
            address,
            keHoach,
            file,
            note,
            cccd,
        };

        const Res = await axios.post("/api/v1/ung-tuyen-ung-vien", dataBuild);

        if (Res && Res.errCode === 0) {
            alert("Bạn đã ứng tuyển thành công!");
            window.location.reload();
        } else {
            alert(Res.msg);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="tuyen-sinh-page-wp">
                <div className="banner-tuyen-sinh">
                    <div className="tra-cuu-wp">
                        <div className="tra-cuu">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tra cứu hồ sơ của bạn ( Số CCCD )... "
                            />
                            {result && (
                                <ul className="render-result">
                                    <li onClick={handleToggle}>
                                        {result.fullName}
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="dang-ky mt-4 mb-4 container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <label
                                    htmlFor="fullName"
                                    className="form-label"
                                >
                                    Họ Và Tên Của Bạn
                                </label>
                                <input
                                    required
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="form-control"
                                    id="fullName"
                                    placeholder="Họ Và Tên..."
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label
                                    htmlFor="date-birth"
                                    className="form-label"
                                >
                                    Ngày Sinh
                                </label>
                                <input
                                    required
                                    value={birthDay}
                                    onChange={(e) =>
                                        setBirthDay(e.target.value)
                                    }
                                    type="date"
                                    className="form-control"
                                    id="date-birth"
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="address" className="form-label">
                                    Địa Chỉ
                                </label>
                                <input
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    id="address"
                                    placeholder="Địa chỉ của bạn..."
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">Kế Hoạch</label>
                                <select className="form-control">
                                    {keHoachActive &&
                                        keHoachActive.length > 0 &&
                                        keHoachActive.map((item, index) => (
                                            <option key={index} value={keHoach}>
                                                {item.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label" htmlFor="cccd">
                                    Số Căn Cước Công Dân
                                </label>
                                <input
                                    required
                                    value={cccd}
                                    onChange={(e) => setCCCD(e.target.value)}
                                    className="form-control"
                                    id="cccd"
                                    placeholder="Nhập căn cước công dân của bạn..."
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label">
                                    File Đính Kèm (VD: Học Bạ)
                                </label>
                                <input
                                    onChange={handleChangeFile}
                                    type="file"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <label className="form-label" htmlFor="cccd">
                                    Ghi chú
                                </label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="form-control"
                                    id="cccd"
                                    placeholder="Nhập ghi chú của bạn gửi đến nhà tuyển dụng...."
                                />
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary ms-auto d-block">
                                    Gửi Hồ Sơ
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* modal */}
            {isOpen && result && (
                <ModalTraCuu
                    isOpen={isOpen}
                    toggle={handleToggle}
                    data={result}
                />
            )}
        </>
    );
}
