import React, { useState } from "react";
import Button from "./Button";

const ContactForm = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    contactNo: "", // ✅ FIXED
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
    <div className="py-10 px-4 lg:px-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden lg:ml-16 lg:mr-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        
        <input name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact Number" required />
        
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required />

        <button type="submit" disabled={loading}>
          <Button title={loading ? "Sending..." : "Submit!"} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;