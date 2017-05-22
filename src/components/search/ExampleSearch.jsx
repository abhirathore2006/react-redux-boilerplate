import React from 'react';
import CustomSelectSearch from './CustomSearch';
import cities from './Cities'

export class ExampleSearch extends React.Component{
  constructor(props){
    super(props);
    let data = cities.map((city,i)=>{
      return {name: city.name, value:i, somedata:i}
    })
    console.log(data);
    this.state = {data:data, test1:[],test2:[],test3:[],test4:[]}
  }
  renderFriend(option) {
    //console.log(option);
  return (<span>{option.name}</span>);
}
  render(){

    return (
      <div>
      <CustomSelectSearch name="test1" multiple={true} value={this.state.test1} height={172} options={this.state.data} onBlur={(o,s,p)=>this.setState({test1:o})} placeholder="Search friends" renderOption={this.renderFriend} />
      <CustomSelectSearch name="test2" multiple={true} value={this.state.test2} height={172} options={this.state.data} onBlur={(o,s,p)=>this.setState({test2:o})} placeholder="Search friends" renderOption={this.renderFriend} />
      <CustomSelectSearch name="test3" multiple={true} value={this.state.test3} height={172} options={this.state.data} onBlur={(o,s,p)=>this.setState({test3:o})} placeholder="Search friends" renderOption={this.renderFriend} />
      <CustomSelectSearch name="test4" multiple={true} value={this.state.test4} height={172} options={this.state.data} onBlur={(o,s,p)=>this.setState({test4:o})} placeholder="Search friends" renderOption={this.renderFriend} />
      </div>
  )
  }

}
