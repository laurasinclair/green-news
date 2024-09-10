import { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { BackButton, SaveButton, Loading } from '@components';
import { useUserContext, useFeedContext } from '@context';
import { getSlug, publishedDate } from '@utils';
import getPlaceholder from '@utils/Placeholder';
import styles from './index.module.sass';

export default function Article() {
	const { articles, setArticles } = useFeedContext();
	const { currentUser } = useUserContext();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);
	const navigate = useNavigate();

	const placeholder = getPlaceholder();

	const [article, setArticle] = useState({});
	const articleSlug = useParams().articleSlug;

	useEffect(() => {
		if (articles) {
			const findArticle = articles.find((article) => {
				return getSlug(article.headline.main) === articleSlug;
			});

			if (findArticle) {
				setArticle(findArticle);
			}

			setError(undefined);
			setLoading(false);
		} else {
			setError('No data to display');
		}
	}, [articleSlug, articles]);

	useEffect(() => {
		if (article && article.headline && article.headline.main) {
			document.title = window.name + ' | ' + article.headline.main;
		}
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
						<h3>
							{(article && article.headline && article.headline.main) ||
								'Are We Rediscovering the Healing Power of Forests?'}
						</h3>
					</div>
				</Container>
			</div>

			<Container fluid>
				<Row>
					{loading ? (
						<Col className='py-5'>
							<Loading />
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
												: 'Guest Author'}
										</strong>{' '}
										{article.source && '  -  ' + article.source}
										<br />
										{article.publishedAt
											? 'Published on ' +
											  publishedDate(article.pub_date)
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
												{article.lead_paragraph
													? article.lead_paragraph
													: 'Nature and wildlife encompass the diverse ecosystems and the myriad of species that inhabit them. From lush forests and expansive grasslands to vibrant coral reefs and arid deserts, nature provides a home for countless creatures. Wildlife includes animals ranging from the tiniest insects to the largest mammals, each playing a crucial role in maintaining ecological balance. Observing wildlife in their natural habitats not only offers breathtaking sights but also reminds us of the importance of preserving these environments for future generations.'}
											</div>
										</div>
										{article.web_url && (
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
										)}
									</>
								) : (
									<div>No content to display at the moment.</div>
								)}

								{currentUser.isLoggedIn && (
									<SaveButton
										articleId={article._id}
										articleTitle={article.headline?.main}
									/>
								)}

								<div className='py-5'>
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
