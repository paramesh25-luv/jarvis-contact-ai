document.getElementById("contactForm").onsubmit = async (e) => {
  e.preventDefault();
  const handle = document.getElementById("handle").value;
  const answer = document.getElementById("answer").value;

  const res = await fetch("https://your-backend-url.onrender.com/api/request_contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ handle, answer })
  });

  const data = await res.json();
  document.getElementById("result").innerText =
    data.status === "verified"
      ? `✅ Verified! Access link: ${data.link}`
      : "❌ Verification failed.";
};
