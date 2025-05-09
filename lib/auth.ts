// This is a mock implementation for demo purposes
// In a real app, this would connect to a backend authentication service

// Mock user data
const mockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
}

// Mock resume data
const mockResumes = [
  {
    id: "resume-1",
    title: "Software Engineer Resume",
    createdAt: "2023-05-15T10:30:00Z",
    lastUpdated: "2023-06-20T14:45:00Z",
    method: "chat" as const,
  },
  {
    id: "resume-2",
    title: "Product Manager Resume",
    createdAt: "2023-07-10T09:15:00Z",
    lastUpdated: "2023-07-10T09:15:00Z",
    method: "form" as const,
  },
]

// Mock login function
export async function login(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any non-empty email/password
      if (email && password) {
        // In a real app, this would set cookies, tokens, etc.
        localStorage.setItem("isLoggedIn", "true")
        resolve()
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}

// Mock signup function
export async function signup(name: string, email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any non-empty values
      if (name && email && password) {
        // In a real app, this would create a user and set auth tokens
        localStorage.setItem("isLoggedIn", "true")
        resolve()
      } else {
        reject(new Error("Invalid information"))
      }
    }, 1000)
  })
}

// Mock logout function
export async function logout(): Promise<void> {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would clear cookies, tokens, etc.
      localStorage.removeItem("isLoggedIn")
      resolve()
    }, 500)
  })
}

// Mock function to get user data
export async function getUser() {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      if (isLoggedIn) {
        resolve(mockUser)
      } else {
        resolve(null)
      }
    }, 500)
  })
}

// Mock function to get user resumes
export async function getUserResumes() {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      resolve(mockResumes)
    }, 800)
  })
}
