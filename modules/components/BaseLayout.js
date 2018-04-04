import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';

import Home from './Home.js';

const BaseLayout = () => (
    <div className="base">
      <header>
        <p>React Router v4 Browser Example</p>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
  
            </ul>
          </nav>
      </header>
      <div className="container">
        <Route path="/" exact component={Home} />
      </div>
      <footer>
          React Router v4 Browser Example (c) 2017
      </footer>
    </div>
  )