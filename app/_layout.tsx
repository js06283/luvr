import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Redirect } from "expo-router";

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
		<Stack screenOptions={{ headerShown: false }}>
			{!isAuthenticated ? (
				<Stack.Screen name="login" />
			) : (
				<Stack.Screen name="(tabs)" />
			)}
			<Stack.Screen name="+not-found" />
		</Stack>
	);
}
