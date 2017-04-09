import * as React from 'react';
import { connect } from 'react-redux'
import {getUserData} from './HomeActions'
class Home extends React.Component<{},{}>{
  constructor(props){
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(getUserData())
  }
  render(){
    return (<div>
              {this.props.data ?
                <div>
                  <h1>welcome: {this.props.data.name}</h1>
                </div>
                :'loading data...'}
            </div>)
  }
}

export const mapStateToProps = (state, ownProps) =>({
  data: state.home.data
})
export default connect(mapStateToProps)(Home);
