import React, { useState } from 'react';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = async (e) => {
      e.preventDefault();
  
      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        alert("API Key tidak ditemukan. Silakan login terlebih dahulu.");
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:5000/api/recipes/search?query=${query}`, {
          headers: {
            'x-api-key': apiKey
          }
        });
  
        const data = await res.json();
        if (res.ok) {
          setResults(data);
        } else {
          alert(data.message || "Gagal mengambil data");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengambil data");
      }
    };
  
    return (
        <div className={`wrapper ${results.length > 0 ? 'with-results' : ''}`}>
          <form onSubmit={handleSearch}>
            <h1>Cari Resep Makanan</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Masukkan nama makanan"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
            <button type="submit">Cari</button>
          </form>
      
          {results.length > 0 && (
            <div className="results-grid">
              {results.map((recipe) => (
                <div className="recipe-card" key={recipe.id}>
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-image"
                    />
                  )}
                  <h3 className="recipe-title">{recipe.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      );
  };
  
  export default SearchPage;