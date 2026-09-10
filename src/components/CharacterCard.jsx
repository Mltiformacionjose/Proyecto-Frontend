const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x500?text=Personaje+Disney";

/**
 * Devuelve las apariciones más relevantes de un personaje
 * (películas, series y videojuegos) limitadas a las dos primeras.
 * @param {Object} character - Personaje de la Disney API.
 * @returns {string[]} Apariciones formateadas.
 */
const getAppearances = (character) => {
  const appearances = [
    ...character.films,
    ...character.tvShows,
    ...character.videoGames,
  ];
  return appearances.slice(0, 2);
};

function CharacterCard({ character }) {
  const appearances = getAppearances(character);

  return (
    <article className="card">
      <img
        className="card__image"
        src={character.imageUrl || FALLBACK_IMAGE}
        alt={character.name}
        loading="lazy"
      />
      <div className="card__body">
        <h3 className="card__title">{character.name}</h3>
        <p className="card__text">
          {appearances.length > 0 ? appearances.join(" · ") : "Personaje Disney"}
        </p>
      </div>
    </article>
  );
}

export default CharacterCard;