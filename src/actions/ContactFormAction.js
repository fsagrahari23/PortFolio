'use server';
import { contactRules } from "@/config/arcjet";
import { request } from "@arcjet/next";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

export default async function ContactFormAction(data) {
  const validateFields = userSchema.safeParse(data);
  console.log(validateFields);

  if (!validateFields.success) {
    return {
      error: validateFields.error.errors[0].message,
    };
  }

  const { name, email, message } = validateFields.data;
  console.log(name, email, message);
  //  return error if name or message contains malicious content or html tags or any javascript code

  try {
    const req = await request();
    const headersList = await headers();
    const isSuspicious = headersList.get("x-arcjet-suspicious") === "true";

    const decision = await contactRules.protect(req, {email,shield: {
      params: {
       name,
       message,
       isSuspicious,
      },
    },
    requested: 3,
  });

    console.log(decision);

    if (decision.isDenied()) {
      if(decision.reason.isEmail){
        const emailTypes = decision.reason.emailTypes;  
        
        if(emailTypes.includes("DISPOSABLE")){
          return {
            error: "Email is disposable",
            status:400
          }
        }else if(emailTypes.includes("INVALID")){
          return {
            error: "Email is invalid",
            status:400
          }
          
        }
        else if(emailTypes.includes("NO_MX_RECORDS")){
          return {
            error: "Email domain has no MX records",
            status:400
          }
        }
      }
      if (decision.reason.isShield()) {
        return {
          error:
            "Input validation failed! Potentially malicious content detected",
        };
      }

      if (decision.reason.isBot()) {
        return {
          error: "Bot activity detected",
        };
      }

      return {
        error: "Request denied",
        status: 403,
      };
    
  }
}
  catch (error) {
    console.error("Error processing form:", error);
    return {
      error: "An error occured!",
    };
  }

  try {
    await sendWelcomeEmail(email, name);
    await receiveMessage({ name, email, message });

    return {
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Error processing form:", error);
    return {
      error: "An error occurred while sending the message.",
    };
  }
}

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendWelcomeEmail = async (email, username) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome Email!",
    html: `
      <h1>Welcome, ${username}!</h1>
      <p>Thank you for reaching out. We are excited to connect with you.</p>
      <p>Best regards,<br>Monu Agrahari<br>Web Developer</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const receiveMessage = async ({ name, email, message }) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Message from Portfolio!",
    html: `
      <h1>New Message Received!</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
