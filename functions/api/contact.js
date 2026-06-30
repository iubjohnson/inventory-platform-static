// Cloudflare Pages Function — handles POST /api/contact and emails the
// submission via Resend (https://resend.com).
//
// Required env var (set in Cloudflare Pages → Settings → Environment variables):
//   RESEND_API_KEY   — your Resend API key
// Optional env vars (sensible defaults below):
//   CONTACT_TO       — where messages are delivered   (default info@stockwik.com)
//   CONTACT_FROM     — verified Resend sender         (default Stockwik <contact@stockwik.com>)
//
// NOTE: the CONTACT_FROM address must be on a domain you've verified in Resend.

const DEFAULT_TO = "info@stockwik.com";
const DEFAULT_FROM = "Stockwik Website <contact@stockwik.com>";
const MAX_MESSAGE = 5000;

export async function onRequestPost(context) {
  const { request, env } = context;
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");

  // Parse JSON (fetch) or form-encoded (no-JS fallback) bodies.
  let data = {};
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch (e) {
    return respond(wantsJson, request, 400, "We couldn't read your submission. Please try again.");
  }

  // Honeypot: real visitors leave this empty; bots tend to fill it.
  if ((data.company || "").toString().trim() !== "") {
    return respond(wantsJson, request, 200, "Thanks — your message has been sent.");
  }

  const name = (data.name || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const message = (data.message || "").toString().trim();

  if (!name || !email || !message) {
    return respond(wantsJson, request, 400, "Please fill in your name, email, and message.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(wantsJson, request, 400, "That email address doesn't look right.");
  }
  if (message.length > MAX_MESSAGE) {
    return respond(wantsJson, request, 400, "That message is a little long — please keep it under 5000 characters.");
  }

  if (!env.RESEND_API_KEY) {
    return respond(wantsJson, request, 500, "The contact form isn't configured yet. Please email us at " + DEFAULT_TO + ".");
  }

  const to = env.CONTACT_TO || DEFAULT_TO;
  const from = env.CONTACT_FROM || DEFAULT_FROM;
  const text =
    "New contact form submission\n\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n\n" +
    "Message:\n" + message + "\n";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "Stockwik contact — " + name,
        text,
      }),
    });
    if (!res.ok) {
      return respond(wantsJson, request, 502, "We couldn't send your message right now. Please email us at " + to + ".");
    }
  } catch (e) {
    return respond(wantsJson, request, 502, "We couldn't send your message right now. Please email us at " + to + ".");
  }

  if (wantsJson) {
    return Response.json({ ok: true, message: "Thanks — your message has been sent. We'll get back to you shortly." });
  }
  // No-JS form post: send them back to a clean URL with a success flag.
  return Response.redirect(new URL("/contact.html?sent=1", request.url).toString(), 303);
}

// Anything other than POST.
export async function onRequestGet() {
  return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
}

function respond(wantsJson, request, status, message) {
  if (wantsJson) {
    return Response.json({ ok: status < 400, message }, { status });
  }
  return new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
