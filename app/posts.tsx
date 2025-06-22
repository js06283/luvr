import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Alert,
	RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import {
	getFirestore,
	collection,
	query,
	where,
	orderBy,
	getDocs,
} from "firebase/firestore";
import { app } from "../firebaseConfig";

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
	h4: { fontSize: 20, fontWeight: "500" as const },
	body: { fontSize: 16, fontWeight: "400" as const },
	bodyBold: { fontSize: 16, fontWeight: "600" as const },
	caption: { fontSize: 14, fontWeight: "400" as const },
	small: { fontSize: 12, fontWeight: "400" as const },
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
	full: 9999,
};

interface Post {
	id: string;
	date: string;
	name: string;
	height: string;
	industry: string;
	home: string;
	hair_color: string;
	eye_color: string;
	how_we_met: string;
	activity: string;
	rating: string;
	emoji: string;
	icks: string;
	liked: string;
	mutuals: string;
	createdAt: any;
	authorId: string;
	authorEmail: string;
}

export default function PostsPage() {
	const router = useRouter();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const auth = getAuth(app);

	useEffect(() => {
		console.log("PostsPage useEffect triggered");
		console.log("Current user:", auth.currentUser);
		console.log("User ID:", auth.currentUser?.uid);
		console.log("User email:", auth.currentUser?.email);

		if (!auth.currentUser) {
			console.log("No current user, redirecting to login");
			Alert.alert("Error", "You must be logged in to view posts");
			router.replace("/login");
			return;
		}

		console.log("User is authenticated, fetching posts");
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			console.log("Fetching posts for user:", auth.currentUser?.uid);

			const db = getFirestore(app);
			const postsRef = collection(db, "posts");

			// First, try to get posts without ordering to see if any exist
			const basicQuery = query(
				postsRef,
				where("authorId", "==", auth.currentUser?.uid)
			);

			console.log("Executing query...");
			const querySnapshot = await getDocs(basicQuery);
			console.log("Query completed, found", querySnapshot.size, "documents");

			const postsData: Post[] = [];

			querySnapshot.forEach((doc) => {
				const data = doc.data();
				console.log("Document data:", data);
				postsData.push({
					id: doc.id,
					...data,
				} as Post);
			});

			// Sort posts by createdAt manually since serverTimestamp might not work with orderBy
			postsData.sort((a, b) => {
				if (!a.createdAt || !b.createdAt) return 0;

				const dateA = a.createdAt.toDate
					? a.createdAt.toDate()
					: new Date(a.createdAt);
				const dateB = b.createdAt.toDate
					? b.createdAt.toDate()
					: new Date(b.createdAt);

				return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
			});

			console.log("Final posts array:", postsData);
			setPosts(postsData);
		} catch (error) {
			console.error("Error fetching posts:", error);
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			Alert.alert("Error", `Failed to load posts: ${errorMessage}`);
		} finally {
			setLoading(false);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchPosts();
		setRefreshing(false);
	};

	const formatDate = (date: any) => {
		if (!date) return "Unknown date";
		const dateObj = date.toDate ? date.toDate() : new Date(date);
		return dateObj.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const renderPost = (post: Post) => {
		return (
			<View key={post.id} style={styles.postCard}>
				<View style={styles.postHeader}>
					<View style={styles.postTitleContainer}>
						<Text style={styles.postTitle}>{post.name}</Text>
						<View style={styles.ratingBadge}>
							<Text style={styles.ratingText}>
								{"★".repeat(parseInt(post.rating || "0"))}
							</Text>
						</View>
					</View>
					<Text style={styles.postEmoji}>{post.emoji}</Text>
				</View>

				<View style={styles.postContent}>
					<View style={styles.postRow}>
						<Text style={styles.postLabel}>Date Met:</Text>
						<Text style={styles.postValue}>{post.date}</Text>
					</View>

					{post.height && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Height:</Text>
							<Text style={styles.postValue}>{post.height}</Text>
						</View>
					)}

					{post.industry && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Industry:</Text>
							<Text style={styles.postValue}>{post.industry}</Text>
						</View>
					)}

					{post.home && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>From:</Text>
							<Text style={styles.postValue}>{post.home}</Text>
						</View>
					)}

					{post.hair_color && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Hair:</Text>
							<Text style={styles.postValue}>{post.hair_color}</Text>
						</View>
					)}

					{post.eye_color && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Eyes:</Text>
							<Text style={styles.postValue}>{post.eye_color}</Text>
						</View>
					)}

					{post.how_we_met && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>How we met:</Text>
							<Text style={styles.postValue}>{post.how_we_met}</Text>
						</View>
					)}

					{post.activity && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Activity:</Text>
							<Text style={styles.postValue}>{post.activity}</Text>
						</View>
					)}

					{post.icks && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Icks:</Text>
							<Text style={styles.postValue}>{post.icks}</Text>
						</View>
					)}

					{post.liked && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Liked:</Text>
							<Text style={styles.postValue}>{post.liked}</Text>
						</View>
					)}

					{post.mutuals && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Mutuals:</Text>
							<Text style={styles.postValue}>{post.mutuals}</Text>
						</View>
					)}
				</View>

				<Text style={styles.postDate}>
					Posted: {formatDate(post.createdAt)}
				</Text>
			</View>
		);
	};

	const handleBack = () => {
		router.back();
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack}>
					<Text style={styles.backButtonText}>← Back</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>My Posts</Text>
				<View style={styles.placeholder} />
			</View>

			<ScrollView
				style={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{loading ? (
					<View style={styles.loadingContainer}>
						<Text style={styles.loadingText}>Loading posts...</Text>
					</View>
				) : posts.length === 0 ? (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyTitle}>No posts yet</Text>
						<Text style={styles.emptyText}>
							Start creating posts to see them here!
						</Text>
						<TouchableOpacity
							style={styles.createPostButton}
							onPress={() => router.push("/forms/date")}
						>
							<Text style={styles.createPostButtonText}>
								Create Your First Post
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.postsContainer}>{posts.map(renderPost)}</View>
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: spacing.lg,
		paddingTop: 60,
		backgroundColor: colors.background,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	backButton: {
		padding: spacing.sm,
	},
	backButtonText: {
		color: colors.primary,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
	},
	headerTitle: {
		color: colors.text,
		fontSize: typography.h3.fontSize,
		fontWeight: typography.h3.fontWeight,
		letterSpacing: -0.5,
	},
	placeholder: {
		width: 60,
	},
	scrollView: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.lg,
	},
	loadingText: {
		color: colors.text,
		fontSize: typography.body.fontSize,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.lg,
	},
	emptyTitle: {
		color: colors.text,
		fontSize: typography.h2.fontSize,
		fontWeight: typography.h2.fontWeight,
		marginBottom: spacing.sm,
		letterSpacing: -0.5,
	},
	emptyText: {
		color: colors.textSecondary,
		fontSize: typography.body.fontSize,
		textAlign: "center",
		marginBottom: spacing.xl,
		lineHeight: 24,
	},
	createPostButton: {
		backgroundColor: colors.primary,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: borderRadius.md,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	createPostButtonText: {
		color: colors.white,
		fontSize: typography.bodyBold.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
		letterSpacing: 0.5,
	},
	postsContainer: {
		padding: spacing.lg,
	},
	postCard: {
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.lg,
		marginBottom: spacing.lg,
		borderWidth: 1,
		borderColor: colors.border,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	postHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	postTitleContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	postTitle: {
		color: colors.text,
		fontSize: typography.h3.fontSize,
		fontWeight: typography.h3.fontWeight,
		marginRight: spacing.sm,
		letterSpacing: -0.5,
	},
	ratingBadge: {
		backgroundColor: colors.secondary,
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.full,
	},
	ratingText: {
		color: colors.white,
		fontSize: typography.small.fontSize,
		fontWeight: "600",
	},
	postEmoji: {
		fontSize: 32,
	},
	postContent: {
		marginBottom: spacing.lg,
	},
	postRow: {
		flexDirection: "row",
		marginBottom: spacing.sm,
		alignItems: "flex-start",
	},
	postLabel: {
		color: colors.textSecondary,
		fontSize: typography.caption.fontSize,
		fontWeight: typography.bodyBold.fontWeight,
		width: 100,
	},
	postValue: {
		color: colors.text,
		fontSize: typography.caption.fontSize,
		flex: 1,
		lineHeight: 20,
	},
	postDate: {
		color: colors.textMuted,
		fontSize: typography.small.fontSize,
		fontStyle: "italic",
		textAlign: "right",
	},
});
