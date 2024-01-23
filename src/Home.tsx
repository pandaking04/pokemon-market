import React, { useState, useEffect } from "react";
import CardComponent from "./components/CardComponents";
import SearchBar from "./components/SearchBar";
import CardFilterDropdown from "./components/CardFilterDropdown";
import Pagination from "./components/Pagination";
import Cart from "./components/Cart";
import "./css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  imageUrl: string;
  price: number;
  stock: number;
  set: {
    total: number;
  };
  cardmarket: {
    prices: {
      averageSellPrice: number;
    };
  };
}

interface CartItem {
    id: string
    image: string;
    name: string;
    price: number;
    stock: number;
    
  }

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cardsInCart, setCardsInCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCartButtonClick = () => {
    
    setIsCartOpen(!isCartOpen);

  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleAddToCart = (item: CartItem) => {
    
    setCartItems((prevItems: CartItem[]) => [...prevItems, item]);
    
    
  };

  const handleFilterChange = (filterType: string, selectedFilter: string) => {
    switch (filterType) {
      case "sets":
        setSelectedSet(selectedFilter);

        break;
      case "rarities":
        setSelectedRarity(selectedFilter);

        break;
      case "type":
        setSelectedType(selectedFilter);

        break;
      default:
        break;
    }
  };

  

  useEffect(() => {
    if(searchTerm){
        fetchDataSearch(20, currentPage, searchTerm);
    }else if(selectedSet || selectedRarity || selectedType){
        fetchData(20, currentPage);
    }
    else{
        fetchData(20, currentPage);
    }
    
  }, [currentPage, searchTerm,selectedSet, selectedRarity, selectedType]);

  const fetchData = async (pageSize: number, page: number) => {
    setLoading(true);

    try {
      let apiUrl = `https://api.pokemontcg.io/v2/cards/?pageSize=${pageSize}&page=${page}`;

      // Append filters to the API URL
      if (selectedSet) {
        apiUrl += `&q=set.name:%22${encodeURIComponent(selectedSet)}%22`;
      }
      if (selectedRarity) {
        apiUrl += `&q=rarity:%22${encodeURIComponent(selectedRarity)}%22`;
      }
      if (selectedType) {
        apiUrl += `&q=types:%22${encodeURIComponent(selectedType)}%22`;
      }
      console.log(apiUrl)
      const response = await fetch(apiUrl);
      const data = await response.json();

      const modifiedData = data.data.map((card: Card) => ({
        ...card,
        imageUrl: card.images.small,
        stock: card.set.total,
        price: card.cardmarket.prices.averageSellPrice,
      }));

      setCards(modifiedData);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(cards)  
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataSearch = async (pageSize: number, page: number, searchTerm: string) => {
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}&pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
  
      const modifiedData = data.data.map((card: Card) => ({
        ...card,
        imageUrl: card.images.small,
        stock: card.set.total,
        price: card.cardmarket.prices.averageSellPrice,
      }));
  
      setCards(modifiedData);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if(term){
        fetchDataSearch(20, currentPage, term);
    }else{
        fetchData(20, currentPage);
    }
    
  };
  return (
    <div>
      <div className={`home-container ${isCartOpen ? "blur" : ""}`}>
        <div className="header">
          <h1>Pokemon Market</h1>
          <div className="search-bar">
            <SearchBar onSearch={handleSearch} />
            <button
              className={`cart-button ${isCartOpen ? "show" : ""}`}
              onClick={handleCartButtonClick}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
           
          </div>
        </div>
        <div className="line"></div>
        <div className="filter">
          <h2>Choose Card</h2>
          <div className="filter-container">

          <CardFilterDropdown
              filterType="Set"
              onFilterChange={(filter) => handleFilterChange("sets", filter)}
            />
            <CardFilterDropdown
              filterType="Rarity"
              onFilterChange={(filter) =>
                handleFilterChange("rarities", filter)
              }
            />
            <CardFilterDropdown
              filterType="Type"
              onFilterChange={(filter) => handleFilterChange("type", filter)}
            />
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="cards-container">
            {cards.map((card) => (
              <CardComponent
                key={card.id}
                image={card.imageUrl}
                name={card.name}
                price={card.price}
                stock={card.stock}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        <div className="PaginationContainer">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={handleCartClose} cardsInCart={cartItems} setCardsInCart={setCartItems}  />
    </div>
  );
};

export default Home;
