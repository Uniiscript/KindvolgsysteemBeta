// server/api/contactform/list.ts
export default defineEventHandler(async () => {
  const storage = useStorage("contactform");
  const keys = await storage.getKeys();
  const all = await Promise.all(keys.map((key) => storage.getItem(key)));
  return all.reverse(); // nieuwste eerst
});
