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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signUp, signIn, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-6">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
