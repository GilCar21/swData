'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '../../../../auth';

export default async function login(formData: FormData) {
  const entries = Array.from(formData.entries());
  const { email, password } = Object.fromEntries(entries) as {
    email: string;
    password: string;
  };

  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === 'CredentialsSignin' || e.type === 'CallbackRouteError') {
        throw new Error('Credenciais inválidas');
      }
    }
  }

  redirect('/');
}