
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Account } from '@/types/supabase';

interface AuthContextType {
  user: Account | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider initializing...');
    
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('Found saved user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (session?.user) {
        console.log('Session user found:', session.user);
        
        // Check if user exists in accounts table
        const { data: accountData, error } = await supabase
          .from('accounts')
          .select('*')
          .eq('email', session.user.email)
          .single();

        console.log('Account lookup result:', { accountData, error });

        if (accountData) {
          console.log('Setting existing user:', accountData);
          setUser(accountData);
          localStorage.setItem('user', JSON.stringify(accountData));
        } else if (!error || error.code === 'PGRST116') {
          // User doesn't exist in accounts table, create new account
          console.log('Creating new account for Google user');
          const { data: newAccount, error: insertError } = await supabase
            .from('accounts')
            .insert({
              email: session.user.email!,
              full_name: session.user.user_metadata.full_name || session.user.user_metadata.name || '',
              username: session.user.email!.split('@')[0],
              password_hash: '', // Google users don't have password
              role: 1 // Customer role
            })
            .select()
            .single();

          console.log('New account creation result:', { newAccount, insertError });

          if (newAccount && !insertError) {
            console.log('Setting new user:', newAccount);
            setUser(newAccount);
            localStorage.setItem('user', JSON.stringify(newAccount));
          } else {
            console.error('Failed to create account:', insertError);
          }
        } else {
          console.error('Database error:', error);
        }
      } else {
        console.log('No session user, clearing state');
        setUser(null);
        localStorage.removeItem('user');
      }
      
      setLoading(false);
    });

    // Also check for current session immediately
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        console.log('Current session found:', session.user);
        // The onAuthStateChange will handle this
      } else {
        console.log('No current session');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (!data) {
        console.error('No user found with email:', email);
        return false;
      }

      console.log('User found:', data);
      
      // In a real app, you would verify the password hash here
      // For demo purposes, we'll accept any password for existing users
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      console.log('Login successful, user set:', data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      console.log('Attempting Google login...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Google login error:', error);
        return false;
      }

      console.log('Google login initiated:', data);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out user');
    supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    const result = user?.role === 0;
    console.log('Checking if admin:', user?.role, 'Result:', result);
    return result;
  };

  console.log('AuthProvider rendering, user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
