import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '@img/placeholder_1-1.jpg'
import { ArrowLeftCircleFill, ArrowRightCircleFill, ArrowRight } from 'react-bootstrap-icons'
import { Button, SaveBtn } from '@components'

import styles from './styles/ArticleCard.module.sass'
import { useUserContext } from '../components/UserContext'

export default function ArticleCard({article}) {
	const { currentUser } = useUserContext()

	function getSlug(str) {
		const tempString = str
			.replaceAll(/[^a-zA-Z0-9]/g, '-')
			.toLowerCase()
			.substring(0, 50)
		return tempString.replace(/-+/g, '-').replace(/-$/, '')
	}

	return (
		<div className={styles.articleCard}>
			<div className={styles.articleCard_thumbnail}>
				<img src={article.urlToImage || placeholder} alt={article.title | window.name} />
			</div>
			<div className={styles.articleCard_body}>
				<h3>{article.title}</h3>
				<p>{article.description}</p>
			</div>
			<div className={styles.articleCard_footer}>
				{currentUser.isLoggedIn && (
					<div>
						<SaveBtn articleSlug={getSlug(article.title)} fullWidth />
					</div>
				)}
				<div>
					<Button link={`/articles/${getSlug(article.title)}`} label="Read more" fullWidth iconRight={<ArrowRight size="18" />} />
				</div>
			</div>
		</div>
	)
}
