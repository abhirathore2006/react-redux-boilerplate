import React from 'react';
import SelectSearch from './SelectSearch';
import cities from './Cities'

export class ExampleSearch extends React.Component{
  constructor(props){
    super(props);
    let data = cities.map((city,i)=>{
      return {name: city.name, value:i, somedata:i}
    })
    console.log(data);
    this.state = {data:data}
  }
  renderFriend(option) {
    //console.log(option);
  return (<span>{option.name}</span>);
}
  render(){

    return (
      <SelectSearch name="friends" multiple={true} height={172} options={this.state.data} onBlur={(o,s,p)=>console.log(o,s,p)} placeholder="Search friends" renderOption={this.renderFriend} />
    )
  }

}
