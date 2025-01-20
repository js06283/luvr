import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface PostProps {
	title: string;
	content: string;
	author?: string;
	timestamp?: string;
	imageUrl?: string;
}

const Post: React.FC<PostProps> = ({
	title,
	content,
	author,
	timestamp,
	imageUrl,
}) => {
	return (
		<View style={styles.container}>
			{imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.content}>{content}</Text>
			<View style={styles.footer}>
				{author && <Text style={styles.author}>By: {author}</Text>}
				{timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		elevation: 2,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	content: {
		fontSize: 16,
		color: "#555",
		marginBottom: 10,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	author: {
		fontSize: 14,
		fontStyle: "italic",
		color: "#888",
	},
	timestamp: {
		fontSize: 14,
		color: "#888",
	},
});

export default Post;
