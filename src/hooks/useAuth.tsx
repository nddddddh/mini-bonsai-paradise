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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);

      if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        console.log('User signed in with email:', session.user.email);

        try {
          const { data: existingAccount, error: selectError } = await supabase
            .from('accounts')
            .select('*')
            .eq('email', session.user.email)
            .maybeSingle();

          console.log('Checking existing account:', { existingAccount, selectError });

          if (existingAccount) {
            console.log('Email exists, using existing account:', existingAccount);
            setUser(existingAccount);
            localStorage.setItem('user', JSON.stringify(existingAccount));
          } else {
            console.log('Email not found, creating new account for:', session.user.email);

            const newAccountData = {
              email: session.user.email!,
              full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'Google User',
              username: session.user.email?.split('@')[0] || 'googleuser',
              phone: null,
              address: null,
              password_hash: 'google_oauth',
              role: 0
            };

            const { data: newAccount, error: insertError } = await supabase
              .from('accounts')
              .insert(newAccountData)
              .select()
              .single();

            console.log('New account creation result:', { newAccount, insertError });

            if (newAccount && !insertError) {
              console.log('Successfully created new account:', newAccount);
              setUser(newAccount);
              localStorage.setItem('user', JSON.stringify(newAccount));
            } else {
              console.error('Failed to create new account:', insertError);
            }
          }
        } catch (error) {
          console.error('Error during Google login process:', error);
        }
      } else if (event === 'SIGNED_OUT' || !session) {
        console.log('User signed out, clearing state');
        setUser(null);
        localStorage.removeItem('user');
      }

      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }

      if (!session) {
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

      // WARNING: Password not validated in this demo
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
      console.log('Starting Google login...');

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Google login error:', error);
        return false;
      }

      console.log('Google login initiated successfully');
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