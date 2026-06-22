import {
  ArrowRight,
  Bath,
  Check,
  Package2,
  Ruler,
  ShieldCheck,
  Sparkles,
  Handshake,
  MapPin,
  ThermometerSun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi, sectionItemApi, testimonialApi } from "../api/http";
import AnimatedSection from "../components/AnimatedSection";
import FAQAccordion from "../components/FAQAccordion";
import PortfolioGrid from "../components/PortfolioGrid";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import TestimonialCarousel from "../components/TestimonialCarousel";
import {
  choosingTips,
  faqs,
  images,
  fallbackTestimonials,
  projects,
  team,
} from "../data/siteData";
import {
  getImmediateProducts,
  saveCachedProducts,
} from "../utils/productCatalog";
import {
  getImmediateList,
  saveListCache,
} from "../utils/contentCache";

const tipIcons = [Ruler, ThermometerSun, Sparkles, ShieldCheck];

const fallbackAboutItems = [
  {
    title: "Premium Quality",
    text: "Carefully selected products designed for comfort, durability, and modern living.",
  },
  {
    title: "Customer Focused",
    text: "Personalized guidance to help customers find the right solution.",
  },
  {
    title: "Trust & Transparency",
    text: " Clear communication, fair pricing, and dependable service.",
  },
  {
    title: "Nationwide Reach",
    text: "Serving customers across India with reliable delivery support.",
  },
];

const sortProductsByTopRank = (list = []) => {
  const ranked = [];
  const unranked = [];

  list.forEach((item) => {
    const rank = Number(item?.topProductRank);
    if (Number.isInteger(rank) && rank >= 1 && rank <= 6) {
      ranked.push(item);
    } else {
      unranked.push(item);
    }
  });

  ranked.sort((a, b) => Number(a.topProductRank) - Number(b.topProductRank));
  return [...ranked, ...unranked];
};

