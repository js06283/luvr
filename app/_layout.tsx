import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { FormProvider } from './forms/FormContext';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  if (isAuthenticated === null) {
    return null; // or a loading screen
  }

  return (
    <FormProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="login" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
        <Stack.Screen name="forms" />
        <Stack.Screen name="people" />
        <Stack.Screen name="dates" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </FormProvider>
  );
}
