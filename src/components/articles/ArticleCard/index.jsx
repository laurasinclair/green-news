import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

import { Button, SaveButton } from 'components';
import { getSlug, truncate } from 'utils';
import getPlaceholder from 'utils/Placeholder';
import { useUserContext } from 'context';
import styles from './index.module.sass';

export default function ArticleCard({ article }) {
	const { currentUser } = useUserContext();
	const placeholder = getPlaceholder();

	return (
		<>
			{article && (
				<div className={styles.articleCard}>
					<div className={styles.articleCard_thumbnail}>
						<h3>{article.headline && article.headline.main}</h3>
						<Link to={`articles/${getSlug(article.headline.main)}`}>
							<img
								src={
									'https://static01.nyt.com/' +
										article.multimedia?.[0]?.url || placeholder
								}
								alt={`${article.headline?.main} | ${window.name}`}
								onError={(e) => {
									e.target.onerror = null; // Prevent infinite loop in case placeholder image fails to load
									e.target.src = placeholder;
								}}
								loading='lazy'
							/>
						</Link>
					</div>
					<div className={styles.articleCard_body}>
						<p>{truncate(article.snippet)}</p>
					</div>
					<div className={styles.articleCard_footer}>
						{currentUser.isLoggedIn && (
							<div>
								<SaveButton
									articleId={article._id}
									articleTitle={article.headline.main}
									fullWidth
								/>
							</div>
						)}
						<div>
							<Button
								to={`articles/${getSlug(article.headline.main)}`}
								label='Read more'
								fullWidth
								iconRight={<ArrowRight size='18' />}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
