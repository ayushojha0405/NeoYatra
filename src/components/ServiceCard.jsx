import "./ServiceCard.css";

export default function ServiceCard({ icon, title, description, style }) {
  return (
    <div className="service-card glass-panel" style={style}>
      <div className="service-icon">{icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
    </div>
  );
}
