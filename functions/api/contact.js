export async function onRequest(context) {
  const { request } = context;
  const origin = request.headers.get("Origin") || "*";
  
  // Set up CORS headers so localhost frontend can talk directly to the backend
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Handle the browser's automatic security preflight check
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Block any non-POST methods
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ success: false, message: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    let name = "";
    let email = "";
    let message = "";

    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name;
      email = body.email;
      message = body.message;
    } else {
      const incomingForm = await request.formData();
      name = incomingForm.get("name");
      email = incomingForm.get("email");
      message = incomingForm.get("message");
    }
    
    const outFormData = new FormData();
    outFormData.append("access_key", context.env.FORM_API_KEY); 
    outFormData.append("name", name || "Anonymous Inquiry");
    outFormData.append("email", email || "no-reply@dev.local");
    outFormData.append("message", message || "No message provided.");
    outFormData.append("subject", "New Immersive Horizon Collaboration Inquiry");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: outFormData,
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: corsHeaders,
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}