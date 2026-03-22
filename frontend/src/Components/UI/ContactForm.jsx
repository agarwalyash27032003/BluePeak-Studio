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

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill required fields ❗");
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
      <form
        onSubmit={handleSubmit}
        className="contact-us-form flex flex-col gap-3 justify-center dm-sans"
      >
        {/* Name */}
        <div>
          <h2>Name</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <h2>Contact Number</h2>
          <input
            type="text"
            name="conactNo"
            value={formData.contactNo}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div>
          <h2>Message</h2>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Button */}
        <div className="w-[50%] mx-auto flex justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            <Button title={loading ? "Sending..." : "Submit!"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;