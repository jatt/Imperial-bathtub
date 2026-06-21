import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/http";

export default function ProductManagement() {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("bathtubs");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  const [image, setImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 100,
          page: 1,
        },
      });

      setProducts(response.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();

  //   formData.append("name", name);
  //   formData.append("category", category);
  //   formData.append("size", size);
  //   formData.append("price", price);
  //   formData.append("shortDescription", shortDescription);
  //   formData.append("description", description);
  //   formData.append("features", features);

  //   // IMAGE OPTIONAL
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/admin/products",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert("Product Created Successfully!");

  //       setName("");
  //       setSize("");
  //       setPrice("");
  //       setShortDescription("");
  //       setDescription("");
  //       setFeatures("");
  //       setImage(null);

  //       fetchProducts();
  //     } else {
  //       alert(data.message || data.error || "Failed to create product");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong");
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    if (category) formData.append("category", category);
    if (size) formData.append("size", size);
    if (price) formData.append("price", price);
    if (shortDescription) {
      formData.append("shortDescription", shortDescription);
    }

    if (features) {
      formData.append("features", features);
    }

    // Image Optional
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product Created Successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium">Product Name *</label>

          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!editingId}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category *</label>

          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="bathtubs">Bathtubs</option>
            <option value="shower-solutions">Shower Solutions</option>
            <option value="wellness">Wellness & Spa</option>
            <option value="faucets-accessories">Faucets & Accessories</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium">Size *</label>

          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="1800 x 800 mm"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price *</label>

          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="₹50,000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium">Short Description</label>

          <input
            type="text"
            className="w-full p-2 border rounded"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description *</label>

          <textarea
            className="w-full p-2 border rounded h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={!editingId}
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium">Features</label>

          <textarea
            className="w-full p-2 border rounded h-24"
            placeholder="Feature 1, Feature 2, Feature 3"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>

        {/* Image Optional */}
        <div>
          <label className="block text-sm font-medium">
            Product Image (Optional)
          </label>

          <input
            type="file"
            className="w-full"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
