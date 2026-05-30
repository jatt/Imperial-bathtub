import { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  FileText,
  Layers,
  Mail,
  Phone,
  PlusCircle,
  Save,
  Search,
  Sparkles,
  User,
  MessageSquare,
  Calendar,
  Tag,
} from "lucide-react";
import { productApi, sectionItemApi, testimonialApi, leadApi, contactApi } from "../api/http";
import ProductCard from "../components/ProductCard";

// ─── Modules (Buying Guide & About Us removed; two report sections added) ────
const modules = [
  { key: "products", label: "Add Products", type: "content" },
  { key: "testimonials", label: "Testimonials", type: "content" },
  { key: "projects", label: "Projects / Portfolio", type: "content" },
  { key: "team", label: "Team", type: "content" },
  { key: "quote-report", label: "Quote Report", type: "report" },
  { key: "project-details-reports", label: "Project Details Reports", type: "report" },
];

const initialForms = {
  products: { name: "", size: "", price: "", description: "", image: "" },
  testimonials: { name: "", role: "", location: "", image: "", review: "", rating: 5 },
  projects: { title: "", category: "", image: "", section: "projects" },
  team: { name: "", role: "", image: "", section: "team" },
};

const cardTitles = {
  products: "Add Products",
  testimonials: "Testimonials",
  projects: "Projects / Portfolio",
  team: "Team",
  "quote-report": "Quote Report",
  "project-details-reports": "Project Details Reports",
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const colors = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-amber-100 text-amber-700",
    closed: "bg-green-100 text-green-700",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status || "new"}
    </span>
  );
};