const Home = ({ onQuoteClick }) => {
  const perPage = 6;
  const [products, setProducts] = useState(() =>
    sortProductsByTopRank(getImmediateProducts("all")).slice(0, perPage)
  );
  const [productsPage, setProductsPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(false);
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);
  const [testimonials, setTestimonials] = useState(() => getImmediateList("testimonials", fallbackTestimonials));
  const [aboutItems, setAboutItems] = useState(fallbackAboutItems);
  const [buyingGuideItems, setBuyingGuideItems] = useState(choosingTips);
  const [portfolioItems, setPortfolioItems] = useState(() => getImmediateList("projects", projects).slice(0, 9));
  const [teamMembers, setTeamMembers] = useState(() => getImmediateList("team", team).slice(0, 6));

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productApi.getProducts({
          limit: perPage,
          page: 1,
          fields: "name,slug,image,category,size,price,shortDescription,status",
        });
        const nextProducts = Array.isArray(response.data) ? response.data : [];
        const totalCount = Number(response.headers?.["x-total-count"] || 0);

        if (nextProducts.length > 0) {
          const orderedProducts = sortProductsByTopRank(nextProducts);
          setProducts(orderedProducts);
          saveCachedProducts("all", orderedProducts);
          setProductsPage(1);
          if (totalCount > 0) {
            setHasMoreProducts(nextProducts.length < totalCount);
          } else {
            setHasMoreProducts(nextProducts.length === perPage);
          }
        } else {
          setHasMoreProducts(false);
        }
      } catch {
        setProducts((current) => {
          const fallback = current.length
            ? current
            : sortProductsByTopRank(getImmediateProducts("all")).slice(0, perPage);
          setHasMoreProducts(fallback.length >= perPage);
          return fallback;
        });
      }
    };

    const loadTestimonials = async () => {
      try {
        const response = await testimonialApi.getTestimonials();
        const nextTestimonials = Array.isArray(response.data) ? response.data : [];
        if (nextTestimonials.length > 0) {
          setTestimonials(nextTestimonials);
          saveListCache("testimonials", nextTestimonials);
        }
      } catch {
        setTestimonials((current) => (current.length ? current : fallbackTestimonials));
      }
    };

    const loadSectionItems = async () => {
      try {
        const [
          aboutResponse,
          buyingGuideResponse,
          projectsResponse,
          teamResponse,
        ] = await Promise.all([
          sectionItemApi.getItems("about"),
          sectionItemApi.getItems("buying-guide"),
          sectionItemApi.getItems("projects", { limit: 9, page: 1 }),
          sectionItemApi.getItems("team", { limit: 6, page: 1 }),
        ]);

        setAboutItems(
          aboutResponse.data.length ? aboutResponse.data : fallbackAboutItems,
        );
        setBuyingGuideItems(
          buyingGuideResponse.data.length
            ? buyingGuideResponse.data
            : choosingTips,
        );
        const nextProjects = Array.isArray(projectsResponse.data) ? projectsResponse.data.slice(0, 9) : [];
        const nextTeam = Array.isArray(teamResponse.data) ? teamResponse.data.slice(0, 6) : [];

        if (nextProjects.length > 0) {
          setPortfolioItems(nextProjects);
          saveListCache("projects", nextProjects);
        }

        if (nextTeam.length > 0) {
          setTeamMembers(nextTeam);
          saveListCache("team", nextTeam);
        }
      } catch {
        setAboutItems((current) => (current.length ? current : fallbackAboutItems));
        setBuyingGuideItems((current) => (current.length ? current : choosingTips));
        setPortfolioItems((current) => (current.length ? current : projects.slice(0, 9)));
        setTeamMembers((current) => (current.length ? current : team.slice(0, 6)));
      }
    };

    loadProducts();
    loadTestimonials();
    loadSectionItems();
  }, [perPage]);

  const handleLoadMoreProducts = async () => {
    if (isLoadingMoreProducts || !hasMoreProducts) return;

    try {
      setIsLoadingMoreProducts(true);
      const nextPage = productsPage + 1;
      const response = await productApi.getProducts({
        limit: perPage,
        page: nextPage,
        fields: "name,slug,image,category,size,price,shortDescription,status",
      });
      const incomingProducts = Array.isArray(response.data) ? response.data : [];
      const totalCount = Number(response.headers?.["x-total-count"] || 0);

      setProducts((current) => {
        const seen = new Set(current.map((item) => item._id || item.slug));
        const merged = [...current];
        incomingProducts.forEach((item) => {
          const key = item._id || item.slug;
          if (!seen.has(key)) {
            merged.push(item);
          }
        });
        const orderedMerged = sortProductsByTopRank(merged);
        saveCachedProducts("all", orderedMerged);
        return orderedMerged;
      });

      setProductsPage(nextPage);

      if (totalCount > 0) {
        setHasMoreProducts(nextPage * perPage < totalCount);
      } else {
        setHasMoreProducts(incomingProducts.length === perPage);
      }
    } catch {
      setHasMoreProducts(false);
    } finally {
      setIsLoadingMoreProducts(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[88svh] overflow-hidden bg-ink text-white">
        <img
          src={images.hero}
          alt="Luxury bathroom with premium Jacuzzi bathtub"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="container-shell relative flex min-h-[88svh] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5">Black / Gold / White Bath Luxury</p>
            <h1 className="font-display text-3xl font-bold leading-[0.95] sm:text-7xl lg:text-6xl">
              Luxury Bathroom Solutions for Modern Living
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Premium bathtubs, shower solutions, wellness products, and
              bathroom accessories designed to bring comfort, elegance, and
              relaxation to every space.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#jacuzzi" className="btn-primary">
                Explore Products <ArrowRight size={18} />
              </a>
              <button type="button" onClick={onQuoteClick} className="btn-secondary">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="bg-ink pb-10 text-white">
        <div className="container-shell grid gap-4 border-y border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-4xl font-bold">{item.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* About Section */}
      <AnimatedSection id="about" className="pt-20 pb-12 bg-ivory">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="About Us" />
            <SectionHeading
              className="-mt-16"
              // eyebrow="About Us"
              title="About Imperial Bath Solutions"
              text="Imperial Bath Solutions brings luxury, comfort, and innovation to modern bathrooms. We offer premium bathtubs, shower enclosures, steam solutions, and wellness products for homes, hotels, resorts, and commercial spaces. Our focus is on delivering stylish, high-quality solutions that enhance relaxation and functionality. With reliable service and nationwide delivery, we help create exceptional bathroom experiences across India."
            />

            <div className="mt-4 flex flex-col gap-5">
              {aboutItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-2xl border border-ink/10 bg- p-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
                >
                  <Check size={18} className="mt-1 shrink-0 text-gold" />
                  <div>
                    <h4 className="text-sm font-bold text-ink">
                      {String(index + 1).padStart(2, "0")}) {item.title}
                    </h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink/70">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 hidden h-full w-full border border-gold/45 lg:block" />
            <img
              src={images.about}
              alt="Premium Jacuzzi bathtub in a luxury bathroom"
              className="relative aspect-[4/5] w-full object-cover shadow-luxe"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection className=" p-10 bg-white border-t border-ink/10">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Why Imperial Bath Solutions feels different"
              text="Creating a luxury bathroom requires more than selecting products, it requires thoughtful choices, trusted guidance, and dependable support. At Imperial Bath Solutions, we help customers transform ordinary spaces into comfortable and sophisticated wellness environments."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-ink/10 bg-ivory p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
              <Package2 className="text-gold" size={28} />
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                Wide Product Range
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                Bathtubs, steam showers, shower enclosures, wellness products,
                and premium bathroom solutions.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-ivory p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
              <Sparkles className="text-gold" size={28} />
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                Modern & Luxury Designs
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                Products selected to complement contemporary homes and
                hospitality projects.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-ivory p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
              <Handshake className="text-gold" size={28} />
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                Expert Guidance
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                Helping customers choose products that match their space and
                requirements.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-ivory p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]">
              <MapPin className="text-gold" size={28} />
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                Pan-India Delivery
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                Reliable delivery support for customers across India.
              </p>
            </article>
          </div>
        </div>
      </AnimatedSection>

      {/* Jacuzzi Collection */}
      <AnimatedSection id="jacuzzi" className="p-10 bg-white">
        <div className="container-shell">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Products"
              title="Premium Bath & Wellness Collection"
            // text="Browse bathtubs, shower solutions, wellness and spa products, faucets, and accessories with a refined premium feel."
            />
            <Link to="/contact" className="btn-primary self-start lg:self-end">
              Request Pricing <ArrowRight size={18} />
            </Link>
          </div>
          {products.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product._id || product.slug}
                    product={product}
                    onQuoteClick={onQuoteClick}
                  />
                ))}
              </div>
              {hasMoreProducts && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMoreProducts}
                    disabled={isLoadingMoreProducts}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoadingMoreProducts ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-ivory p-8 text-center">
              <p className="text-sm font-semibold text-ink/70">
                No products are listed in our catalog at the moment. Please
                request pricing or contact us directly to explore custom
                requirements.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Buying Guide */}
      <AnimatedSection className="p-10 bg-ink text-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Buying Guide"
              title="How to choose the right bathtub."
              text="The best model is not just the biggest or the most decorative one. It should fit the room, support the desired bathing experience, and make maintenance practical."
              tone="dark"
            />
            <div className="mt-8 flex items-center gap-4 text-white/55">
              <Bath className="text-champagne" />
              <span className="text-sm uppercase tracking-[0.24em]">
                Comfort / Size / Jets / Service
              </span>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {buyingGuideItems.map((tip, index) => {
              const Icon = tipIcons[index];
              return (
                <article
                  key={tip.title}
                  className="border border-white/10 bg-white/[0.03] p-6"
                >
                  {Icon ? (
                    <Icon className="text-champagne" size={28} />
                  ) : (
                    <Bath className="text-champagne" size={28} />
                  )}
                  <h3 className="mt-5 font-display text-2xl font-bold">
                    {tip.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {tip.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Portfolio Section */}
      <AnimatedSection
        id="projects"
        className="p-10 bg-charcoal text-white"
      >
        <div className="container-shell">
          {/* <SectionHeading eyebrow="Gallery" /> */}
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <SectionHeading
              eyebrow="Gallery"
              title="Explore premium bathroom spaces and product installations."
              // text="Explore a collection of premium bathroom spaces featuring luxury bathtubs, shower solutions, wellness products, and modern bathroom designs crafted for comfort and elegance."
              tone="dark"
            />
            {/* <div className="flex items-center gap-3 text-white/45">
              <Gem className="text-champagne" />
              <span className="text-sm uppercase tracking-[0.24em]">
                Crafted for visual impact
              </span>
            </div> */}
          </div>
          {portfolioItems.length > 0 ? (
            <PortfolioGrid projects={portfolioItems} />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/10 p-8 text-center text-white/80">
              <p className="text-sm font-semibold">
                Gallery content is being updated. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <AnimatedSection id="testimonials" className="p-10 bg-ivory">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by homeowners, interior designers, and luxury hospitality projects."
            // text="Our commitment to quality, comfort, and elegant design is reflected in every customer experience."
            />
            <div className="mt-10">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Team Section */}
      <AnimatedSection id="team" className="p-10 bg-white">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Team"
            title="Passionate professionals delivering premium bath solutions."
          // text="Helping customers choose the right bathroom and wellness products with trusted guidance, reliable support, and attention to detail."
          />
          <div className="mt-12">
            {teamMembers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {teamMembers.map((member) => (
                  <article key={member.name} className="group bg-ivory">
                    <div className="aspect-[4/5] overflow-hidden bg-ink">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-bold text-ink">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm uppercase tracking-[0.2em] text-gold">
                        {member.role}
                      </p>
                      {/* Social links are not shown in this card. */}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-ink/10 bg-ivory p-8 text-center text-ink/70">
                <p className="text-sm font-semibold">
                  Our expert team is being updated. Please check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection id="faq" className="p-10 bg-ivory">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            text="Find answers on delivery, product selection, installation support, quote requests, and project suitability."
          />
          <FAQAccordion items={faqs} />
        </div>
      </AnimatedSection>
    </>
  );
};

export default Home;
