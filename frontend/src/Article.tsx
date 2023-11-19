import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Markdown from "react-markdown";

import './Article.css';

import React, { useState, useEffect } from 'react';

function Article() {
	const params = useParams<{ articleId: string }>();
	const articleId = params.articleId;

	const navigate = useNavigate();

	const goHome = () => {
		navigate(`/`);
	};

	const [markdownContent, setMarkdownContent] = useState('');

	useEffect(() => {
		// open markdown file and ingest
		fetch(`/articles/${articleId}.md`)
			.then((response) => response.text())
			.then((text) => {
				setMarkdownContent(text);
			});
	}, []);

	return (
		<div className="Article">
			<button onClick={goHome}>Home</button>
			<Markdown>
				{markdownContent}
			</Markdown>
		</div>
	);
}

export default Article;
