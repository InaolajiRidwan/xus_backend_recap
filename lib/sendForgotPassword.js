import nodemailer from "nodemailer";

export const sendMailForgotPassword = async (email, token) => {
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
            <div style="display: flex; flex-direction: "column">
                <p>click this link to reset your password </p>
                <button style="background-color: green; padding: 8px"> 
                <a style="text-decoration: none; color: white">${token}</a>
                </button>
            
            </div>
        </body>
    
    `,
  };

  emailTransport.sendMail(messageContent);
};

export default sendMailForgotPassword;
