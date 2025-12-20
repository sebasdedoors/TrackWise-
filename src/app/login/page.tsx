"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Waves } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.37 1.62-4.24 1.62-4.97 0-9-4.03-9-9s4.03-9 9-9c2.43 0 4.47.86 6.16 2.44l-2.52 2.52c-.81-.78-1.85-1.25-3.64-1.25-3.14 0-5.7 2.54-5.7 5.7s2.56 5.7 5.7 5.7c3.54 0 5.09-2.52 5.3-3.86h-5.3v-3.28h7.84c.08.47.13.95.13 1.56 0 5.2-3.5 9-9 9-4.97 0-9-4.03-9-9s4.03-9 9-9c2.85 0 5.15 1.02 6.8 2.6l-2.5 2.5c-.75-.7-1.7-1.12-3.1-1.12-2.12 0-3.86 1.78-3.86 3.98s1.74 3.98 3.86 3.98c2.48 0 3.42-1.56 3.58-2.68H12.48z"
      ></path>
    </svg>
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signUp, signIn, signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const { formState: { isSubmitting } } = form;

  if (user) {
    router.push('/');
    return null;
  }
  
  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
      } else {
        await signUp(data.email, data.password);
      }
      toast({ title: isLogin ? 'Login Successful' : 'Account Created' });
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleSubmitting(true);
    try {
      await signInWithGoogle();
      toast({ title: 'Login Successful' });
      router.push('/');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('The sign-in popup was closed before completing. If you are the app owner, please ensure this domain is authorized in your Firebase project settings.');
      } else {
        setError(err.message);
      }
    } finally {
        setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Waves className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-bold text-foreground font-headline">
                TrackWise
              </h1>
            </div>
          <CardTitle>{isLogin ? 'Welcome Back!' : 'Create an Account'}</CardTitle>
          <CardDescription>{isLogin ? 'Sign in to continue to your tasks.' : 'Enter your details to get started.'}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting || isGoogleSubmitting}>
                {(isSubmitting && !isGoogleSubmitting) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </Form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isSubmitting || isGoogleSubmitting}>
            {isGoogleSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
