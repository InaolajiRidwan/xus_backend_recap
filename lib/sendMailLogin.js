import nodemailer from "nodemailer";
const sendMailLoginIn = async (user) => {
    const {nin, role, mobileNo, email} = user

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
            <h1 style="color: blue;">you successfully sign in to our app: <br/>
             email:${email} <br/>
             role: ${role} <br />
             nin:  ${nin} <br />
             mobile: ${mobileNo}
             </h1>
        </body>
    
    `,
  };

  emailTransport.sendMail(messageContent);
};

export default sendMailLoginIn;
