import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProductManagement() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  
  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("jacuzzi");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Fetch Existing Products for List (Assuming a public or admin endpoint exists)
  const fetchProducts = () => {
    fetch("http://localhost:5000/api/admin/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      // Yahan aap dashboard stats se alag list endpoint bhi fetch kar sakte hain
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug.toLowerCase().replace(/ /g, "-"));
    formData.append("category", category);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    
    // Single Main Thumbnail
    if (image) formData.append("image", image);
    
    // Multiple Gallery Images
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }

    // Dummy complex array types standardizing logic as required by database schema
    formData.append("features", JSON.stringify([{ title: "Premium Build", text: "Heavy duty materials" }]));
    formData.append("specs", JSON.stringify([{ label: "Warranty", value: "5 Years" }]));

    try {
      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // Form-data me content-type khud set hota hai file boundaries ke sath
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        alert("Product Created Successfully!");
        // Reset state
        setTitle(""); setSlug(""); setShortDescription(""); setDescription("");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Dynamic Product</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Title</label>
            <input type="text" className="mt-1 w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unique Slug</label>
            <input type="text" className="mt-1 w-full p-2 border rounded" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select className="mt-1 w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="jacuzzi">Jacuzzi</option>
            <option value="soaking">Soaking</option>
            <option value="spa">Spa</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description (About Us Line)</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Description</label>
          <textarea className="mt-1 w-full p-2 border rounded h-24" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Main Banner Image</label>
            <input type="file" className="mt-1 w-full" onChange={(e) => setImage(e.target.files[0])} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gallery Images (Multiple)</label>
            <input type="file" className="mt-1 w-full" multiple onChange={(e) => setGallery(e.target.files)} />
          </div>
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Save Product to DB
        </button>
      </form>
    </div>
  );
}