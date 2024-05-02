import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons'
import { SaveBtn } from '@components'

import styles from './styles/Feed.module.sass'

export default function Feed(props) {
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

	// console.log(data)

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
								<div className="mb-4">{data.articles.length} articles</div>
								<Row>
									{filteredData &&
										filteredData.map((article, i) => {
											return (
												<Col md="6" lg="4" key={i} className="mb-4">
													<Link to={`articles/${getSlug(article.title)}`}>
														<div className={styles.feed_article}>
															<h3>{article.title}</h3>
															<div>{article.description}</div>
															<SaveBtn article={getSlug(article.title)} />
														</div>
													</Link>
												</Col>
											)
										})}

									<ReactPaginate containerClassName={styles.feed_pagination} pageClassName={styles.pageItem} activeClassName={styles.active} onPageChange={(event) => setPage(event.selected)} pageCount={Math.ceil(data.articles.length / perPage)} breakLabel="..." previousLabel={<ArrowLeftCircleFill color="#5c736c" size="40" className="mt-2 me-3" />} nextLabel={<ArrowRightCircleFill color="#5c736c" size="40" className="mt-2 ms-3" />} />
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
