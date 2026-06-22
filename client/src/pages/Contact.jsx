import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { contactApi } from "../api/http";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit the contact request through the API.
      await contactApi.createContact(form);

      setStatus({
        type: "success",
        message: "Your enquiry has been submitted successfully.",
      });

      // Auto-hide success message after 3 seconds
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      {/* <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="container">
          <p className="mb-4">Contact Us</p>
          <h1 className="text-5xl font-bold">
            Begin your luxury Jacuzzi consultation
          </h1>
        </div>
      </section> */}

      {/* <section className="relative overflow-hidden bg-ink py-24 text-white">
  <div className="container pl-20">
    <p className="mb-4 uppercase tracking-[0.24em] text-sm text-gold">
      Contact Us
    </p>

    <h1 className="text-5xl font-bold leading-tight">
      Let's Discuss Your Bathroom & Wellness Requirements
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-white/80">
      Whether you're looking for a premium bathtub, shower solution, wellness product, or simply need expert guidance, our team is here to help. Share your requirements, and we'll assist you in finding the right solution for your space.
    </p>
  </div>
</section> */}

      {/* CONTACT SECTION */}
      <section className="bg-ivory py-16">
        <div className="container grid gap-10 lg:grid-cols-2 items-start">
          <div className="max-w-lg pl-6 md:pl-12">
            <h2 className="text-[32px] font-bold mb-8 text-black">
              Contact Us
            </h2>

            <div className="space-y-6 text-black text-lg">
              <p>
                Request a quote or send your enquiry and our team will help you find the right solution for your space.
              </p>

              <div className="flex items-center gap-6">
                <Phone className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <a href="tel:+916201986245" className="font-medium text-ink transition hover:text-gold" aria-label="Call Imperial Bath Solutions">
                  +91 62019 86245
                </a>
              </div>

              <div className="flex items-center gap-6">
                <Mail className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <a href="mailto:imperialbathsolution@gmail.com" className="font-medium text-ink transition hover:text-gold" aria-label="Email Imperial Bath Solutions">
                  imperialbathsolution@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-6">
                <MapPin className="w-5 h-5 shrink-0 mt-1" strokeWidth={1.5} />
                <span className="font-medium leading-relaxed">
                  Hanuman Tikri, Ward No. 24
                  <br />
                  Shiv Bihar Colony 2
                  <br />
                  Near Greenwich School, Tiwari Chowk
                  <br />
                  Deoghar, Jharkhand – 814112
                  <br />
                  India
                </span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            id="quote-form"
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow rounded"
          >
            <div className="grid gap-4">
              <input
                className="input-field"
                type="text"
                name="name"
                placeholder="Your Name (required)"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="Email Address (required)"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                className="input-field"
                type="tel"
                name="phone"
                placeholder="Phone Number (required)"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <textarea
                className="input-field"
                name="message"
                placeholder="Your Enquiry"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* STATUS MESSAGE */}
            {status.message && (
              <div
                className={`mt-4 p-3 text-sm flex items-center gap-2 ${status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {status.type === "success" && <CheckCircle size={18} />}
                {status.message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="btn-primary mt-5 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit Enquiry"}
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
