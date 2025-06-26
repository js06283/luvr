// import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import Post from "../../components/Post";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { Link } from "expo-router";
// import { app } from "../../firebaseConfig.js";
import React, { useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from "react-native";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { router } from "expo-router";
import { useFormData } from "../forms/FormContext";
import { LinearGradient } from "expo-linear-gradient";

// New color palette from the design
const colors = {
	background: "#FFFBF8", // A warm off-white
	text: "#1E1E1E", // Dark charcoal
	primary: "#D8D1E9", // Light Lavender
	secondary: "#F5A895", // Coral/Salmon Pink
	accent: "#8E9AAF", // Slate Blue/Gray
	white: "#ffffff",
	textSecondary: "#8E9AAF", // Using accent for secondary text
	border: "#EAEAEA", // A light gray for borders
	error: "#E57373", // A soft red for errors
};

// Typography scale
const typography = {
	h1: { fontSize: 48, fontWeight: "700" as const },
	h2: { fontSize: 28, fontWeight: "600" as const },
	h3: { fontSize: 22, fontWeight: "600" as const },
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
	const { formData, loadPeople, loadDates } = useFormData();

	// Load data when component mounts
	useEffect(() => {
		loadPeople();
		loadDates();
	}, []);

	const handleSignOut = async () => {
		try {
			await getAuth(app).signOut();
			router.replace("/login");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const handleViewPeople = () => {
		router.push("/people");
	};

	const handleViewDates = () => {
		router.push("/dates");
	};

	const handleRefresh = async () => {
		try {
			await Promise.all([loadPeople(), loadDates()]);
		} catch (error) {
			console.error("Error refreshing data:", error);
		}
	};

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl
					refreshing={formData.loading}
					onRefresh={handleRefresh}
					tintColor={colors.secondary}
				/>
			}
		>
			<View style={styles.content}>
				{/* Header Section */}
				<View style={styles.headerSection}>
					<Text style={styles.welcomeText}>Welcome to</Text>
					<Text style={styles.appTitle}>lolo</Text>
				</View>

				{/* Quick Stats */}
				<View style={styles.statsContainer}>
					<TouchableOpacity style={styles.statCard} onPress={handleViewPeople}>
						<Text style={styles.statNumber}>{formData.people.length}</Text>
						<Text style={styles.statLabel}>People</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.statCard} onPress={handleViewDates}>
						<Text style={styles.statNumber}>{formData.dates.length}</Text>
						<Text style={styles.statLabel}>Dates</Text>
					</TouchableOpacity>
				</View>

				{/* Recent Activity */}
				<View style={styles.recentSection}>
					<Text style={styles.sectionTitle}>Recent Activity</Text>
					{formData.loading && (
						<Text style={styles.loadingText}>Loading...</Text>
					)}
					{!formData.loading &&
						formData.people.length === 0 &&
						formData.dates.length === 0 && (
							<View style={styles.emptyState}>
								<Text style={styles.emptyStateText}>
									No activity yet. Start by adding a person or a date!
								</Text>
							</View>
						)}

					{!formData.loading &&
						(formData.people.length > 0 || formData.dates.length > 0) && (
							<View>
								{/* You can map recent items here */}
								<Text style={styles.activityItem}>
									You have {formData.people.length} people and{" "}
									{formData.dates.length} dates.
								</Text>
							</View>
						)}
				</View>

				<TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
					<Text style={styles.signOutButtonText}>Sign Out</Text>
				</TouchableOpacity>
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
		paddingBottom: spacing.xxl,
	},
	headerSection: {
		alignItems: "center",
		marginBottom: spacing.xl,
	},
	welcomeText: {
		...typography.body,
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	appTitle: {
		...typography.h1,
		color: colors.text,
		letterSpacing: -1.5,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: spacing.xxl,
		gap: spacing.lg,
	},
	statCard: {
		backgroundColor: colors.white,
		flex: 1,
		padding: spacing.lg,
		borderRadius: borderRadius.lg,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 12,
		elevation: 5,
		borderWidth: 1,
		borderColor: colors.border,
	},
	statNumber: {
		...typography.h1,
		fontSize: 40,
		color: colors.secondary,
	},
	statLabel: {
		...typography.body,
		color: colors.textSecondary,
		marginTop: spacing.xs,
	},
	recentSection: {
		marginBottom: spacing.xl,
	},
	sectionTitle: {
		...typography.h3,
		color: colors.text,
		marginBottom: spacing.md,
	},
	loadingText: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		paddingVertical: spacing.xl,
	},

	emptyState: {
		backgroundColor: colors.white,
		padding: spacing.lg,
		borderRadius: borderRadius.md,
		alignItems: "center",
		borderWidth: 1,
		borderColor: colors.border,
	},
	emptyStateText: {
		...typography.body,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 22,
	},
	activityItem: {
		...typography.body,
		color: colors.text,
		paddingVertical: spacing.md,
	},
	signOutButton: {
		marginTop: spacing.lg,
		padding: spacing.md,
		borderRadius: borderRadius.md,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.border,
		alignItems: "center",
	},
	signOutButtonText: {
		...typography.bodyBold,
		color: colors.error,
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
