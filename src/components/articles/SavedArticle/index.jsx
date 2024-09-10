import { Link } from 'react-router-dom';
import { getSlug } from '@utils';
import styles from './index.module.sass';

export default function SavedArticle({ articleTitle }) {
	return (
		<>
			{articleTitle && (
				<Link
					to={`/articles/${getSlug(articleTitle)}`}
					className={styles.savedArticle}>
					{articleTitle}
				</Link>
			)}
		</>
	);
}
