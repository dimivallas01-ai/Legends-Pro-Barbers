import Resend from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, appointment } = req.body;

    try {
      // Email to client
      await resend.emails.send({
        from: "dimivallas01@gmail.com",
        to: email,
        subject: "Booking Confirmation - Legends Pro Barbers",
        html: `<p>Hi ${name},</p>
               <p>Your appointment at Legends Pro Barbers is confirmed for ${appointment}.</p>
               <p>See you soon!</p>`
      });

      // Email to you (admin)
      await resend.emails.send({
        from: "dimivallas01@gmail.com",
        to: "dimivallas01@gmail.com",
        subject: "New Booking Received",
        html: `<p>New booking from ${name} (${email}) for ${appointment}</p>`
      });

      res.status(200).json({ message: "Emails sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send emails" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
