import animation from "src/assets/loading.gif";
import styles from "./loading.module.css";

export const Loading = () => {
	return (
		<div className={styles.loading}>
			<div className={styles.loader}>
				<img src={animation} alt=" loading" />
			</div>
		</div>
	);
};
