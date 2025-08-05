import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

import { LinkAsButton, SaveButton } from 'components';
import { getSlug, truncate } from 'utils';
import getPlaceholder from 'utils/Placeholder';
import { useUserContext } from 'context';
import styles from './index.module.sass';
import { Article, User } from 'src/types';

type Props = {
	article: Article;
	link: string;
};

export default function ArticleCard({ article, link }: Props) {
	const { currentUser } = useUserContext();
	const placeholder = getPlaceholder();

	return (
		<>
			<div className={styles.articleCard}>
				<div className={styles.articleCard_thumbnail}>
					<h3>{article.headline && article.headline.main}</h3>
					<Link
						to={`articles/${getSlug(article.headline.main)}?id=${
							article._id
						}`}
					>
						{article.multimedia && (
							<img
								src={article.multimedia.default.url || placeholder}
								alt={`${article.headline?.main} | ${window.name}`}
								onError={(
									e: React.SyntheticEvent<HTMLImageElement, Event>
								) => {
									const target = e.target as HTMLImageElement;
									target.onerror = null; // Prevent infinite loop in case placeholder image fails to load
									target.src = placeholder;
								}}
								loading="lazy"
							/>
						)}
					</Link>
				</div>
				<div className={styles.articleCard_body}>
					<p>{truncate(article.snippet)}</p>
				</div>
				<div className={styles.articleCard_footer}>
					{currentUser.isLoggedIn && (
						<SaveButton
							articleId={article._id}
							articleTitle={article.headline.main}
							fullWidth
						/>
					)}
					<div>
						<LinkAsButton
							to={`articles/${getSlug(article.headline.main)}?id=${
								article._id
							}`}
							label="Read more"
							fullWidth
							iconRight={<ArrowRight size={18} />}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
