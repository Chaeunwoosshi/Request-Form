document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requestForm");
    const requestsContainer = document.getElementById("requestsContainer");

    // Load requests from local storage
    const loadRequests = () => JSON.parse(localStorage.getItem("requests") || "[]");

    // Save requests to local storage
    const saveRequest = (request) => {
        const requests = loadRequests();
        requests.push(request);
        localStorage.setItem("requests", JSON.stringify(requests));
    };

    // Display requests on admin page
    const displayRequests = () => {
        if (requestsContainer) {
            const requests = loadRequests();
            requestsContainer.innerHTML = requests.map((req, index) => `
                <div class="request">
                    <h3>${req.title} (${req.type})</h3>
                    <p><strong>Username:</strong> ${req.username}</p>
                    <p><strong>Email:</strong> ${req.email}</p>
                    <p><strong>Plan:</strong> ${req.plan}</p>
                    <p><strong>Description:</strong> ${req.description}</p>
                    ${req.poster ? `<img src="${req.poster}" alt="Poster">` : ""}
                </div>
            `).join("");
        }
    };

    // Form submission handler
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            const request = {
                username: formData.get("username"),
                email: formData.get("email"),
                plan: formData.get("plan"),
                title: formData.get("title"),
                type: formData.get("type"),
                description: formData.get("description"),
                poster: formData.get("poster") 
                    ? URL.createObjectURL(formData.get("poster"))
                    : null
            };

            saveRequest(request);
            alert("Request submitted!");
            form.reset();
        });
    }

    // Display requests if on admin page
    displayRequests();
});

