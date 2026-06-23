export async function onRequestPost(context) {
  try {
    // Extract incoming multipart form data fields from the React app
    const incomingForm = await context.request.formData();
    
    // Construct a secure payload to push to Web3Forms using your dashboard environment variable
    const outFormData = new FormData();
    outFormData.append("access_key", context.env.FORM_API_KEY); 
    outFormData.append("name", incomingForm.get("name"));
    outFormData.append("email", incomingForm.get("email"));
    outFormData.append("message", incomingForm.get("message"));
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