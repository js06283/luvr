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
			<View key={post.id} style={styles.postContainer}>
				<View style={styles.postHeader}>
					<Text style={styles.postTitle}>{post.name}</Text>
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

					{post.rating && (
						<View style={styles.postRow}>
							<Text style={styles.postLabel}>Rating:</Text>
							<Text style={styles.postValue}>
								{"★".repeat(parseInt(post.rating))}
							</Text>
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
		backgroundColor: "#25292e",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 20,
		paddingTop: 60,
		backgroundColor: "#25292e",
		borderBottomWidth: 1,
		borderBottomColor: "#333",
	},
	backButton: {
		padding: 10,
	},
	backButtonText: {
		color: "#4CAF50",
		fontSize: 16,
		fontWeight: "bold",
	},
	headerTitle: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
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
		padding: 20,
	},
	loadingText: {
		color: "#fff",
		fontSize: 16,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	emptyTitle: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	emptyText: {
		color: "#ccc",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 30,
	},
	createPostButton: {
		backgroundColor: "#4CAF50",
		padding: 15,
		borderRadius: 8,
	},
	createPostButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	postsContainer: {
		padding: 20,
	},
	postContainer: {
		backgroundColor: "#333",
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
	},
	postHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	postTitle: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
	postEmoji: {
		fontSize: 32,
	},
	postContent: {
		marginBottom: 15,
	},
	postRow: {
		flexDirection: "row",
		marginBottom: 8,
	},
	postLabel: {
		color: "#ccc",
		fontSize: 14,
		fontWeight: "bold",
		width: 100,
	},
	postValue: {
		color: "#fff",
		fontSize: 14,
		flex: 1,
	},
	postDate: {
		color: "#999",
		fontSize: 12,
		fontStyle: "italic",
		textAlign: "right",
	},
});
