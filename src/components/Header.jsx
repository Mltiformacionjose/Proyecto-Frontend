import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        🏰 DisneyVerse
      </Link>
      <nav className="header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          Personajes
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          Sobre mí
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;