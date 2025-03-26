// server/api/contactform.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const timestamp = new Date().toISOString();

  const storage = useStorage("contactform");

  // Genereer unieke ID (kan ook met nanoid)
  const id = `${timestamp}-${Math.random().toString(36).slice(2)}`;

  // Opslaan in lokale db: .data/db/contactform
  await storage.setItem(id, {
    id,
    timestamp,
    ...body,
  });

  return { success: true, id };
});

async function sendMail(formData: Record<string, any>) {
  await fetch("/api/send-mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

// Example usage
const formData = { name: "Josje", email: "littlestepscare4you@gmail.com" }; // Replace with actual data
sendMail(formData);

