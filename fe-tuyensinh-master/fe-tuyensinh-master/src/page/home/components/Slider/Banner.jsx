import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import BannerOne from "../../../../assets/imgs/banner-one.jpg";
import { router } from "../../../../utils/constant";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function Banner() {
    return (
        <div>
            <Slider {...settings}>
                <div className="item-banner-wp">
                    <div className="content-banner">
                        <div>
                            <h1>THÔNG BÁO TUYỂN SINH ĐẠI HỌC 2023</h1>
                            <div>
                                <Link to={router.ungTuyen}>Đăng ký ngay</Link>
                                <Link to="/blog/thong-bao-tuyen-sinh-dai-hoc-he-chinh-quy-nam-20236a3e40ea-60ab-4f5e-99cf-9a2e1354ef37">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img src={BannerOne} alt="Hình ảnh banner" />
                </div>
            </Slider>
        </div>
    );
}
