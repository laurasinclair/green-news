import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import { ArticleCard, Loading, Error } from '@components';
import { getSlug } from '@utils';
import styles from './styles/Feed.module.sass';
import { useFeedContext } from '@context';

export default function Feed() {
	const { data, error, setError, totalArticles, fetchData } = useFeedContext();
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const [currentPage, setCurrentPage] = useState(params.get('page') || 1);

	const navigate = useNavigate();

	useEffect(() => {
		fetchData(currentPage);
		if (data && data.length > 0) {
			setLoading(false);
			paginationNumbers();
			navigate(`?page=${currentPage}`);
		}
	}, [currentPage]);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < (totalArticles / 10)) {
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
						data && (
							<>
								<Col>
									<div className='mb-5'>
										{data &&
											(data.length > 0 ? (
												<>{data.length} articles</>
											) : (
												<>Loading...</>
											))}{' '}
									</div>
									<Row className='gx-3 gx-md-4'>
										{data &&
											data.map((article, i) => {
												return (
													<Col
														sm='6'
														lg='4'
														key={i}
														className='mb-4 mb-md-5'>
														<Link
															to={`articles/${getSlug(article.headline.main)}`}>
															<ArticleCard article={article} />
														</Link>
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
						disabled={currentPage === (totalArticles / 10)}
						className={styles.pagination_arrows}>
						<ChevronRight size={24} />
					</button>
				</div>
			</Container>
		</div>
	);
}
