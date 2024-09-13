import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import { ArticleCard, Loading } from 'components';
import { getSlug } from 'utils';
import styles from './index.module.sass';
import { fetchArticles } from 'api';
import { useFeedContext } from 'context';

export default function Feed() {
	// prettier-ignore
	const	[loading, setLoading] = useState(true),
			[error] = useState(undefined)

	const { articles, setArticles, totalArticles, setTotalArticles } =
		useFeedContext();

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [currentPage, setCurrentPage] = useState(params.get('page') || 1);
	const navigate = useNavigate();

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalArticles / 12) {
			setCurrentPage(currentPage + 1);
		}
	};

	const paginationNumbers = useCallback(() => {
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
	}, [currentPage]);

	const getArticles = useCallback(async () => {
		try {
			const articlesRes = await fetchArticles(currentPage);
			if (!articlesRes) throw new Error('Error fetching articles');

			setArticles(articlesRes.articles);
			setTotalArticles(articlesRes.totalArticles);
			setLoading(false);
		} catch (error) {
			console.error(error.message);
		}
	}, [setArticles, setTotalArticles, currentPage]);

	useEffect(() => {
		navigate(`?page=${currentPage}`);

		paginationNumbers();
	}, [navigate, currentPage, getArticles, articles, paginationNumbers]);

	useEffect(() => {
		getArticles(currentPage);
	}, [getArticles, currentPage]);

	return (
		<div className={classNames('feed', styles.feed)}>
			<Container
				fluid
				className='mt-5'>
				<h2>Today&apos;s top stories</h2>

				{loading ? (
					<Loading />
				) : error ? (
					'Oops, there seems to be a problem here'
				) : (
					articles && (
						<Row>
							<Col>
								<div className='mb-5'>
									{totalArticles > 0 &&
										(totalArticles <= 100 ? (
											<>{totalArticles} articles</>
										) : (
											<>100+ articles</>
										))}
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
						</Row>
					)
				)}

				<div className={styles.pagination}>
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className={styles.pagination_arrows}>
						<ChevronLeft size={24} />
					</button>

					<div className={styles.pagination_numbers}>
						{paginationNumbers()}
					</div>

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
