// This is a client-side utility for generating PDFs from HTML content
import html2pdf from "html2pdf.js"

export const generatePDF = async (elementId: string, filename = "resume.pdf", options = {}): Promise<void> => {
  // Get the HTML element to convert
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`)
  }

  // Default options
  const defaultOptions = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  }

  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options }

  try {
    // Generate PDF
    await html2pdf().from(element).set(mergedOptions).save()
    return Promise.resolve()
  } catch (error) {
    console.error("Error generating PDF:", error)
    return Promise.reject(error)
  }
}

export const previewPDF = async (elementId: string, options = {}): Promise<string> => {
  // Get the HTML element to convert
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`)
  }

  // Default options
  const defaultOptions = {
    margin: [10, 10, 10, 10],
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  }

  // Merge default options with provided options
  const mergedOptions = { ...defaultOptions, ...options }

  try {
    // Generate PDF but don't save - return as data URL
    const pdf = await html2pdf().from(element).set(mergedOptions).outputPdf("datauristring")
    return Promise.resolve(pdf as string)
  } catch (error) {
    console.error("Error generating PDF preview:", error)
    return Promise.reject(error)
  }
}
