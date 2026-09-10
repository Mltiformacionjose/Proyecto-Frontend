const services = [
  "Diseño web responsive",
  "Landing pages",
  "Aplicaciones con React",
  "Consumo e integración de APIs",
  "Optimización de rendimiento",
];

const technologies = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git"];

function AboutPage() {
  return (
    <section className="page">
      <h1 className="page__title">Hola, soy tu desarrollador web freelance</h1>
      <p className="page__subtitle">
        Creo webs modernas, rápidas y a medida para tu proyecto.
      </p>

      <div className="about">
        <div className="about__block">
          <h2>¿Quién soy?</h2>
          <p>
            Soy un desarrollador web freelance apasionado por transformar ideas
            en experiencias digitales. Me especializo en el frontend con React,
            cuidando cada detalle para que la web sea atractiva y funcione
            correctamente en cualquier dispositivo.
          </p>
        </div>

        <div className="about__block">
          <h2>Servicios</h2>
          <ul className="about__list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="about__block">
          <h2>Tecnologías</h2>
          <div className="about__tags">
            {technologies.map((tech) => (
              <span key={tech} className="about__tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="about__block about__block--contact">
          <h2>¿Tienes un proyecto en mente?</h2>
          <p>Hablemos: respondo rápido y sin compromiso.</p>
          <a className="about__button" href="mailto:contacto@tudominio.com">
            Contáctame
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;