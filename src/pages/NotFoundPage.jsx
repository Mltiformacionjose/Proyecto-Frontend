import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="page page--center">
      <h1 className="page__title">404 · Página no encontrada</h1>
      <p className="page__subtitle">La página que buscas no existe.</p>
      <Link to="/" className="about__button">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFoundPage;