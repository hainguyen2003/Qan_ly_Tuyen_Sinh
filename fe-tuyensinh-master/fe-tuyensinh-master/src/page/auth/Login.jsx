import { useEffect, useState } from "react";
import axios from "../../axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "Đăng Nhập Tài Khoản Của Bạn";
        const isLoginIn = JSON.parse(localStorage.getItem("isLoginIn"));

        if (isLoginIn) {
            window.location.href = "/";
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };

        if (!data.email || !data.password) {
            alert("Bạn hãy nhập đủ các trường!");
            return;
        }

        const Res = await axios.post("/api/v1/login", data);

        if (Res && Res.errCode === 0) {
            localStorage.setItem("isLoginIn", JSON.stringify(true));
            localStorage.setItem("user", JSON.stringify(Res.user));
            window.location.href = "/";
        } else {
            alert(Res.msg);
        }
    };

    return (
        <div
            className="login-wp"
            style={{
                minHeight: "60vh",
            }}
        >
            <div className="container py-5">
                <h1 className="h2 pb-2">Đăng Nhập Tài Khoản Của Bạn</h1>
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email-address" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email-address"
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Nhập mật khẩu của bạn"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
}
