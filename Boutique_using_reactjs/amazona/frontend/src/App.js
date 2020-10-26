import "./App.css";
import data from "./data";

function App() {
  const openMenu = () => {
    document.getElementById("sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.getElementById("sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <a href="index.html">amazona</a>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <a href="sign-in.html">Sign In</a>
          </div>
        </header>
        <aside id="sidebar">
          <h3>Shopping Category</h3>
          <button className="sidebar-close-btn" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shiirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/products/:id" component={ProductScreen} />
            <Route path="/" exact={true} component="{HomeScreen}" />
            <ul className="products">
              {data.products.map((product) => (
                <li>
                  <div className="product">
                    <img
                      className="product-image"
                      src={product.image}
                      alt="product"
                    />
                    <div className="product-name">
                      <a href="product.html">{product.name}</a>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">{product.price}</div>
                    <div className="product-rating">
                      {product.rating} Stars {product.numReviews}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <footer className="footer">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
