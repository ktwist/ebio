import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BiorhythmEntriesView from './components/BioEntries';
import GraphView from './components/BioGraph';

function App() {
  return (
    <div className="mx-5 bg-gray-200 md:mx-10 lg:mx-20 h-full" >
        <Router>
            <Switch>
                <Route path='/' exact component={BiorhythmEntriesView} />
                <Route path='/graph/:graphId'exact component={GraphView} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;