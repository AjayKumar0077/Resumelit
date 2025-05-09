// Common JS utilities for RESUMELIT

/**
 * Initializes the animated logo
 * @param {string} containerId - The ID of the logo container
 */
function initAnimatedLogo(containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  // Add animation classes to elements
  const logo = container.querySelector(".logo")
  if (logo) {
    logo.style.transform = "scale(0)"
    setTimeout(() => {
      logo.style.transform = "scale(1)"
      logo.style.transition = "transform 0.5s ease-out"
    }, 200)
  }

  // Animate the logo text letters
  const logoText = container.querySelector(".logo-text")
  if (logoText) {
    const letters = logoText.querySelectorAll("span")
    letters.forEach((letter, index) => {
      letter.style.opacity = "0"
      letter.style.transform = "translateY(20px)"
      letter.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out"

      setTimeout(
        () => {
          letter.style.opacity = "1"
          letter.style.transform = "translateY(0)"
        },
        300 + index * 100,
      )
    })
  }
}

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info)
 * @param {number} duration - How long to show the toast in ms
 */
function showToast(message, type = "info", duration = 3000) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector(".toast-container")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "toast-container"
    toastContainer.style.position = "fixed"
    toastContainer.style.bottom = "1rem"
    toastContainer.style.right = "1rem"
    toastContainer.style.zIndex = "1000"
    document.body.appendChild(toastContainer)
  }

  // Create toast element
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  // Style the toast
  Object.assign(toast.style, {
    backgroundColor:
      type === "error"
        ? "rgba(239, 68, 68, 0.9)"
        : type === "success"
          ? "rgba(34, 197, 94, 0.9)"
          : "rgba(59, 130, 246, 0.9)",
    color: "white",
    padding: "0.75rem 1rem",
    borderRadius: "0.375rem",
    marginBottom: "0.5rem",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    opacity: "0",
    transform: "translateY(1rem)",
    transition: "opacity 0.3s, transform 0.3s",
    backdropFilter: "blur(10px)",
    maxWidth: "20rem",
  })

  // Add toast to container
  toastContainer.appendChild(toast)

  // Animate toast in
  setTimeout(() => {
    toast.style.opacity = "1"
    toast.style.transform = "translateY(0)"
  }, 10)

  // Remove toast after duration
  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transform = "translateY(1rem)"

    // Remove from DOM after animation
    setTimeout(() => {
      toastContainer.removeChild(toast)

      // Remove container if empty
      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer)
      }
    }, 300)
  }, duration)
}

/**
 * Mock authentication functions
 */
const Auth = {
  login: (email, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userEmail", email)
          resolve({ success: true })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    }),

  signup: (name, email, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("userName", name)
          localStorage.setItem("userEmail", email)
          resolve({ success: true })
        } else {
          reject(new Error("Invalid information"))
        }
      }, 1000)
    }),

  logout: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("isLoggedIn")
        resolve({ success: true })
      }, 500)
    }),

  isLoggedIn: () => localStorage.getItem("isLoggedIn") === "true",

  getUserInfo: function () {
    if (!this.isLoggedIn()) return null

    return {
      name: localStorage.getItem("userName") || "User",
      email: localStorage.getItem("userEmail") || "user@example.com",
    }
  },

  checkAuth: function () {
    if (!this.isLoggedIn()) {
      window.location.href = "/login.html"
      return false
    }
    return true
  },
}

/**
 * Add event listener for page load to check authentication
 * Use in protected pages like dashboard.html
 */
function requireAuth() {
  window.addEventListener("DOMContentLoaded", () => {
    Auth.checkAuth()
  })
}

/**
 * Mock resume data storage
 */
const ResumeStorage = {
  getResumes: () => {
    const resumesStr = localStorage.getItem("resumes") || "[]"
    return JSON.parse(resumesStr)
  },

  saveResume: function (resumeData) {
    const resumes = this.getResumes()
    const now = new Date().toISOString()

    const newResume = {
      id: `resume-${Date.now()}`,
      title: resumeData.title || "Untitled Resume",
      createdAt: now,
      lastUpdated: now,
      method: resumeData.method || "form",
      data: resumeData,
    }

    resumes.push(newResume)
    localStorage.setItem("resumes", JSON.stringify(resumes))

    return newResume
  },

  updateResume: function (id, resumeData) {
    const resumes = this.getResumes()
    const index = resumes.findIndex((r) => r.id === id)

    if (index === -1) {
      throw new Error("Resume not found")
    }

    const updatedResume = {
      ...resumes[index],
      ...resumeData,
      lastUpdated: new Date().toISOString(),
    }

    resumes[index] = updatedResume
    localStorage.setItem("resumes", JSON.stringify(resumes))

    return updatedResume
  },

  deleteResume: function (id) {
    const resumes = this.getResumes()
    const filteredResumes = resumes.filter((r) => r.id !== id)
    localStorage.setItem("resumes", JSON.stringify(filteredResumes))
    return true
  },

  getResumeById: function (id) {
    const resumes = this.getResumes()
    return resumes.find((r) => r.id === id) || null
  },
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
