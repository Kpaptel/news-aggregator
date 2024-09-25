import React, { useEffect, useState } from 'react';
import NewsComponent from './NewsComponent'; // Ensure this path is correct

const NewsList = () => {
    const [articles, setArticles] = useState([]); // State to hold articles
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for any errors

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:8080/news');
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setArticles(data.articles); // Assuming your data structure has an 'articles' key
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []); // Runs once when the component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {articles.length > 0 ? (
                articles.map((article, index) => (
                    <NewsComponent key={index} article={article} />
                ))
            ) : (
                <p>No news articles available.</p>
            )}
        </div>
    );
};

export default NewsList;
