const API_BASE = "http://localhost:8000";

export async function submitSymptomCheck(text: string) {
  const response = await fetch(`${API_BASE}/symptom-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    throw new Error(`Symptom check failed: ${response.statusText}`);
  }

  return response.json();
}

export async function submitAssessment(data: any) {
  const response = await fetch(`${API_BASE}/cases/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Assessment submission failed: ${response.statusText}`);
  }

  return response.json();
}