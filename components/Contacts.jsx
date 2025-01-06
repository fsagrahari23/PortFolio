import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion"; // Import Framer Motion
import ContactFormAction from "../src/actions/ContactFormAction";

// Define schema validation using Zod
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

// Function to check suspicious content
const isSuspiciousContent = (data) => {
  const suspiciousPatterns = [
    /<script.*?>/i, // JavaScript injection
    /javascript:/i, // JavaScript URI scheme
    /<.*?>/i, // HTML tags
    /on\w+=/i, // Inline event handlers (onload, onclick, etc.)
    /'.*OR.*'/i, // SQL injection
    /"or"/i, // OR condition in SQL
    /UNION\s+SELECT/i, // SQL UNION SELECT
    /<iframe.*?>/i, // Iframe elements
    /<object.*?>/i, // Object elements
    /<embed.*?>/i, // Embed elements
    /<link.*?>/i, // External resource linking
    /<meta.*?>/i, // Meta tag manipulation
    /<img.*?src=.*?javascript:/i, // Images with JavaScript URIs
    /eval\(/i, // Use of `eval()`
    /document\.cookie/i, // Accessing cookies
    /window\.location/i, // Redirects or sensitive information
    /alert\(/i, // Popup alerts
    /fetch\(/i, // Potentially malicious fetch requests
    /<style.*?>.*<\/style>/i, // Inline styles with potential XSS
  ];

  return (
    suspiciousPatterns.some((pattern) => pattern.test(data.name)) ||
    suspiciousPatterns.some((pattern) => pattern.test(data.message))
  );
};

// Contact form component
const Contacts = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isSending, setIsSending] = React.useState(false);

  const onSubmit = async (data) => {
    setIsSending(true);
    console.log("Received Data:", data);

    // Check for suspicious content
    const isSuspiciousInput = isSuspiciousContent(data);
    console.log("Suspicious Content Detected:", isSuspiciousInput);

    if (isSuspiciousInput) {
      alert("Suspicious content detected! Please check your input.");
      return;
    }

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-arcjet-suspicious": isSuspiciousInput.toString(),
        },
        body: JSON.stringify(data),
      }).then((res) => {
        return res.json();
      });

      if (result.success) {
        alert("Message sent successfully!");
      } if(result.error) {
        alert(result.error);
      }
    } catch (e) {
      alert("An error occurred while submitting the form.");
    }
    reset();
    setIsSending(false);
  };

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 bg-gray-100 dark:bg-darkTheme mx-auto"
    >
      <motion.h1
        className="text-center mb-2 text-lg font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Connect with Me
      </motion.h1>
      <motion.h2
        className="text-center text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Get in Touch
      </motion.h2>

      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <motion.input
                  type="text"
                  placeholder="Enter your name"
                  className="border px-4 py-2 w-full rounded-md dark:bg-darkTheme hover:shadow-[2px_2px_0_#000] dark:hover:shadow-[2px_2px_0_#fff] transition duration-500 focus:ring-2 focus:ring-blue-500"
                  {...field}
                  whileFocus={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="border px-4 py-2 w-full rounded-md dark:bg-darkTheme hover:shadow-[2px_2px_0_#000] dark:hover:shadow-[2px_2px_0_#fff] transition duration-500 focus:ring-2 focus:ring-blue-500"
                  {...field}
                  whileFocus={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <motion.textarea
                placeholder="Enter your message"
                className="border px-4 py-2 w-full rounded-md dark:bg-darkTheme hover:shadow-[2px_2px_0_#000] dark:hover:shadow-[2px_2px_0_#fff] transition duration-500 focus:ring-2 focus:ring-blue-500"
                {...field}
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            )}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md mt-4 dark:bg-white dark:text-black"
          disabled={isSending}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {isSending ? "Sending..." : "Send Now"}
        </motion.button>
      </form>
    </div>
  );
};

export default Contacts;
