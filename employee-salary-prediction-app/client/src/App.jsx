// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import PredictionForm from './components/PredictionForm';
// import ResultsPage from './components/ResultsPage';
// import './styles/main.css';

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <Switch>
//                     <Route path="/" exact component={HomePage} />
//                     <Route path="/predict" component={PredictionForm} />
//                     <Route path="/results" component={ResultsPage} />
//                 </Switch>
//             </div>
//         </Router>
//     );
// }

// export default App;

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import PredictionForm from './components/PredictionForm';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/predict" component={PredictionForm} />
        <Route path="/result" component={ResultsPage} />
      </Switch>
    </Router>
  );
}

export default App;