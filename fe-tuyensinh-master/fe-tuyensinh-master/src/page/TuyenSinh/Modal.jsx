/* eslint-disable react/prop-types */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalTraCuu({ toggle, isOpen, data, ...args }) {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} {...args} size="lg">
                <ModalHeader toggle={toggle}>
                    Thông tin ứng tuyển của bạn...
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Họ Và Tên Của Bạn
                            </label>
                            <input
                                className="form-control"
                                id="fullName"
                                placeholder={data.fullName}
                                disabled
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="date-birth" className="form-label">
                                Ngày Sinh
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="date-birth"
                                placeholder={data.birthDay}
                                disabled
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="address" className="form-label">
                                Địa Chỉ
                            </label>
                            <input
                                className="form-control"
                                id="address"
                                placeholder={data.address}
                                disabled
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label">Kế Hoạch</label>
                            <input
                                className="form-control"
                                id="address"
                                placeholder={data?.keHoachData?.title}
                                disabled
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label" htmlFor="cccd">
                                Số Căn Cước Công Dân
                            </label>
                            <input
                                required
                                className="form-control"
                                id="cccd"
                                placeholder={data.cccd}
                                disabled
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label">
                                File Đính Kèm (VD: Học Bạ)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={data.file}
                                disabled
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label" htmlFor="cccd">
                                Ghi chú
                            </label>
                            <textarea
                                className="form-control"
                                id="cccd"
                                placeholder={data.note || "Không có"}
                                disabled
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label" htmlFor="cccd">
                                Trạng Thái Kết Quả
                            </label>
                            <div className="trang-thai-ket-qua">
                                <li>{data?.statusData?.title}</li>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalTraCuu;
