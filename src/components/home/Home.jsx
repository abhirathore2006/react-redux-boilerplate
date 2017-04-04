import * as React from 'react';
import { connect } from 'react-redux'
class Home extends React.Component<{},{}>{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>{this.props.title}</div>)
  }
}

export const mapStateToProps = (state, ownProps) =>({
  title: state.home.title
})
export default connect(mapStateToProps)(Home);
