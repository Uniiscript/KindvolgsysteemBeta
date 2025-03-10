const express = require("express");
const { Resend } = require("@resend/client");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Maak een nieuwe Resend client
const resend = new Resend("re_M746zJKK_My7DGjhF1921oAfJ4ggh7g3t"); // Vervang door je Resend API-sleutel

// Route om formuliergegevens te ontvangen
app.post("/send-email", async (req, res) => {
  const {
    parentName,
    contactOptions,
    phone,
    email,
    numChildren,
    expecting,
    dueDate,
    children,
  } = req.body;

  const emailContent = `
    <p><strong>Naam ouder:</strong> ${parentName}</p>
    <p><strong>Contactmogelijkheden:</strong> ${Object.keys(contactOptions)
      .filter((key) => contactOptions[key])
      .join(", ")}</p>
    ${contactOptions.phone ? `<p><strong>Telefoonnummer:</strong> ${phone}</p>` : ""}
    ${contactOptions.email ? `<p><strong>E-mail:</strong> ${email}</p>` : ""}
    <p><strong>Aantal kinderen:</strong> ${numChildren}</p>
    ${expecting ? `<p><strong>In verwachting:</strong> Ja (uitgerekende datum: ${dueDate})</p>` : ""}
    <h3>Kinderen:</h3>
    ${children
      .map(
        (child, index) =>
          `<p><strong>Kind ${index + 1}:</strong> Naam: ${child.name}, Geboortedatum: ${child.birthdate}, Leeftijd: ${child.age}</p>`
      )
      .join("")}
  `;

  try {
    // Stuur e-mail via Resend
    await resend.sendEmail({
      from: "littlestepscare4you@gmail.com", // Vervang door je afzender e-mailadres
      to: "josjehage@gmail.com", // Vervang door het ontvanger e-mailadres
      subject: `Nieuw bericht van ${parentName}`,
      html: emailContent,
    });

    res.status(200).send("Bericht succesvol verzonden!");
  } catch (error) {
    console.error("Fout bij het verzenden van de e-mail:", error);
    res.status(500).send("Er is een fout opgetreden bij het verzenden van de e-mail.");
  }
});

app.listen(3001, () => {
  console.log("Server draait op http://localhost:3001");
});
