import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Markdown from "react-markdown";
import Article from './Article';
import { nodes } from './nodes';

import './ArticleContainer.css';

import React, { useState, useEffect } from 'react';

interface ArticleContainerProps {
    article?: string;
}

function ArticleContainer() {
	const params = useParams();
	const articleId = params.articleId;
	const articleName = nodes.find((node: any) => node.id === articleId)?.name;

	const navigate = useNavigate();

	const goHome = () => {
		navigate(`/`);
	};

	const [markdownContent, setMarkdownContent] = useState<string[]>([]);

	useEffect(() => {
		// open markdown file and ingest
		fetch(`/articles/${articleId}.md`)
			.then((response) => response.text())
			.then((text) => {
				setMarkdownContent(text.split('<Nest>'));
			});
	}, []);

	return (
		<div className="Article">
			<button onClick={goHome}>Home</button>
			<h1>{articleName}</h1>
			{markdownContent.map((content, index) => {
				if (index % 2 === 1) {
					const [name, id] = content.split('|')
					return <Article articleName={name} articleId={id}/>;
				} else {
					return (
						<Markdown>
							{content}
						</Markdown>
					);
				}
			})}
		</div>
	);
}

export default ArticleContainer;
