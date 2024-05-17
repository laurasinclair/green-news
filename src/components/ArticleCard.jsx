import { Row, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '@img/bart-zimny-W5XTTLpk1-I-unsplash.jpg'
import { ArrowLeftCircleFill, ArrowRightCircleFill, ArrowRight } from 'react-bootstrap-icons'
import { Button, SaveBtn } from '@components'
import { getSlug, truncate } from "@utils";

import styles from './styles/ArticleCard.module.sass'
import { useUserContext } from '@context'

export default function ArticleCard({ article }) {
	const { currentUser } = useUserContext()

	return (
		<>
			{article && (
				<div className={styles.articleCard}>
					<div className={styles.articleCard_thumbnail}>
						<h3>{article.headline && article.headline.main}</h3>
						<img src={'http://static01.nyt.com/' + (article.multimedia && article.multimedia[0].url) || placeholder} alt={(article.headline && article.headline.main) | window.name} />
					</div>
					<div className={styles.articleCard_body}>
						<p>{truncate(article.snippet)}</p>
					</div>
					<div className={styles.articleCard_footer}>
						{currentUser.isLoggedIn && (
							<div>
								<SaveBtn articleSlug={getSlug(article.headline && article.headline.main)} fullWidth />
							</div>
						)}
						<div>
							<Button link={`/articles/${getSlug(article.headline.main)}`} label="Read more" fullWidth iconRight={<ArrowRight size="18" />} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
