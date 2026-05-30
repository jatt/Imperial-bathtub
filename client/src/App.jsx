// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import FloatingActions from "./components/FloatingActions";
// import QuoteModal from "./components/QuoteModal";
// import ScrollToHash from "./components/ScrollToHash";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";

// const App = () => {
//   const [isQuoteOpen, setIsQuoteOpen] = useState(false);

//   const openQuote = () => setIsQuoteOpen(true);
//   const closeQuote = () => setIsQuoteOpen(false);

//   return (
//     <>
//       {/* ✅ Navbar only once */}
//       <Navbar onQuoteClick={openQuote} />

//       <div className="min-h-screen bg-ivory">
//         <ScrollToHash />

//         <main>
//           <Routes>
//             <Route path="/" element={<Home onQuoteClick={openQuote} />} />
//             <Route path="/about" element={<About onQuoteClick={openQuote} />} />
//             <Route path="/products" element={<Products onQuoteClick={openQuote} />} />
//             <Route
//               path="/products/:slug"
//               element={<ProductDetails onQuoteClick={openQuote} />}
//             />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </main>

//         <Footer />
//         <FloatingActions onQuoteClick={openQuote} />
//         <QuoteModal isOpen={isQuoteOpen} onClose={closeQuote} />
//       </div>
//     </>
//   );
// };

// export default App;

import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// FloatingActions is no longer used.
import QuoteModal from "./components/QuoteModal";
import ScrollToHash from "./components/ScrollToHash";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminPannel from "./pages/AdminPannel";
import AdminLogin from "./pages/AdminLogin";

const AdminRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
  return isAdminAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

const App = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const openQuote = () => setIsQuoteOpen(true);
  const closeQuote = () => setIsQuoteOpen(false);

  return (
    <>
      {/* ✅ Navbar only once */}
      <Navbar onQuoteClick={openQuote} />

      <div className="min-h-screen bg-ivory">
        <ScrollToHash />

        <main>
          <Routes>
            <Route path="/" element={<Home onQuoteClick={openQuote} />} />
            <Route path="/about" element={<About onQuoteClick={openQuote} />} />
            <Route path="/products" element={<Products onQuoteClick={openQuote} />} />
            <Route
              path="/products/:slug"
              element={<ProductDetails onQuoteClick={openQuote} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-panel"
              element={
                <AdminRoute>
                  <AdminPannel />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        
        {/* ❌ Yahan se <FloatingActions /> ko remove kar diya hai */}
        
        <QuoteModal isOpen={isQuoteOpen} onClose={closeQuote} />
      </div>
    </>
  );
};

export default App;
