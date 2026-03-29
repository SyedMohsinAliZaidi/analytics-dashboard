import type { DashboardData } from "../types/dashboard";

export type DateRange = "7d" | "30d" | "6m";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const fetchDashboardData = async (
  range: DateRange
): Promise<DashboardData> => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/dashboard?range=${range}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 401 || response.status === 403) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
};