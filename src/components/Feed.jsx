import { Container, Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons'
import { ArticleCard } from '@components'
import classNames from 'classnames';

import styles from './styles/Feed.module.sass'
import { useUserContext } from './UserContext'

export default function Feed() {
	

	// pagination
	const [page, setPage] = useState(0) // current page number
	const [filteredData, setFilteredData] = useState()
	const perPage = 9

	useEffect(() => {
		data && data.articles && (
			setFilteredData(
				data.articles.filter((item, index) => {
					return (index >= page * perPage) & (index < (page + 1) * perPage)
				})
			),
			setError(''),
			setLoading(false)
		)
		
		!data || !data.articles && (
			setError('No articles to display.'),
			setLoading(false)
		)
	}, [page, data, error])

	function getSlug(str) {
		const tempString = str
			.replaceAll(/[^a-zA-Z0-9]/g, '-')
			.toLowerCase()
			.substring(0, 50)
		return tempString.replace(/-+/g, '-').replace(/-$/, '')
	}

	return (
		<div className={classNames('feed', styles.feed)}>
			<Container fluid className="mt-5">
				<h2>Today&apos;s top stories</h2>

				<Row>
					{loading ? (	
						<Col>
							<div>
								<p>
									Loading...
								</p>
							</div>
						</Col>
					) : ( error ? (
						<Col>
							<div>
								<p>
									{error}
								</p>
							</div>
						</Col>
					) : (
						filteredData && (
							<>
								<Col>
									<div className="mb-5">{data.articles.length} articles</div>
									<Row className="gx-3 gx-md-4">
										{filteredData &&
											filteredData.map((article, i) => {
												return (
													<Col sm="6" lg="4" key={i} className="mb-4 mb-md-5">
														<Link to={`articles/${getSlug(article.title)}`}>
															<ArticleCard article={article} />
														</Link>
													</Col>
												)
											})}

										<ReactPaginate containerClassName={styles.feed_pagination} pageClassName={styles.pageItem} activeClassName={styles.active} onPageChange={(event) => setPage(event.selected)} pageCount={Math.ceil(data.articles.length / perPage)} breakLabel="..." previousLabel={<ArrowLeftCircleFill color="#aab5a2" size="40" className="mt-2 me-3" />} nextLabel={<ArrowRightCircleFill color="#aab5a2" size="40" className="mt-2 ms-3" />} />
									</Row>
								</Col>
							</>
						)
					)
					)}
				</Row>
			</Container>
		</div>
	)
}