// ─── Formatted Date ───────────────────────────────────────────────────────────
const FormattedDate = ({ iso }) => {
  if (!iso) return null;
  const d = new Date(iso);
  return (
    <span>
      {d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}{" "}
      <span className="text-ink/50">{d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
    </span>
  );
};

// ─── Quote Report Row ─────────────────────────────────────────────────────────
const QuoteReportRow = ({ item, index }) => (
  <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
          #{index + 1}
        </span>
        <div>
          <p className="font-bold text-ink">{item.name}</p>
          <p className="text-xs text-ink/60">{item.email}</p>
        </div>
      </div>
      <StatusBadge status={item.status} />
    </div>
    <div className="grid gap-2 sm:grid-cols-2 text-sm text-ink/70">
      {item.phone && (
        <div className="flex items-center gap-1.5">
          <Phone size={13} className="text-gold shrink-0" />
          <span>{item.phone}</span>
        </div>
      )}
      {item.interest && (
        <div className="flex items-center gap-1.5">
          <Tag size={13} className="text-gold shrink-0" />
          <span>{item.interest}</span>
        </div>
      )}
      {item.source && (
        <div className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-gold shrink-0" />
          <span className="capitalize">{item.source}</span>
        </div>
      )}
      {item.createdAt && (
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-gold shrink-0" />
          <FormattedDate iso={item.createdAt} />
        </div>
      )}
    </div>
    {item.message && (
      <div className="mt-3 rounded-xl bg-ivory p-3">
        <div className="flex items-start gap-1.5">
          <MessageSquare size={13} className="text-gold shrink-0 mt-0.5" />
          <p className="text-sm text-ink/80 leading-relaxed">{item.message}</p>
        </div>
      </div>
    )}
  </div>
);

// ─── Project Details Report Row ──────────────────────────────────────────────
const ProjectDetailsReportRow = ({ item, index }) => (
  <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
          #{index + 1}
        </span>
        <div>
          <p className="font-bold text-ink">{item.name}</p>
          <p className="text-xs text-ink/60">{item.email}</p>
        </div>
      </div>
      <StatusBadge status={item.status} />
    </div>
    <div className="grid gap-2 sm:grid-cols-2 text-sm text-ink/70">
      {item.phone && (
        <div className="flex items-center gap-1.5">
          <Phone size={13} className="text-gold shrink-0" />
          <span>{item.phone}</span>
        </div>
      )}
      {item.createdAt && (
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-gold shrink-0" />
          <FormattedDate iso={item.createdAt} />
        </div>
      )}
    </div>
    {item.message && (
      <div className="mt-3 rounded-xl bg-ivory p-3">
        <div className="flex items-start gap-1.5">
          <MessageSquare size={13} className="text-gold shrink-0 mt-0.5" />
          <p className="text-sm text-ink/80 leading-relaxed">{item.message}</p>
        </div>
      </div>
    )}
  </div>
);

// ─── Report Section ──────────────────────────────────────────────────────────
const ReportSection = ({ activeModule, reportData, reportLoading, reportError }) => {
  const isQuote = activeModule === "quote-report";
  const items = reportData[activeModule] || [];

  return (
    <div className="px-4 py-5 sm:px-7">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Reports</p>
          <h2 className="text-2xl font-bold text-ink">{cardTitles[activeModule]}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-4 py-2 text-sm font-semibold text-ink/80">
            {isQuote ? <ClipboardList size={16} /> : <FileText size={16} />}
            Total: {items.length}
          </span>
        </div>
      </header>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink/10 bg-white p-4 text-center">
          <p className="text-3xl font-extrabold text-ink">{items.length}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/60">Total Submissions</p>
        </div>
        {/* <div className="rounded-2xl border border-ink/10 bg-white p-4 text-center">
          <p className="text-3xl font-extrabold text-blue-600">{items.filter((i) => i.status === "new" || !i.status).length}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/60">New</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-4 text-center">
          <p className="text-3xl font-extrabold text-green-600">{items.filter((i) => i.status === "closed").length}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/60">Closed</p>
        </div> */}
      </div>

      {reportLoading && (
        <p className="py-10 text-center text-sm text-ink/60">Loading submissions…</p>
      )}
      {reportError && (
        <p className="py-10 text-center text-sm text-red-600">{reportError}</p>
      )}

      {!reportLoading && !reportError && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.length === 0 ? (
            <p className="text-sm text-ink/60 col-span-full text-center py-10">No submissions yet.</p>
          ) : (
            items.map((item, i) =>
              isQuote ? (
                <QuoteReportRow key={item._id} item={item} index={i} />
              ) : (
                <ProjectDetailsReportRow key={item._id} item={item} index={i} />
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminPannel = () => {
  const [activeModule, setActiveModule] = useState("products");
  const [forms, setForms] = useState(initialForms);
  const [lists, setLists] = useState({
    products: [],
    testimonials: [],
    projects: [],
    team: [],
  });
  const [projectFilter, setProjectFilter] = useState("all");
  const [reportData, setReportData] = useState({
    "quote-report": [],
    "project-details-reports": [],
  });
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  const isReportModule = activeModule === "quote-report" || activeModule === "project-details-reports";
  const form = forms[activeModule] || {};

  const hasImageField = useMemo(() => {
    return ["products", "testimonials", "projects", "team"].includes(activeModule);
  }, [activeModule]);

  // ─── Load content data ─────────────────────────────────────────────────────
  const loadAllData = async () => {
    try {
      const [productsResponse, testimonialsResponse, projectsResponse, teamResponse] = await Promise.all([
        productApi.getProducts(),
        testimonialApi.getTestimonials(),
        sectionItemApi.getItems("projects"),
        sectionItemApi.getItems("team"),
      ]);

      setLists({
        products: productsResponse.data || [],
        testimonials: testimonialsResponse.data || [],
        projects: projectsResponse.data || [],
        team: teamResponse.data || [],
      });
    } catch {
      setError("Unable to load data. Please check the backend.");
    }
  };

  // ─── Load report data ──────────────────────────────────────────────────────
  const loadReportData = async (moduleKey) => {
    setReportLoading(true);
    setReportError("");
    try {
      if (moduleKey === "quote-report") {
        const res = await leadApi.getLeads();
        setReportData((prev) => ({ ...prev, "quote-report": res.data || [] }));
      } else if (moduleKey === "project-details-reports") {
        const res = await contactApi.getContacts();
        setReportData((prev) => ({ ...prev, "project-details-reports": res.data || [] }));
      }
    } catch {
      setReportError("Unable to load report. Please check the backend.");
    } finally {
      setReportLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Reload report whenever user switches to a report tab
  useEffect(() => {
    if (isReportModule) {
      loadReportData(activeModule);
    }
  }, [activeModule]);

  const resetActiveForm = () => {
    setForms((current) => ({
      ...current,
      [activeModule]: initialForms[activeModule],
    }));
    setEditingId(null);
    setImageFileName("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForms((current) => ({
      ...current,
      [activeModule]: { ...current[activeModule], [name]: value },
    }));
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForms((current) => ({
        ...current,
        [activeModule]: { ...current[activeModule], image: reader.result },
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
      setError(apiError.response?.data?.message || "Unable to save the item.");
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
      setError(apiError.response?.data?.message || "Unable to delete the item.");
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
          {/* <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label> */}
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
          {/* <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label> */}
        </>
      );
    }

    if (activeModule === "projects") {
      return (
        <>
          <label className="text-sm font-semibold text-ink">Title<input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">
            Category
            <select
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink"
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="all">ALL</option>
              <option value="modern">MODERN</option>
              <option value="classic">CLASSIC</option>
              <option value="spa">SPA</option>
              {/* <option value="sauna">SAUNA</option>
              <option value="steam">STEAM</option> */}
            </select>
          </label>
        </>
      );
    }

    if (activeModule === "team") {
      return (
        <>
          <label className="text-sm font-semibold text-ink">Name<input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          <label className="text-sm font-semibold text-ink">Role<input name="role" value={form.role} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label>
          {/* <label className="text-sm font-semibold text-ink sm:col-span-2">Image URL<input name="image" value={form.image} onChange={handleChange} className="mt-1 w-full rounded-xl border border-ink/20 bg-ivory p-3 text-ink" required /></label> */}
        </>
      );
    }

    return null;
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
        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="border-r border-ink/10 bg-white px-5 py-6">
          <div className="rounded-2xl border border-gold/25 bg-ivory p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Imperial Admin</p>
            <h1 className="mt-2 text-xl font-bold text-ink">Content Console</h1>
          </div>

          <nav className="mt-6 grid gap-1">
            {/* Content modules */}
            <p className="mb-1 px-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">Content</p>
            {modules.filter((m) => m.type === "content").map((module) => (
              <button
                key={module.key}
                type="button"
                onClick={() => {
                  setActiveModule(module.key);
                  setStatus("idle");
                  setError("");
                  setEditingId(null);
                  setImageFileName("");
                  setProjectFilter("all");
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeModule === module.key ? "bg-ink text-champagne" : "text-ink/80 hover:bg-ivory"}`}
              >
                <Layers size={16} /> {module.label}
              </button>
            ))}

            {/* Report modules */}
            <p className="mb-1 mt-4 px-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">Reports</p>
            {modules.filter((m) => m.type === "report").map((module) => (
              <button
                key={module.key}
                type="button"
                onClick={() => {
                  setActiveModule(module.key);
                  setStatus("idle");
                  setError("");
                  setEditingId(null);
                  setImageFileName("");
                  setProjectFilter("all");
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeModule === module.key ? "bg-gold text-ink" : "text-ink/80 hover:bg-ivory"}`}
              >
                {module.key === "quote-report" ? <ClipboardList size={16} /> : <FileText size={16} />}
                {module.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main content ────────────────────────────────────────────────── */}
        {isReportModule ? (
          <ReportSection
            activeModule={activeModule}
            reportData={reportData}
            reportLoading={reportLoading}
            reportError={reportError}
          />
        ) : (
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
                  <Sparkles size={16} /> Save &amp; Activate
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
                    <p className="text-sm text-ink/70">Add, edit, and delete records for {cardTitles[activeModule]?.toLowerCase()}.</p>
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
                <p className="mt-1 text-sm text-ink/70">This content will be rendered on the public website.</p>
                <div className="mt-6 grid gap-6">
                  {/* Category Filter for Projects */}
                  {/* {activeModule === "projects" && (
                    <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-4">
                      {["all", "modern", "classic", "spa", "sauna", "steam"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setProjectFilter(cat)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                            projectFilter === cat
                              ? "bg-ink text-champagne"
                              : "border border-ink/20 text-ink/70 hover:bg-ivory"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )} */}

                  {((lists[activeModule] || []).filter((item) => {
                    if (activeModule === "projects" && projectFilter !== "all") {
                      return item.category === projectFilter;
                    }
                    return true;
                  })).map((item) => (
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
                  {!(lists[activeModule] || []).filter((item) => {
                    if (activeModule === "projects" && projectFilter !== "all") {
                      return item.category === projectFilter;
                    }
                    return true;
                  }).length && <p className="text-sm text-ink/60">No items yet.</p>}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPannel;
