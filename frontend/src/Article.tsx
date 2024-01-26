import Markdown from "react-markdown";

import './Article.css';

import React, { useState, useEffect } from 'react';

interface ArticleProps {
    articleName: string;
    articleId: string;
}

const Article: React.FC<ArticleProps> = ({ articleName, articleId }) => {

	const [markdownContent, setMarkdownContent] = useState<string[]>([]);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	useEffect(() => {
		// open markdown file and /ingest
		fetch(`/articles/${articleId}.md`)
			.then((response) => response.text())
			.then((text) => {
				setMarkdownContent(text.split('<Nest>'));
			});
	}, []);

    const expandArticle = () => {
        setIsExpanded(!isExpanded);
    }

	return (
		<div 
            className="article" 
        >
            <div 
                className="article-title" 
                onClick={expandArticle}
            >
                {articleName}
            </div>
            {!isExpanded ? 
                ''
            : 
                <div className="article-body">
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
            }
		</div>
	);
}

export default Article;
