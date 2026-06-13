import "./Auth.css";
import logo from "./assets/tria-bng-logo.png";

export default function AuthLayout({
  title,
  children,
}) {
  return (
    <div className="auth-page">

      <div className="overlay"></div>

      <div className="auth-card">

        <img
          src={logo}
          alt="TriaNxt"
          className="logo"
        />

        <h2 className="auth-title">
          {title}
        </h2>

        {children}

      </div>

    </div>
  );
}