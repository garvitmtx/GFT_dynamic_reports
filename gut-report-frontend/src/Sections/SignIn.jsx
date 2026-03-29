import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"

export default function SignIn() {
  const [kitId, setKitId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
	console.log("In signin page")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://35.154.159.18:3000/api/verify-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kit_id: kitId,
          phone_number: phone,
        }),
      });
	  
      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      // ✅ Store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("kit_id", kitId);

      // Redirect to report page
      navigate("/overview");

    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-card">
        <h2>Access To Your GFT Report</h2>

        <input
          type="text"
          placeholder="Enter Kit ID"
          value={kitId}
          onChange={(e) => setKitId(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Verify & Continue</button>
      </form>
    </div>
  );
}
