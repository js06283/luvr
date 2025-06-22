import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { router } from "expo-router";

// Elegant color palette
const colors = {
	primary: "#6366f1",
	primaryLight: "#818cf8",
	primaryDark: "#4f46e5",
	secondary: "#f59e0b",
	background: "#0f172a",
	surface: "#1e293b",
	surfaceLight: "#334155",
	text: "#f8fafc",
	textSecondary: "#cbd5e1",
	textMuted: "#64748b",
	success: "#10b981",
	error: "#ef4444",
	border: "#334155",
	white: "#ffffff",
	black: "#000000",
};

// Typography scale
const typography = {
	h1: { fontSize: 36, fontWeight: "700" as const },
	h2: { fontSize: 28, fontWeight: "600" as const },
	h3: { fontSize: 24, fontWeight: "600" as const },
	body: { fontSize: 16, fontWeight: "400" as const },
	bodyBold: { fontSize: 16, fontWeight: "600" as const },
	caption: { fontSize: 14, fontWeight: "400" as const },
};

// Spacing scale
const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
};

// Border radius
const borderRadius = {
	sm: 6,
	md: 12,
	lg: 16,
	xl: 24,
};

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleAuth = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setIsLoading(true);
		const auth = getAuth(app);

		try {
			if (isSignUp) {
				await createUserWithEmailAndPassword(auth, email, password);
				Alert.alert("Success", "Account created successfully!");
			} else {
				await signInWithEmailAndPassword(auth, email, password);
				Alert.alert("Success", "Logged in successfully!");
			}
			router.replace("/(tabs)");
		} catch (error) {
			Alert.alert(
				"Error",
				error instanceof Error ? error.message : "An error occurred"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.content}>
					{/* App Logo/Title */}
					<View style={styles.logoContainer}>
						<Text style={styles.appTitle}>lolo</Text>
						<Text style={styles.appSubtitle}>
							Share your dating experiences
						</Text>
					</View>

					{/* Form Container */}
					<View style={styles.formContainer}>
						<Text style={styles.title}>
							{isSignUp ? "Create Account" : "Welcome Back"}
						</Text>
						<Text style={styles.subtitle}>
							{isSignUp
								? "Join our community and start sharing"
								: "Sign in to continue your journey"}
						</Text>

						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Email</Text>
							<TextInput
								placeholder="Enter your email"
								placeholderTextColor={colors.textMuted}
								value={email}
								onChangeText={setEmail}
								style={styles.input}
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.inputLabel}>Password</Text>
							<TextInput
								placeholder="Enter your password"
								placeholderTextColor={colors.textMuted}
								value={password}
								onChangeText={setPassword}
								secureTextEntry
								style={styles.input}
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>

						<TouchableOpacity
							onPress={handleAuth}
							style={[styles.button, isLoading && styles.buttonDisabled]}
							disabled={isLoading}
						>
							<Text style={styles.buttonText}>
								{isLoading
									? "Please wait..."
									: isSignUp
									? "Create Account"
									: "Sign In"}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => setIsSignUp(!isSignUp)}
							style={styles.switchButton}
						>
							<Text style={styles.switchText}>
								{isSignUp
									? "Already have an account? Sign In"
									: "Don't have an account? Sign Up"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
	},
	content: {
		padding: spacing.lg,
	},
	logoContainer: {
		alignItems: "center",
		marginBottom: spacing.xxl,
	},
	appTitle: {
		...typography.h1,
		color: colors.primary,
		marginBottom: spacing.sm,
		letterSpacing: -1,
	},
	appSubtitle: {
		...typography.caption,
		color: colors.textSecondary,
		textAlign: "center",
	},
	formContainer: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.xl,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
	},
	title: {
		...typography.h2,
		color: colors.text,
		textAlign: "center",
		marginBottom: spacing.sm,
		letterSpacing: -0.5,
	},
	subtitle: {
		...typography.caption,
		color: colors.textSecondary,
		textAlign: "center",
		marginBottom: spacing.xl,
		lineHeight: 20,
	},
	inputContainer: {
		marginBottom: spacing.lg,
	},
	inputLabel: {
		...typography.bodyBold,
		color: colors.text,
		marginBottom: spacing.sm,
	},
	input: {
		backgroundColor: colors.surfaceLight,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: borderRadius.md,
		padding: spacing.md,
		fontSize: typography.body.fontSize,
		color: colors.text,
		minHeight: 56,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		alignItems: "center",
		marginTop: spacing.lg,
		minHeight: 56,
		justifyContent: "center",
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: colors.white,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
		letterSpacing: 0.5,
	},
	switchButton: {
		marginTop: spacing.lg,
		alignItems: "center",
	},
	switchText: {
		color: colors.primary,
		fontSize: typography.caption.fontSize,
		textDecorationLine: "underline",
	},
});
