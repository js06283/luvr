// import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import Post from "../../components/Post";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { Link } from "expo-router";
// import { app } from "../../firebaseConfig.js";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
	ScrollView,
} from "react-native";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
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
	h1: { fontSize: 32, fontWeight: "700" as const },
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

export default function Home() {
	const handleSignOut = async () => {
		try {
			await getAuth(app).signOut();
			router.replace("/login");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const handleViewAllPosts = () => {
		router.push("/posts");
	};

	const handleCreatePost = () => {
		router.push("/forms/date");
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.content}>
				{/* Header Section */}
				<View style={styles.headerSection}>
					<Text style={styles.welcomeText}>Welcome to</Text>
					<Text style={styles.appTitle}>lolo</Text>
					<Text style={styles.subtitle}>
						Share and discover dating experiences
					</Text>
				</View>

				{/* Quick Stats */}
				<View style={styles.statsContainer}>
					<View style={styles.statCard}>
						<Text style={styles.statNumber}>0</Text>
						<Text style={styles.statLabel}>Your Posts</Text>
					</View>
					<View style={styles.statCard}>
						<Text style={styles.statNumber}>0</Text>
						<Text style={styles.statLabel}>Total Posts</Text>
					</View>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionsContainer}>
					<TouchableOpacity
						style={[styles.button, styles.primaryButton]}
						onPress={handleCreatePost}
					>
						<Text style={styles.buttonText}>Create New Post</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.secondaryButton]}
						onPress={handleViewAllPosts}
					>
						<Text style={styles.secondaryButtonText}>View All Posts</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.outlineButton]}
						onPress={handleSignOut}
					>
						<Text style={styles.outlineButtonText}>Sign Out</Text>
					</TouchableOpacity>
				</View>

				{/* Recent Activity */}
				<View style={styles.recentSection}>
					<Text style={styles.sectionTitle}>Recent Activity</Text>
					<View style={styles.emptyState}>
						<Text style={styles.emptyStateText}>
							No posts yet. Start by creating your first post!
						</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	content: {
		padding: spacing.lg,
		paddingTop: spacing.xl,
	},
	headerSection: {
		alignItems: "center",
		marginBottom: spacing.xxl,
	},
	welcomeText: {
		...typography.caption,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	appTitle: {
		...typography.h1,
		color: colors.primary,
		marginBottom: spacing.sm,
		letterSpacing: -1,
	},
	subtitle: {
		...typography.caption,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 20,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: spacing.xxl,
	},
	statCard: {
		flex: 1,
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginHorizontal: spacing.xs,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	statNumber: {
		...typography.h2,
		color: colors.primary,
		marginBottom: spacing.xs,
	},
	statLabel: {
		...typography.caption,
		color: colors.textSecondary,
		textAlign: "center",
	},
	actionsContainer: {
		marginBottom: spacing.xxl,
	},
	button: {
		paddingVertical: spacing.md,
		borderRadius: borderRadius.md,
		alignItems: "center",
		marginBottom: spacing.md,
		minHeight: 56,
		justifyContent: "center",
	},
	primaryButton: {
		backgroundColor: colors.primary,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	secondaryButton: {
		backgroundColor: colors.success,
		shadowColor: colors.success,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	outlineButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: colors.border,
	},
	buttonText: {
		color: colors.white,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
		letterSpacing: 0.5,
	},
	secondaryButtonText: {
		color: colors.white,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
		letterSpacing: 0.5,
	},
	outlineButtonText: {
		color: colors.textSecondary,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
	},
	recentSection: {
		marginBottom: spacing.lg,
	},
	sectionTitle: {
		...typography.h3,
		color: colors.text,
		marginBottom: spacing.lg,
		letterSpacing: -0.5,
	},
	emptyState: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.xl,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.border,
	},
	emptyStateText: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 24,
	},
});

// function signUp() {
// 	const auth = getAuth(app);

// 	createUserWithEmailAndPassword(
// 		auth,
// 		"jane.doe@example.com",
// 		"SuperSecretPassword!"
// 	)
// 		.then((res) => console.log(res))
// 		.catch((err) => console.log(err));
// }

// return (
// 	<View style={styles.container}>
// 		<Text style={styles.text}>Hello, World</Text>
// 		<Text style={styles.text}>Check For Firebase Integration!</Text>

// 		<TouchableOpacity style={styles.button_container} onPress={signUp}>
// 			<Text style={styles.button_text}>SignUp</Text>
// 		</TouchableOpacity>

// 		<Post
// 			title="Second Post"
// 			content="This is another example of the Post component. It is reusable and flexible!"
// 			timestamp="Jan 19, 2025"
// 		/>

// 		<Link href="/about" style={styles.button}>
// 			Go to About screen
// 		</Link>
// 	</View>
// );
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#25292e",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	text: {
// 		color: "#fff",
// 	},
// 	button: {
// 		fontSize: 20,
// 		textDecorationLine: "underline",
// 		color: "#fff",
// 	},
// 	button_text: {
// 		textAlign: "center",
// 		fontSize: 24,
// 		color: "#1976d2",
// 	},
// 	button_container: {
// 		borderRadius: 15,
// 		flexDirection: "row",
// 		margin: 16,
// 		padding: 24,
// 		justifyContent: "center",
// 		backgroundColor: "#e6e6e6",
// 	},
// });
