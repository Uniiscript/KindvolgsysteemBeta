# Nuxt interior generator

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

# Resources

- Shadcn nuxt
- unovue
- inspira UI
- shadcn vue landing page

## FAQ and issues how to

- [Vue Router warn]: No match found for location with path "/sw.js"  => Go to F12 => Application => Service Worker => unregister

Create a .env file. Generate a 128 bit (16 byte) string, base64 encode it, and set it as `ENCRYPTION_KEY`.

```bash
ENCRYPTION_KEY="L9pmqRJnO1ZJSQ2svbHuBA=="
```

> You can use OpenSSL to quickly generate a secure key.
>
> ```bash
> openssl rand --base64 16
> `

- Having a *.db file in the root of your project causes a Nuxt crash on db insert on windows
