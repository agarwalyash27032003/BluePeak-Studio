const TestimonialForm = require("../models/testimonialForm")

module.exports.createTestimonial = async (req, res) => {
    
    try{

        const {name, role, message} = req.body;

        if (!name || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const saved = await TestimonialForm.create({
            name,
            role,
            message,
        });
        
        console.log("Data saved in testimonial form:", saved);
        
        res.status(200).json({
            success: true,
            message: "Testimonial submitted successfully",
        });

    } 
    catch (err) {
        
        console.error("Error in Testimonial Form Controller:", err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

}