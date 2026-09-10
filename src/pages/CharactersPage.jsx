import { useEffect, useState } from "react";
import characterService from "../services/characterService.js";
import CharacterCard from "../components/CharacterCard.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const PAGE_SIZE = 50;

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Carga los personajes de la página indicada usando el servicio Axios.
   * @param {number} currentPage - Página a solicitar.
   */
  const fetchCharacters = async (currentPage) => {
    setLoading(true);
    setError("");
    try {
      const data = await characterService.getCharacters(currentPage, PAGE_SIZE);
      setCharacters(data.data);
      setTotalPages(data.info.totalPages);
    } catch {
      setError("No se pudieron cargar los personajes. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  // Filtra la página actual por el término buscado
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="page">
      <h1 className="page__title">Personajes Disney</h1>
      <p className="page__subtitle">
        Explora el catálogo de personajes del mundo Disney.
      </p>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => fetchCharacters(page)}
        />
      )}

      {!loading && !error && (
        <>
          {filteredCharacters.length > 0 ? (
            <div className="cards-grid">
              {filteredCharacters.map((character) => (
                <CharacterCard key={character._id} character={character} />
              ))}
            </div>
          ) : (
            <p className="page__empty">
              No se encontró ningún personaje con ese nombre.
            </p>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}

export default CharactersPage;