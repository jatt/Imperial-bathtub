import { useEffect, useMemo, useState } from "react";
import { Layers, PlusCircle, Save, Search, Sparkles } from "lucide-react";
import { productApi, sectionItemApi, testimonialApi } from "../api/http";
import ProductCard from "../components/ProductCard";

const modules = [
  { key: "products", label: "Request Pricing Cards" },
  { key: "testimonials", label: "Testimonials" },
  { key: "projects", label: "Projects / Portfolio" },
  { key: "buying-guide", label: "Buying Guide" },
  { key: "about", label: "About Us" },
  { key: "team", label: "Team" }
];

const initialForms = {
  products: { name: "", size: "", price: "", description: "", image: "" },
  testimonials: { name: "", role: "", location: "", image: "", review: "", rating: 5 },
  projects: { title: "", category: "", image: "", section: "projects" },
  "buying-guide": { title: "", text: "", section: "buying-guide" },
  about: { title: "", text: "", section: "about" },
  team: { name: "", role: "", image: "", section: "team" }
};

const cardTitles = {
  products: "Request Pricing Cards",
  testimonials: "Testimonials",
  projects: "Projects / Portfolio",
  "buying-guide": "Buying Guide",
  about: "About Us",
  team: "Team"
};

const AdminPannel = () => {
  const [activeModule, setActiveModule] = useState("products");
  const [forms, setForms] = useState(initialForms);
  const [lists, setLists] = useState({
    products: [],
    testimonials: [],
    projects: [],
    "buying-guide": [],
    about: [],
    team: []
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  const form = forms[activeModule];

  const hasImageField = useMemo(() => {
    return ["products", "testimonials", "projects", "team"].includes(activeModule);
  }, [activeModule]);

  const loadAllData = async () => {
    try {
      const [productsResponse, testimonialsResponse, projectsResponse, buyingGuideResponse, aboutResponse, teamResponse] = await Promise.all([
        productApi.getProducts(),
        testimonialApi.getTestimonials(),
        sectionItemApi.getItems("projects"),
        sectionItemApi.getItems("buying-guide"),
        sectionItemApi.getItems("about"),
        sectionItemApi.getItems("team")
      ]);

      setLists({
        products: productsResponse.data || [],
        testimonials: testimonialsResponse.data || [],
        projects: projectsResponse.data || [],
        "buying-guide": buyingGuideResponse.data || [],
        about: aboutResponse.data || [],
        team: teamResponse.data || []
      });
    } catch {
      setError("Data load nahi ho paaya. Backend check karein.");
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const resetActiveForm = () => {
    setForms((current) => ({
      ...current,
      [activeModule]: initialForms[activeModule]
    }));
    setEditingId(null);
    setImageFileName("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForms((current) => ({
      ...current,
      [activeModule]: { ...current[activeModule], [name]: value }
    }));
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForms((current) => ({
        ...current,
        [activeModule]: { ...current[activeModule], image: reader.result }
      }));
      setImageFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const runCreate = async (moduleKey, payload) => {
    if (moduleKey === "products") return productApi.createProduct(payload);
    if (moduleKey === "testimonials") return testimonialApi.createTestimonial(payload);
    return sectionItemApi.createItem(payload);
  };

  const runUpdate = async (moduleKey, id, payload) => {
    if (moduleKey === "products") return productApi.updateProduct(id, payload);
    if (moduleKey === "testimonials") return testimonialApi.updateTestimonial(id, payload);
    return sectionItemApi.updateItem(id, payload);
  };

  const runDelete = async (moduleKey, id) => {
    if (moduleKey === "products") return productApi.deleteProduct(id);
    if (moduleKey === "testimonials") return testimonialApi.deleteTestimonial(id);
    return sectionItemApi.deleteItem(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      if (editingId) {
        await runUpdate(activeModule, editingId, form);
      } else {
        await runCreate(activeModule, form);
      }
      resetActiveForm();
      setStatus("success");
      await loadAllData();
    } catch (apiError) {
      setStatus("error");
      setError(apiError.response?.data?.message || "Save nahi ho paaya.");
    }
  };

  const handleEdit = (item) => {
    const next = { ...initialForms[activeModule], ...item };
    setForms((current) => ({ ...current, [activeModule]: next }));
    setEditingId(item._id);
    setStatus("idle");
    setError("");
    setImageFileName("");
    window.location.hash = "add-item";
  };

  const handleDelete = async (id) => {
    try {
      setStatus("loading");
      setError("");
      await runDelete(activeModule, id);
      if (editingId === id) {
        resetActiveForm();
      }
      setStatus("success");
      await loadAllData();
    } catch (apiError) {
      setStatus("error");
      setError(apiError.response?.data?.message || "Delete nahi ho paaya.");
    }
  };

  const renderFields = () => {
    if (activeModule === "products") {
      return (
        <>
          <label className="text-sm font-semibold text-ink">Name<input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Size<input name="size" value={form.size} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Price<input name="price" value={form.price} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">Description<textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" rows={4} required /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
        </>
      );
    }

    if (activeModule === "testimonials") {
      return (
        <>
          <label className="text-sm font-semibold text-ink">Name<input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Role<input name="role" value={form.role} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Location<input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Rating (1-5)<input type="number" min="1" max="5" step="0.1" name="rating" value={form.rating} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">Review<textarea name="review" value={form.review} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" rows={4} required /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
        </>
      );
    }

    if (activeModule === "projects") {
      return (
        <>
          <label className="text-sm font-semibold text-ink">Title<input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Category<input name="category" value={form.category} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
        </>
      );
    }

    if (activeModule === "team") {
      return (
        <>
          <label className="text-sm font-semibold text-ink">Name<input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Role<input name="role" value={form.role} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
        </>
      );
    }

    return (
      <>
        <label className="text-sm font-semibold text-ink sm:col-span-2">Title<input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
        <label className="text-sm font-semibold text-ink sm:col-span-2">Description<textarea name="text" value={form.text} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" rows={4} required /></label>
      </>
    );
  };

  const renderListCard = (item) => {
    if (activeModule === "products") {
      return <ProductCard product={item} />;
    }

    return (
      <div className="rounded-xl border border-ink/10 bg-ivory p-4">
        {item.image && <img src={item.image} alt={item.title || item.name} className="mb-3 h-40 w-full rounded-lg object-cover" />}
        {item.title && <h4 className="text-lg font-bold text-ink">{item.title}</h4>}
        {item.name && <h4 className="text-lg font-bold text-ink">{item.name}</h4>}
        {item.role && <p className="text-sm font-semibold text-gold">{item.role}</p>}
        {item.location && <p className="text-sm text-ink/70">{item.location}</p>}
        {item.category && <p className="text-sm text-ink/70">Category: {item.category}</p>}
        {item.size && <p className="text-sm text-ink/70">Size: {item.size}</p>}
        {item.price && <p className="text-sm text-ink/70">Price: {item.price}</p>}
        {item.text && <p className="mt-2 text-sm text-ink/70">{item.text}</p>}
        {item.description && <p className="mt-2 text-sm text-ink/70">{item.description}</p>}
        {item.review && <p className="mt-2 text-sm text-ink/70">{item.review}</p>}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-ivory">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-ink/10 bg-white px-5 py-6">
          <div className="rounded-2xl border border-gold/25 bg-ivory p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Imperial Admin</p>
            <h1 className="mt-2 text-xl font-bold text-ink">Content Console</h1>
          </div>
          <nav className="mt-6 grid gap-2">
            {modules.map((module) => (
              <button
                key={module.key}
                type="button"
                onClick={() => {
                  setActiveModule(module.key);
                  setStatus("idle");
                  setError("");
                  setEditingId(null);
                  setImageFileName("");
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeModule === module.key ? "bg-ink text-champagne" : "text-ink/80 hover:bg-ivory"}`}
              >
                <Layers size={18} /> {module.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="px-4 py-5 sm:px-7">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Console Operations</p>
              <h2 className="text-2xl font-bold text-ink">Manage {cardTitles[activeModule]}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-4 py-2 text-sm font-semibold text-ink/80">
                <Save size={16} /> Save Draft
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-ink">
                <Sparkles size={16} /> Save & Activate
              </button>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
            <section id="add-item" className="rounded-3xl border border-ink/10 bg-white p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ivory text-gold">
                  <PlusCircle size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ink">Section Basics</h3>
                  <p className="text-sm text-ink/70">Add, edit, and delete records for {cardTitles[activeModule].toLowerCase()}.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                {renderFields()}

                {hasImageField && (
                  <label className="text-sm font-semibold text-ink sm:col-span-2">
                    Upload Image (System)
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink"
                    />
                  </label>
                )}

                {imageFileName && <p className="text-xs text-ink/70 sm:col-span-2">Selected: {imageFileName}</p>}
                {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
                {status === "success" && <p className="text-sm text-green-700 sm:col-span-2">{editingId ? "Updated successfully." : "Added successfully."}</p>}

                <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-champagne" disabled={status === "loading"}>
                  <Save size={16} />
                  {status === "loading" ? "Saving..." : editingId ? "Update" : "Add"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      resetActiveForm();
                      setStatus("idle");
                      setError("");
                    }}
                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </section>

            <section className="rounded-3xl border border-ink/10 bg-white p-6">
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-ink/15 bg-ivory px-3 py-2">
                <Search size={16} className="text-gold" />
                <span className="text-sm font-medium text-ink/80">Section Preview</span>
              </div>
              <h3 className="text-xl font-bold text-ink">Current {cardTitles[activeModule]}</h3>
              <p className="mt-1 text-sm text-ink/70">Public site par yahi content render hoga.</p>
              <div className="mt-6 grid gap-6">
                {(lists[activeModule] || []).map((item) => (
                  <div key={item._id} className="rounded-2xl border border-ink/10 bg-white p-3">
                    {renderListCard(item)}
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-lg border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ivory"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!lists[activeModule]?.length && <p className="text-sm text-ink/60">No items yet.</p>}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPannel;
