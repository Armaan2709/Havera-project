'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const ADMIN_EMAIL = "admin@havera.com"

type AuthContextType = {
  user: User | null
  isAdmin: boolean
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        const activeUser = user || session?.user || null
        setUser(activeUser)

        if (activeUser) {
          let adminStatus = activeUser.email === ADMIN_EMAIL
          try {
            const { data } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', activeUser.id)
              .single()
            
            if (data?.role === 'admin') {
              adminStatus = true
            }
          } catch (err) {
            console.error("Profile fetch error:", err)
          }
          setIsAdmin(adminStatus)
        }
      } catch (error) {
        console.error('Auth init error:', error)
        setUser(null)
        setIsAdmin(false)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          let adminStatus = session.user.email === ADMIN_EMAIL
          try {
            const { data } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()
            
            if (data?.role === 'admin') {
              adminStatus = true
            }
          } catch (err) {
            console.error("Profile fetch error:", err)
          }
          setIsAdmin(adminStatus)
        } else {
          setIsAdmin(false)
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) throw error

    if (data.user) {
      const { error: metaError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          role: 'user',
        })

      if (metaError) console.error("Profile creation failed:", metaError)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
