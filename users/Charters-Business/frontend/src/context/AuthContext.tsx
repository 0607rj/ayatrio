"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { flushTrackingToBackend } from "@/lib/Tracking";
import { getAuthToken, removeAuthToken, setAuthToken } from "@/lib/utils/cookies";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  courseInterestedIn?: string | null;
  isFirstLogin?: boolean;
  lastResumeUrl?: string | null;
  lastResumeUploadedAt?: string | null;
}

interface Application {
  applicationNumber: string;
  status: string;
  program?: string;
  createdAt?: string;
}

interface Counseling {
  counselingNumber: string;
  status: string;
  program?: string;
  counselingDate?: string;
  counselingTime?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  applications: Application[];
  counselings: Counseling[];
  token: string | null;
  isLoading: boolean;
  authReady: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  loginWithPhone: (idToken: string) => Promise<string | undefined>;
  signupWithPhone: (
    idToken: string,
    name: string,
    email: string,
    password: string,
    program?: string
  ) => Promise<string | undefined>;
  logout: () => void;
  quickLogin: () => Promise<string | undefined>;
  setAuth: (
    user: User,
    token: string,
    applications?: Application[],
    counselings?: Counseling[]
  ) => void;
  updateUser: (userData: Partial<User>) => void;
  refreshApplications: () => Promise<void>;
  refreshCounselings: () => Promise<void>;
  generateRedirectCode: () => Promise<string | null>;
  exchangeCode: (code: string) => Promise<void>;
  redirectCode: string | null;
  isCodeGenerated: boolean;
  navigateToRemoteDashboard: (remotePath: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_V1 = (process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/api/backend") + "/api/v1";

function createHttpError(message: string, status: number) {
  const error = new Error(message) as Error & { status?: number };
  error.status = status;
  return error;
}

async function readJsonSafely<T>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function getResponseMessage(
  data: { message?: string } | null,
  fallbackMessage: string,
  status: number,
) {
  if (data?.message) {
    return data.message;
  }

  if (status >= 500) {
    return "We couldn't reach the server. Please try again in a moment.";
  }

  return fallbackMessage;
}

interface LoginPayloadUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
  courseInterestedIn?: string | null;
  isFirstLogin?: boolean;
  lastResumeUrl?: string | null;
  lastResumeUploadedAt?: string | null;
}

interface LoginPayload {
  token?: string;
  user?: LoginPayloadUser;
  data?: {
    token?: string;
    user?: LoginPayloadUser;
    applications?: Application[];
    counselings?: Counseling[];
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [counselings, setCounselings] = useState<Counseling[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  //add
  const [authReady, setAuthReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [redirectCode, setRedirectCode] = useState<string | null>(null);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);


  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initAuth = async () => {
      const storedToken = localStorage.getItem("token") || getAuthToken();
      const storedUser = localStorage.getItem("user");
      const storedApplications = localStorage.getItem("applications");
      const storedCounselings = localStorage.getItem("counselings");

      if (!storedToken) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
        setAuthReady(true);
        return;
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          if (storedApplications) setApplications(JSON.parse(storedApplications));
          if (storedCounselings) setCounselings(JSON.parse(storedCounselings));
        } catch (error) {
          console.error("Error loading auth data:", error);
        }
      }
      setToken(storedToken);

      try {
        const res = await fetch(`${API_V1}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Invalid session");

        const data = await readJsonSafely<{ data?: any }>(res);
        const apiUser = data?.data;

        if (apiUser) {
          const userData: User = {
            id: apiUser.id || apiUser._id,
            name: apiUser.name,
            email: apiUser.email,
            avatar: apiUser.avatar || null,
            role: apiUser.role,
            courseInterestedIn: apiUser.courseInterestedIn || null,
            isFirstLogin: apiUser.isFirstLogin || false,
            lastResumeUrl: apiUser.lastResumeUrl || null,
            lastResumeUploadedAt: apiUser.lastResumeUploadedAt || null,
          };

          setAuthToken(storedToken);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));

          if (apiUser.applications) {
            setApplications(apiUser.applications);
            localStorage.setItem("applications", JSON.stringify(apiUser.applications));
          }
        }
      } catch (err) {
        console.error("Session revalidation failed:", err);
        localStorage.clear();
        sessionStorage.clear();
        removeAuthToken();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false); setAuthReady(true);
}
      
    };

    initAuth();
  }, [isMounted]);

  const refreshApplications = useCallback(
    async (authToken?: string) => {
      const tkn = authToken || token;
      if (!tkn) return;

      try {
        const response = await fetch(`${API_V1}/applications/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tkn}`,
          },
        });

        const data = await readJsonSafely<{ data?: Application[] }>(response);

        if (response.ok && data?.data) {
          setApplications(data.data);
          if (isMounted)
            localStorage.setItem(
              "applications",
              JSON.stringify(data.data)
            );
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    },
    [token, isMounted]
  );

  const refreshCounselings = useCallback(
    async (authToken?: string) => {
      const tkn = authToken || token;
      if (!tkn) return;

      try {
        const response = await fetch(`${API_V1}/counseling/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tkn}`,
          },
        });

        const data = await readJsonSafely<{ data?: Counseling[] }>(response);

        if (response.ok && data?.data) {
          setCounselings(data.data);
          if (isMounted)
            localStorage.setItem(
              "counselings",
              JSON.stringify(data.data)
            );
        }
      } catch (error) {
        console.error("Error fetching counselings:", error);
      }
    },
    [token, isMounted]
  );

  const finalizeLogin = useCallback(
    async (payload: LoginPayload): Promise<string | undefined> => {
      const tokenFromApi: string | undefined =
        payload?.data?.token ?? payload?.token;

      const apiUser = payload?.data?.user ?? payload?.user;

      if (!tokenFromApi || !apiUser) {
        console.error("Login response missing token or user:", payload);
        throw new Error("Login response invalid (missing token/user)");
      }

      const userData: User = {
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        avatar: apiUser.avatar || null,
        role: apiUser.role,
        courseInterestedIn: apiUser.courseInterestedIn || null,
        isFirstLogin: apiUser.isFirstLogin || false,
        lastResumeUrl: apiUser.lastResumeUrl || null,
        lastResumeUploadedAt: apiUser.lastResumeUploadedAt || null,
      };

      setUser(userData);
      setToken(tokenFromApi);
      setApplications(payload?.data?.applications || []);
      setCounselings(payload?.data?.counselings || []);

      if (isMounted) {
        setAuthToken(tokenFromApi);
        localStorage.setItem("token", tokenFromApi);
        localStorage.setItem("user", JSON.stringify(userData));

        if (payload?.data?.applications) {
          localStorage.setItem(
            "applications",
            JSON.stringify(payload.data.applications)
          );
        }

        if (payload?.data?.counselings) {
          localStorage.setItem(
            "counselings",
            JSON.stringify(payload.data.counselings)
          );
        }

        sessionStorage.setItem("justLoggedIn", "true");
      }

      try {
        await flushTrackingToBackend("/api/backend", tokenFromApi);
      } catch (e) {
        console.warn("Tracking flush failed:", e);
      }

      return userData.role;
    },
    [isMounted]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await fetch(`${API_V1}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await readJsonSafely<LoginPayload & { message?: string }>(
        response,
      );

      if (!response.ok)
        throw createHttpError(
          getResponseMessage(data, "Login failed", response.status),
          response.status,
        );

      if (!data) {
        throw createHttpError(
          "Login failed. The server returned an empty response.",
          response.status || 500,
        );
      }

      return finalizeLogin(data);
    },
    [finalizeLogin]
  );

  const loginWithPhone = useCallback(
    async (idToken: string) => {
      const response = await fetch(`${API_V1}/auth/firebase-login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await readJsonSafely<LoginPayload & { message?: string }>(
        response,
      );

      if (!response.ok)
        throw createHttpError(
          getResponseMessage(data, "Phone login failed", response.status),
          response.status
        );

      if (!data) {
        throw createHttpError(
          "Phone login failed. The server returned an empty response.",
          response.status || 500,
        );
      }

      return finalizeLogin(data);
    },
    [finalizeLogin]
  );

  const signupWithPhone = useCallback(
    async (
      idToken: string,
      name: string,
      email: string,
      password: string,
      program?: string
    ) => {
      const response = await fetch(`${API_V1}/auth/firebase-signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, name, email, password, program }),
      });

