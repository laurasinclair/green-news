import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { BackButton, SaveButton } from '@components';
import { useUserContext, useFeedContext } from '@context';
import placeholder from '@img/bart-zimny-W5XTTLpk1-I-unsplash.jpg';
import { getSlug, publishedDate } from '@utils';
import styles from './index.module.sass';

export default function Article() {
	const { articles, setArticles } = useFeedContext();
	const { currentUser } = useUserContext();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const navigate = useNavigate();

	const [article, setArticle] = useState({});
	const articleUrl = useParams().articleSlug;
	useEffect(() => {
		if (articles) {
			const findArticle = articles.find((article) => {
				return getSlug(article.headline.main) === articleUrl;
			});

			if (findArticle) {
				setArticle(findArticle);
			}

			// console.log(findArticle)
			setError('');
			setLoading(false);
		} else {
			setError('No data to display');
		}
	}, [articleUrl, articles]);

	useEffect(() => {
		if (article && article.headline && article.headline.main) {
			document.title = window.name + ' | ' + article.headline.main;
		}
		// console.log(article);
	}, [article]);

	return (
		<>
			<div
				className={styles.article_top}
				style={{
					backgroundImage:
						'url(' +
						(article.multimedia && article.multimedia[0]?.url
							? 'https://static01.nyt.com/' + article.multimedia[0].url
							: placeholder) +
						')',
				}}>
				<Container fluid>
					<div className={styles.article_top_content}>
						<h3>{article && article.headline && article.headline.main}</h3>
					</div>
				</Container>
			</div>

			<Container fluid>
				<Row>
					{loading ? (
						<Col>
							<div>
								<p>Loading...</p>
							</div>
						</Col>
					) : error ? (
						<Col>
							<div>
								<p>{error}</p>
							</div>
						</Col>
					) : (
						article && (
							<Col
								sm='10'
								md='8'
								lg='6'
								className='mx-auto pt-5 pb-3'>
								<div>
									<p className={styles.article_details}>
										<strong>
											{article.byline
												? article.byline.original
												: 'Author unknown'}
										</strong>{' '}
										{article.source && '  -  ' + article.source}
										<br />
										{article.publishedAt
											? 'Published on ' + publishedDate(article.pub_date)
											: 'Publication date unknown'}
									</p>
								</div>

								{article ? (
									<>
										<div className='pb-3 pb-md-5'>
											<div className={styles.article_snippet}>
												{article.snippet}
											</div>
											<div className={styles.article_leadParagraph}>
												{article.lead_paragraph}
											</div>
										</div>
										<p
											className={classNames(
												styles.article_link,
												'pb-3 pb-md-5'
											)}>
											<a
												href={article.web_url}
												target='_blank'
												rel='noreferrer'>
												Link to the full article
											</a>
										</p>
									</>
								) : (
									<div>No content to display at the moment.</div>
								)}

								{currentUser.isLoggedIn && (
									<SaveButton
										articleSlug={getSlug(
											article.headline && article.headline.main
										)}
									/>
								)}

								<div className='pt-5'>
									<BackButton label='Back to all articles' />
								</div>
							</Col>
						)
					)}
				</Row>
			</Container>
		</>
	);
}