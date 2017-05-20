import * as React from 'react';
import { Link } from 'react-router'
import {ExampleSearch} from '../search/ExampleSearch'
class App extends React.Component<{},{}>{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>Initial Setup is Complete
      <Link to="/home">home</Link>
      {this.props.children}
      <ExampleSearch />
    </div>)
  }
}

export default App;
