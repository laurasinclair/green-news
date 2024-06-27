import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import { fetchSavedArticles } from 'api';
import {
	Button,
	Hero,
	Section,
	UploadImage,
	ArticleCard,
	Loading,
} from '@components';
import { useUserContext, useFeedContext } from '@context';

export default function UserPage() {
	const navigate = useNavigate();
    const username = useParams().username
	const { currentUser, setCurrentUser, handleLogOut } = useUserContext();
	const { data } = useFeedContext();
	const [loading, setLoading] = useState(true);

	// just updating the page title to the user name
	useEffect(() => {
		if (currentUser && currentUser.userInfo) {
			setLoading(false);
			document.title = `${window.name} | ${currentUser.userInfo.firstName} ${currentUser?.userInfo.lastName} ⛭ User settings`;
		}
	}, [currentUser]);

useEffect(() => {
	// console.log(currentUser.userInfo)
	console.clear()
	console.log(username)
	fetchSavedArticles(username)

	// const test = fetchSavedArticles('johndoe01').then(data => console.log(data.response))

}, [username])


	// displaying saved articles

	
	return (
		<>
			<Row>
				{!currentUser ? (
					<Loading />
				) : (
					currentUser &&
					currentUser.userInfo && (
						<>
							<Container fluid>
								<Hero
									title={`Hello, ${currentUser?.userInfo.firstName} ${currentUser?.userInfo.lastName}!`}
									leadText='Happy to see you here! 🌿'
									size='m'
								/>
							</Container>

							<Section>
								<Container fluid>
									<Row>
										<Col sm='3'>
											<h3>Personal info</h3>
										</Col>
										<Col>
											<div className='bg-01'>
												<Row>
													<Col>
														<div>
															<h4>Username</h4>
															<p className='inputfield'>
																{currentUser?.userInfo.username}
															</p>
														</div>
													</Col>
												</Row>
												<Row>
													<Col sm='6'>
														<div>
															<h4>First name</h4>
															<p className='inputfield'>
																{currentUser?.userInfo.firstName}
															</p>
														</div>
													</Col>
													<Col sm='6'>
														<div>
															<h4>Last name</h4>
															<p className='inputfield'>
																{currentUser?.userInfo.lastName}
															</p>
														</div>
													</Col>
												</Row>

												<div>
													<h4>Profile picture</h4>
													<UploadImage size='100px' />
												</div>
											</div>
										</Col>
									</Row>
								</Container>
							</Section>

							<Section>
								<Container fluid>
									<h2>Saved articles</h2>
									<p>
										{currentUser.isLoggedIn && (
											<strong>
												{currentUser.userInfo.savedArticles.length} article
												{currentUser.userInfo.savedArticles.length > 1
													? 's'
													: ''}{' '}
												saved
												{currentUser.userInfo.savedArticles.length < 1 && ' :('}
											</strong>
										)}
									</p>

									<Row className='gx-3 gx-md-4'>
										{currentUser?.userInfo.savedArticles && data ? (
											data.map((article, i) => {
												for (let articleSlug of currentUser.userInfo
													.savedArticles) {
													if (articleSlug === getSlug(article.headline.main)) {
														return (
															<Col
																sm='6'
																md='4'
																key={i}
																className='mb-4'>
																<Link
																	to={`/articles/${getSlug(
																		article.headline.main
																	)}`}>
																	<ArticleCard article={article} />
																</Link>
															</Col>
														);
													}
												}
											})
										) : (
											<Col
												className='mb-4'>
												<p>We can&apos;t access your saved articles now :(</p>
											</Col>
										)}
									</Row>
								</Container>
							</Section>
							<Section>
								<Container fluid>
									<Row>
										<Col>
											<Button
												label='Log out'
												type='primary-outline'
												fullWidth
												onClick={handleLogOut}
											/>
										</Col>
									</Row>
								</Container>
							</Section>
						</>
					)
				)}
			</Row>
		</>
	);
}
