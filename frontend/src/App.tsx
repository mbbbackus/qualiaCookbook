import Graph from './Graph';
import Article from './ArticleContainer';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Graph/>} />
        <Route path="/article/:articleId" element={<Article/>} />
      </Routes>
    </Router>
  );
}

// function App() {
// 	return (
// 		<div className="App">
// 			<Graph/>
// 		</div>
//   	);
// }

export default App;
