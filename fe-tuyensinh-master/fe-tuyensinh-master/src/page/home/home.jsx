import { useEffect } from "react";

import Banner from "./components/Slider/Banner";
import "./home.scss";
import Blog from "./components/Blogs/Blog";
import Train from "./components/Train/Train";
import MoreInfo from "./components/MoreInfo/MoreInfo";

export default function Home() {
    useEffect(() => {
        document.title = "Trang Chủ";
    }, []);

    return (
        <div className="home-page-wp">
            {/* Banner giới thiệu */}
            <Banner />

            {/* Danh sách bài viết */}
            <Blog />

            {/* Các nghành đào tạo */}
            <Train />

            {/* Thông tin thêm như đào tạo các ngành sau đại học.... */}
            <MoreInfo />
        </div>
    );
}
