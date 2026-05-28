const StatsBar = ({ items }) => {
  return (
    <section className="stats-bar">
      <div className="container stats-bar__grid">
        {items.map((item) => (
          <div className="stats-bar__item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;