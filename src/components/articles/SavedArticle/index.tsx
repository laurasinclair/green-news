import { Link } from 'react-router-dom';
import { getSlug } from 'utils';
import styles from './index.module.sass';
import { paths } from 'router/paths';

type Props = {
	articleTitle: string;
};

export default function SavedArticle({ articleTitle }: Props) {
	return (
		<Link
			to={`${paths.base}/articles/${getSlug(articleTitle)}`}
			className={styles.savedArticle}>
			{articleTitle}
		</Link>
	);
}
