document.getElementById("contactForm").onsubmit = async (e) => {
  e.preventDefault();
  const handle = document.getElementById("handle").value;
  const answer = document.getElementById("answer").value;

  const res = await fetch("https://jarvis-contact-ai.onrender.com/api/request_contact", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
});

  const data = await res.json();
  document.getElementById("result").innerText =
    data.status === "verified"
      ? `✅ Verified! Access link: ${data.link}`
      : "❌ Verification failed.";
};
