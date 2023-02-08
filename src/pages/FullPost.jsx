import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import { useParams } from "react-router-dom"
import axios from "../axios";

export const FullPost = () => {

	const { id } = useParams()

	const [post, postSet] = useState()

	useEffect(() => {
		async function fetch() {
			const { data } = await axios.get(`posts/${id}`)
			postSet(data)
		}
		fetch()
	}, [])


	return (
		<>
			{post &&
				<>
					<Post
						_id={post._id}
						title={post.title}
						imageUrl={`http://localhost:1111/${post.imgUrl}`}
						user={{
							avatarUrl:
								"https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
							fullName: `${post?.user?.email}`,
						}}
						createdAt={post.createdAt}
						viewsCount={post.viewCount}
						commentsCount={3}
						tags={post.tags}
						isFullPost
					>
						{post.text}
					</Post>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: "Вася Пупкин",
									avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
								},
								text: "Это тестовый комментарий 555555",
							},
							{
								user: {
									fullName: "Иван Иванов",
									avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
								},
								text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
							},
						]}
						isLoading={false}
					>
						<Index />
					</CommentsBlock>
				</>
			}
		</>
	);
};
