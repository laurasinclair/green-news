import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '@img/placeholder_1-1.jpg'
import { ArrowLeftCircleFill, ArrowRightCircleFill, ArrowRight} from 'react-bootstrap-icons'
import { Button, SaveBtn } from '@components'

import styles from './styles/Feed.module.sass'
import { useUserContext } from '../components/UserContext'

export default function Feed(props) {
	const { currentUser } = useUserContext();

	// fetching the data
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(`https://newsapi.org/v2/everything?q=trees&apiKey=${import.meta.env.VITE_NEWS_API_TOKEN}`)
			.then((resp) => resp.json())
			.then((data) => setData(data))
			.catch((err) => setError(`Data couldn't be fetched - ${err}`))
	}, [])

	// pagination
	const [page, setPage] = useState(0) // current page number
	const [filteredData, setFilteredData] = useState()
	const perPage = 9

	useEffect(() => {
		if (data && data.articles) {
			setFilteredData(
				data.articles.filter((item, index) => {
					return (index >= page * perPage) & (index < (page + 1) * perPage)
				})
			)
			setLoading(false)
		} else {
			setError('No data to display')
		}
	}, [page, data])

	function getSlug(str) {
		const tempString = str
			.replaceAll(/[^a-zA-Z0-9]/g, '-')
			.toLowerCase()
			.substring(0, 50)
		return tempString.replace(/-+/g, '-').replace(/-$/, '')
	}

	return (
		<div className={styles.feed}>
			<h2>News feed</h2>

			<Row>
				{loading ? (
					<div>Loading...</div>
				) : !filteredData || filteredData.length <= 0 ? (
					error && (
						<Col>
							<div>
								OH NO. <br />
								{error}
							</div>
						</Col>
					)
				) : (
					filteredData && (
						<>
							<Col>
								<Row>
									<Col md="6">
										<Link to={`articles/${getSlug(filteredData[0].title)}`}>
											<div className={styles.featuredImage}>
												<h3>{filteredData[0].title}</h3>
												<img src={filteredData[0].urlToImage} alt={filteredData[0].title} />
											</div>
										</Link>
									</Col>
								</Row>

								<div className="mb-4">{data.articles.length} articles</div>
								<Row>
									{filteredData &&
										filteredData.map((article, i) => {
											return (
												<Col sm="6" lg="4" key={i} className="mb-4">
													<Link to={`articles/${getSlug(article.title)}`}>
														<div className={styles.feed_articleCard}>
															<div className={styles.feed_articleCard_thumbnail}>
																<img src={article.urlToImage || placeholder} alt={article.title | window.name} />
															</div>
															<div className={styles.feed_articleCard_body}>
																<h3>{article.title}</h3>
																<p>{article.description}</p>
																<Row className="flex-column flex-sm-row">
																	{currentUser?.userId && (
																		<Col>
																			<SaveBtn articleSlug={getSlug(article.title)} />
																		</Col>
																	)}
																	<Col>
																		<Button link={`articles/${getSlug(article.title)}`} text="Read more" fullWidth iconRight={<ArrowRight size="18" />} />
																	</Col>
																</Row>
															</div>
														</div>
													</Link>
												</Col>
											)
										})}

									<ReactPaginate containerClassName={styles.feed_pagination} pageClassName={styles.pageItem} activeClassName={styles.active} onPageChange={(event) => setPage(event.selected)} pageCount={Math.ceil(data.articles.length / perPage)} breakLabel="..." previousLabel={<ArrowLeftCircleFill color="#aab5a2" size="40" className="mt-2 me-3" />} nextLabel={<ArrowRightCircleFill color="#aab5a2" size="40" className="mt-2 ms-3" />} />
								</Row>
							</Col>
						</>
					)
				)}
			</Row>
			{props.children}
		</div>
	)
}
