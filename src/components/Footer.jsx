const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <p>© {currentYear} DisneyVerse · Creado con React + Axios</p>
      <p>
        Datos de la{" "}
        <a href="https://disneyapi.dev" target="_blank" rel="noreferrer">
          Disney API
        </a>
      </p>
    </footer>
  );
}

export default Footer;