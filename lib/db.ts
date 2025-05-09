// Database service for RESUMELIT
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User Authentication
export async function signUp(email: string, password: string, fullName: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error signing up:", error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Resume Operations
export async function saveResume(resumeData: any) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("User not authenticated")

    const { data, error } = await supabase
      .from("resumes")
      .insert([
        {
          user_id: user.id,
          title: resumeData.title,
          data: resumeData,
          method: resumeData.method || "form",
        },
      ])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error saving resume:", error)
    throw error
  }
}

export async function getUserResumes() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("User not authenticated")

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error getting user resumes:", error)
    throw error
  }
}

export async function getResumeById(id: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("User not authenticated")

    const { data, error } = await supabase.from("resumes").select("*").eq("id", id).eq("user_id", user.id).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error getting resume:", error)
    throw error
  }
}

export async function updateResume(id: string, resumeData: any) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("User not authenticated")

    const { data, error } = await supabase
      .from("resumes")
      .update({
        title: resumeData.title,
        data: resumeData,
        updated_at: new Date(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error updating resume:", error)
    throw error
  }
}

export async function deleteResume(id: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("User not authenticated")

    const { error } = await supabase.from("resumes").delete().eq("id", id).eq("user_id", user.id)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting resume:", error)
    throw error
  }
}
