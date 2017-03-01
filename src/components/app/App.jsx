import * as React from 'react';
import { Link } from 'react-router'
class App extends React.Component<{},{}>{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>Initial Setup is Complete
      <Link to="/home">home</Link>
      {this.props.children}
    </div>)
  }
}

export default App;
