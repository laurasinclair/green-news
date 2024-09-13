import { Link } from 'react-router-dom';
import { getSlug } from 'utils';
import styles from './index.module.sass';
import { paths } from 'router/paths';

export default function SavedArticle({ articleTitle }) {
	return (
		<>
			{articleTitle && (
				<Link
					to={`${paths.base}/articles/${getSlug(articleTitle)}`}
					className={styles.savedArticle}>
					{articleTitle}
				</Link>
			)}
		</>
	);
}
