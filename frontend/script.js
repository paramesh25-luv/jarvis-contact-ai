document.querySelector("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const instagram = document.querySelector("#instagram").value;
    const answer = document.querySelector("#answer").value;
    const responseBox = document.querySelector("#response");

    try {
        const res = await fetch("https://jarvis-contact-ai.onrender.com/api/request_contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                instagram: instagram,
                answer: answer
            })
        });

        const data = await res.json();

        if (res.ok) {
            responseBox.innerHTML = `<p style="color:lightgreen;"><strong>✅ ${data.message}</strong></p>`;
            if (data.contacts) {
                responseBox.innerHTML += `
                    <p>Email: ${data.contacts.email}</p>
                    <p>LinkedIn: <a href="${data.contacts.linkedin}" target="_blank">${data.contacts.linkedin}</a></p>
                    <p>GitHub: <a href="${data.contacts.github}" target="_blank">${data.contacts.github}</a></p>
                `;
            }
        } else {
            responseBox.innerHTML = `<p style="color:red;">❌ ${data.error || "Verification failed."}</p>`;
        }
    } catch (error) {
        console.error(error);
        responseBox.innerHTML = `<p style="color:red;">⚠️ Error connecting to server.</p>`;
    }
});

