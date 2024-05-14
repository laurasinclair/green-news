import { Container, Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons'
import { ArticleCard } from '@components'
import classNames from 'classnames';

import styles from './styles/Feed.module.sass'
import { useUserContext } from '@components/UserContext'
import { useFeedContext } from '@components/FeedContext'

export default function Feed() {
	const { data, setData, error, setError } = useFeedContext()
	const [loading, setLoading] = useState('')

	// pagination
	const [page, setPage] = useState(0) // current page number
	const [filteredData, setFilteredData] = useState()
	const perPage = 9

	// useEffect(() => {
	// 	console.log(data[0])
	// }, [data])
	
	// useEffect(() => {
	// 	const test = data.map((article, i) => {
	// 		return article.headline.main
	// 	})

	// 	console.log('test', test)


	// 	// data && (
	// 	// 	setFilteredData(
	// 	// 		data.filter((item, index) => {
	// 	// 			return (index >= page * perPage) & (index < (page + 1) * perPage)
	// 	// 		})
	// 	// 	),
	// 	// 	setError(''),
	// 	// 	setLoading(false)
	// 	// )
		
	// 	!data && (
	// 		setError('No articles to display.'),
	// 		setLoading(false)
	// 	)
	// }, [page, data, error, setError])

	function getSlug(str) {
		if (!str) return
		if (typeof str === 'string') {
			const tempString = str
				.replaceAll(/[^a-zA-Z0-9]/g, '-')
				.toLowerCase()
				.substring(0, 50)
			return tempString.replace(/-+/g, '-').replace(/-$/, '')
		}
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
						data && (
							<>
								<Col>
									<div className="mb-5">{data && data.length} articles</div>
									<Row className="gx-3 gx-md-4">
										{data &&
											data.map((article, i) => {
												return (
													<Col sm="6" lg="4" key={i} className="mb-4 mb-md-5">
														<Link to={`articles/${getSlug(article.headline.main)}`}>
															<ArticleCard article={article} />
														</Link>
													</Col>
												)
											})}

										{/* <ReactPaginate containerClassName={styles.feed_pagination} pageClassName={styles.pageItem} activeClassName={styles.active} onPageChange={(event) => setPage(event.selected)} pageCount={Math.ceil(data.articles.length / perPage)} breakLabel="..." previousLabel={<ArrowLeftCircleFill color="#aab5a2" size="40" className="mt-2 me-3" />} nextLabel={<ArrowRightCircleFill color="#aab5a2" size="40" className="mt-2 ms-3" />} /> */}
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
