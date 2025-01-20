import { Text, View, StyleSheet } from "react-native";
import Post from "../../components/Post";
import { Link } from "expo-router";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello, World!</Text>

			<Post
				title="Second Post"
				content="This is another example of the Post component. It is reusable and flexible!"
				timestamp="Jan 19, 2025"
			/>

			<Link href="/about" style={styles.button}>
				Go to About screen
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#25292e",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "#fff",
	},
	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff",
	},
});
