import { useNavigate, useParams } from 'react-router-dom';
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
	const articleNode = nodes.find((node: any) => node.id === articleId);
	const articleName = articleNode?.name;
	const articleSymbol = articleNode?.symbol;

	const navigate = useNavigate();

	const goHome = () => {
		navigate(`/`);
	};

	const [markdownContent, setMarkdownContent] = useState<string[]>([]);

	useEffect(() => {
		// open markdown file and ingest
		fetch(`/qualiaCookbook/articles/${articleId}.md`)
			.then((response) => response.text())
			.then((text) => {
				setMarkdownContent(text.split('<Nest>'));
			}
		);
	}, []);

	return (
		<div className="Article">
			<button className="button-home" onClick={goHome}>
				<img src="/qualiaCookbook/graph-button.svg" alt="home" className="home-icon"/>
			</button>
			<h2 className="header-scrolling">{articleSymbol} {articleName}</h2>
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
