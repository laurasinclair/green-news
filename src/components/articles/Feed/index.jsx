import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import { ArticleCard, Loading, Error } from '@components';
import { getSlug } from '@utils';
import styles from './index.module.sass';
import { fetchArticles } from '../../../api/Api';
import { useFeedContext } from '@context';

console.clear();

export default function Feed() {
	const {
		articles,
		setArticles,
		totalArticles,
		setTotalArticles,
	} = useFeedContext();

	const [loading, setLoading] = useState(true),
		[error, setError] = useState(undefined);

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [currentPage, setCurrentPage] = useState(params.get('page') || 1);
	const navigate = useNavigate();

	useEffect(() => {
		fetchArticles(currentPage)
			.then((data) => {
				if (data && Array.isArray(articles)) {
					// console.log('🍓', data.articles, articles);
					
					setArticles(data.articles);
					setTotalArticles(totalArticles);
					paginationNumbers();
					navigate(`?page=${currentPage}`);
					setLoading(false);
				} else {
					console.log('Articles not found');
				}
			})
			.catch((err) => console.log('There was an error fetching data', err.message));
	}, [currentPage, navigate]);


	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalArticles / 10) {
			setCurrentPage(currentPage + 1);
		}
	};

	const paginationNumbers = () => {
		let buttons = [];
		for (let i = 0; i < 12; i++) {
			buttons.push(
				<button
					className={classNames(styles.pagination_numbers_number, {
						[styles.pagination_numbers_current]: i + 1 === currentPage,
					})}
					key={i}
					onClick={() => setCurrentPage(i + 1)}>
					{i + 1}
				</button>
			);
		}
		return buttons;
	};

	return (
		<div className={classNames('feed', styles.feed)}>
			<Container
				fluid
				className='mt-5'>
				<h2>Today&apos;s top stories</h2>

				<Row>
					{loading ? (
						<Loading />
					) : error ? (
						'Oops, there was a problem...'
					) : (
						articles && (
							<>
								<Col>
									<div className='mb-5'>
										{articles &&
											(articles.length > 0 ? (
												<>{articles.length} articles</>
											) : (
												<>Loading...</>
											))}{' '}
									</div>
									<Row className='gx-3 gx-md-4'>
										{articles &&
											articles.map((article, i) => {
												return (
													<Col
														sm='6'
														lg='4'
														key={i}
														className='mb-4 mb-md-5'>
														<ArticleCard
															article={article}
															link={`articles/${getSlug(
																article.headline.main
															)}`}
														/>
													</Col>
												);
											})}
									</Row>
								</Col>
							</>
						)
					)}
				</Row>

				<div className={styles.pagination}>
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className={styles.pagination_arrows}>
						<ChevronLeft size={24} />
					</button>

					<div className={styles.pagination_numbers}>{paginationNumbers()}</div>

					<button
						onClick={handleNextPage}
						disabled={currentPage === totalArticles / 10}
						className={styles.pagination_arrows}>
						<ChevronRight size={24} />
					</button>
				</div>
			</Container>
		</div>
	);
}
