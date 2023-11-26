import Graph from './Graph';
import Article from './ArticleContainer';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Graph/>} />
        <Route path="/:selectedId" element={<Graph/>} />
        <Route path="/article/:articleId" element={<Article/>} />
      </Routes>
    </Router>
  );
}

export default App;
