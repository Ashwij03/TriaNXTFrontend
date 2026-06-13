import "./KPICard.css";

function KPICard({
  title,
  value,
  subtitle,
  icon,
  onClick
}) {

  return (

    <div
      className="enterprise-kpi"
      onClick={onClick}
    >

      <div className="enterprise-kpi-icon">

        {icon}

      </div>

      <div className="enterprise-kpi-content">

        <div className="enterprise-kpi-title">

          {title}

        </div>

        <div className="enterprise-kpi-value">

          {value}

        </div>

        <div className="enterprise-kpi-sub">

          {subtitle}

        </div>

      </div>

    </div>

  );
}

export default KPICard;