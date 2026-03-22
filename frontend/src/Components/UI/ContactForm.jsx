import React, { useState } from "react";
import Button from "./Button";

const ContactForm = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contactNo || !formData.email || !formData.message) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully ✅");

        setFormData({
          name: "",
          contactNo: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-6 lg:px-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden lg:ml-16 lg:mr-16">

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-white dm-sans">

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
            className="bg-transparent border border-white/20 focus:border-[#e87829] focus:ring-0 outline-none px-4 py-3 rounded-xl transition-all"
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Contact Number</label>
          <input
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="+44 9999 999999"
            required
            className="bg-transparent border border-white/20 focus:border-[#e87829] focus:ring-0 outline-none px-4 py-3 rounded-xl transition-all"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
            className="bg-transparent border border-white/20 focus:border-[#e87829] focus:ring-0 outline-none px-4 py-3 rounded-xl transition-all"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message..."
            required
            rows={4}
            className="bg-transparent border border-white/20 focus:border-[#e87829] focus:ring-0 outline-none px-4 py-3 rounded-xl transition-all resize-none"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-[180px]"
          >
            <Button title={loading ? "Sending..." : "Submit"} />
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContactForm;