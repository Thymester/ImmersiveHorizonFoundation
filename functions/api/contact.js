export async function onRequestPost(context) {
  try {
    let name = "";
    let email = "";
    let message = "";

    // Safely check content headers to resolve local proxy routing differences
    const contentType = context.request.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      const body = await context.request.json();
      name = body.name;
      email = body.email;
      message = body.message;
    } else {
      const incomingForm = await context.request.formData();
      name = incomingForm.get("name");
      email = incomingForm.get("email");
      message = incomingForm.get("message");
    }
    
    // Construct a secure payload to push to Web3Forms using dashboard environment variable
    const outFormData = new FormData();
    outFormData.append("access_key", context.env.FORM_API_KEY); 
    outFormData.append("name", name || "Anonymous Inquiry");
    outFormData.append("email", email || "no-reply@dev.local");
    outFormData.append("message", message || "No message provided.");
    outFormData.append("subject", "New Immersive Horizon Collaboration Inquiry");

    // Forward standard form fields directly to the Web3Forms API from the edge backend
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: outFormData,
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 
        "Content-Type": "application/json"
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}