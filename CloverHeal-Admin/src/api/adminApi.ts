const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("admin_token", data.access_token);
  return data;
}

export function logoutAdmin() {
  localStorage.removeItem("admin_token");
}

export async function fetchPendingCases() {
  const response = await fetch(`${API_BASE}/admin/pending`, {
    headers: authHeaders()
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      logoutAdmin();
      throw new Error("Session expired. Please login again.");
    }
    throw new Error("Failed to fetch cases");
  }

  return response.json();
}

export async function fetchAllCases() {
  const response = await fetch(`${API_BASE}/admin/cases`, {
    headers: authHeaders()
  });

  if (!response.ok) throw new Error("Failed to fetch cases");
  return response.json();
}

export async function fetchCaseDetail(caseId: number) {
  const response = await fetch(`${API_BASE}/admin/cases/${caseId}`, {
    headers: authHeaders()
  });

  if (!response.ok) throw new Error("Failed to fetch case detail");
  return response.json();
}

export async function reviewCase(caseId: number, data: { doctor_comment?: string; severity?: string; status: string }) {
  const response = await fetch(`${API_BASE}/admin/review/${caseId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Failed to review case");
  return response.json();
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE}/admin/stats`, {
    headers: authHeaders()
  });

  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
}
