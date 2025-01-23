import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [cigarettes, setCigarettes] = useState([]);
  const [formData, setFormData] = useState({ user: "", brand: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const topCigaretteBrands = [
    "Marlboro",
    "Fortune",
    "Hope",
    "L&M",
    "Mighty",
    "Champion",
    "Marlboro Black",
  ];

  useEffect(() => {
    fetchCigarettes();
  }, []);

  const fetchCigarettes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://alcones-fybnfydsgbh6fve3.southeastasia-01.azurewebsites.net/cigarettes"
      );
      setCigarettes(response.data);
    } catch (err) {
      setError("Failed to fetch cigarettes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user || !formData.brand) {
      alert("User and brand are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://alcones-fybnfydsgbh6fve3.southeastasia-01.azurewebsites.net/cigarettes",
        formData
      );
      setFormData({ user: "", brand: "" });
      fetchCigarettes();
    } catch (err) {
      setError("Failed to submit data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Cigarette Brand Tracker</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <select
            id="brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
          >
            <option value="">Select a brand</option>
            {topCigaretteBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Users & their Cigarette Brands</h2>
      <ul>
        {cigarettes.map((item) => (
          <li key={item.id}>
            {item.user}: {item.brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
