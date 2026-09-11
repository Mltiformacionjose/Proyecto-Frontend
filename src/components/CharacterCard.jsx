import { useState } from "react";

const FALLBACK_EMOJI = "🎭";

/**
 * Returns the most relevant appearances of a character
 * (films, tv shows and video games) limited to the first two.
 * @param {Object} character - Character from the Disney API.
 * @returns {string[]} Formatted appearances.
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
  const [imageError, setImageError] = useState(false);
  const appearances = getAppearances(character);
  const showFallback = imageError || !character.imageUrl;

  return (
    <article className="card">
      {showFallback ? (
        <div
          className="card__image card__image--fallback"
          role="img"
          aria-label={character.name}
        >
          <span className="card__image-emoji">{FALLBACK_EMOJI}</span>
        </div>
      ) : (
        <img
          className="card__image"
          src={character.imageUrl}
          alt={character.name}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      )}
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