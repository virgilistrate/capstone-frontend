import "../App.css";

const ImageSection = () => {
  return (
    <section className="hero-section">
      <img
        src="public/images/HomeImage.png"
        alt="DriveClick Auto"
        className="hero-img"
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">La tua nuova auto: a pochi click</h1>

        <button
          className="hero-btn"
          onClick={() => (window.location.href = "/Cars")}
        >
          Scopri le auto
        </button>
      </div>
    </section>
  );
};

export default ImageSection;
