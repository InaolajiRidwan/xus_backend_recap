import nodemailer from "nodemailer";

export const sendMailSignUp = async (email) => {
  const emailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "airnovadigital@gmail.com",
      pass: `moyr jmnx nrov izxw`,
    },
  });

  const messageContent = {
    to: email,
    from: `airnovadigital@gmail.com`,
    subject: "Welcome to xus digital",
    html: `
        <body>
            <h1 style="color: blue;">Welcome to xus digital </h1>
        </body>
    
    `,
  };

  emailTransport.sendMail(messageContent);
};

export default sendMailSignUp;
