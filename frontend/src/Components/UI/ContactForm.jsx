import React, { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast"; // ✅ added

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
      toast.error("Please fill all fields ❗"); // ✅ changed
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
        toast.success("Message sent successfully ✅"); // ✅ changed

        setFormData({
          name: "",
          contactNo: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Something went wrong ❌"); // ✅ changed
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error ❌"); // ✅ changed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-10 px-4 lg:px-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden lg:ml-16 lg:mr-16'>
      
      <form
        onSubmit={handleSubmit}
        className='contact-us-form flex flex-col gap-3 justify-center dm-sans'
      >

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

        <div>
          <h2>Contact Number</h2>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </div>

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

        <div>
          <h2>Message</h2>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className='w-[50%] mx-auto flex justify-center items-center'>
          <button type="submit" disabled={loading}>
            <Button title={loading ? "Sending..." : "Submit!"} />
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContactForm;