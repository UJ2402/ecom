import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <NavBar />
      <Banner />
      <ProductGrid />
    </div>
  );
}

export default App;
