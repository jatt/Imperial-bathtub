import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="section">
      <div className="container empty-state">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for is not available.</p>

        <Link className="btn btn--primary mt-6" to="/">
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;