      const data = await readJsonSafely<LoginPayload & { message?: string }>(
        response,
      );

      if (!response.ok)
        throw createHttpError(
          getResponseMessage(data, "Phone signup failed", response.status),
          response.status
        );

      if (!data) {
        throw createHttpError(
          "Phone signup failed. The server returned an empty response.",
          response.status || 500,
        );
      }

      return finalizeLogin(data);
    },
    [finalizeLogin]
  );

  const quickLogin = useCallback(async () => {
    // Quick login removed per security requirements (do not auto auth with cookies)
    throw new Error("Quick login disabled");
  }, []);

   const generateRedirectCode = useCallback(async () => {
    // 1. Sync fallback: read token from state, localStorage, or cookie
    let activeToken = 
      token || 
      (typeof window !== 'undefined' 
        ? (localStorage.getItem("token") || getAuthToken()) 
        : null);

        if (!activeToken) {
    activeToken =
      token ||
      getAuthToken();
  }

    if (activeToken === "local-dev-token") {
      console.warn("Skipping redirect code generation in local bypass mode");
      return null;
    }
    if (!activeToken) {
      console.warn("No auth token available for redirect-code generation");
      return null;
    }
    try {
      const response = await fetch(`${API_V1}/auth/redirect-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`, // 2. Pass the activeToken
        },
        credentials: "include",
      });

      const data = await readJsonSafely<{ data?: { code?: string }; message?: string }>(response);

      if (!response.ok || !data) {
        throw new Error(data?.message || "Redirect code generation failed");
      }

      const code = data.data?.code || null;
      setRedirectCode(code);
      setIsCodeGenerated(true);
      return code;
    } catch (error) {
      console.error("Error generating redirect code:", error);
      return null;
    }
  }, [token]);
  
  const navigateToRemoteDashboard = useCallback(async (remotePath: string) => {
    
    try {
      const code = await generateRedirectCode();
      if (code) {
        const baseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001';
        const url = new URL(remotePath, baseUrl);
        url.searchParams.set('code', code);
        window.location.href = url.toString();
      } else {
        console.error("Failed to generate redirect code for remote navigation");
      }
    } catch (error) {
      console.error("Remote redirect error:", error);
    }
  }, [generateRedirectCode,token,router]);

  const exchangeCode = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_V1}/auth/exchange-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });

      const data = await readJsonSafely<LoginPayload & { message?: string }>(response);

      if (!response.ok || !data) {
        throw new Error(data?.message || "Code exchange failed");
      }

      await finalizeLogin(data);
    } catch (error) {
      console.error("Exchanging code failed:", error);
    } finally {
      setIsLoading(false);
      setAuthReady(true);
    }
  }, [finalizeLogin]);

  // Handle automatic code exchange if 'code' is present in URL
  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      exchangeCode(code).then(() => {
        // Clean up URL
        const newUrl = window.location.pathname + window.location.search.replace(/[?&]code=[^&]+/, "").replace(/^&/, "?").replace(/\?$/, "");
        window.history.replaceState({}, document.title, newUrl);
      });
    }
  }, [isMounted, exchangeCode]);

  const logout = useCallback(() => {
    const headers: HeadersInit | undefined = token
      ? {
        Authorization: `Bearer ${token}`,
      }
      : undefined;

    void fetch(`${API_V1}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers,
      keepalive: true,
    }).catch((error) => {
      console.warn("Logout request failed:", error);
    });

    setUser(null);
    setToken(null);
    setApplications([]);
    setCounselings([]);
    removeAuthToken();

    if (isMounted) {
      localStorage.clear();
      sessionStorage.clear();
    }

    router.push("/");
  }, [router, isMounted, token]);

  const setAuth = useCallback(
    (
      newUser: User,
      newToken: string,
      newApplications?: Application[],
      newCounselings?: Counseling[]
    ) => {
      setUser(newUser);
      setToken(newToken);

      if (newApplications) setApplications(newApplications);
      if (newCounselings) setCounselings(newCounselings);

      if (isMounted) {
        setAuthToken(newToken);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    },
    [isMounted]
  );

  const updateUser = useCallback(
    (userData: Partial<User>) => {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      if (isMounted)
        localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    [user, isMounted]
  );

  const contextValue = useMemo(
    () => ({
      user,
      applications,
      counselings,
      token,
      isLoading,
      authReady,
      login,
      loginWithPhone,
      signupWithPhone,
      logout,
      quickLogin,
      setAuth,
      updateUser,
      refreshApplications,
      refreshCounselings,
      generateRedirectCode,
      exchangeCode,
      redirectCode,
      isCodeGenerated,
      navigateToRemoteDashboard,
    }),
    [
      user,
      applications,
      counselings,
      token,
      isLoading,
      authReady,
      login,
      loginWithPhone,
      signupWithPhone,
      logout,
      quickLogin,
      setAuth,
      updateUser,
      refreshApplications,
      refreshCounselings,
      generateRedirectCode,
      exchangeCode,
      navigateToRemoteDashboard,
    ]
  );

  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
}