import React from 'react';
import onClickOutside from 'react-onclickoutside';
import {List} from 'react-virtualized';
class CustomSelectSearch extends React.Component {
  constructor(props,...rest){
    super(props,rest)
    let options = [{name:'Select All',value:'select-all-search'},...props.options];
    let value   = props.value? props.value:[];

    this.state = {
        search         : '',
        value          : value,
        defaultOptions : props.options,
        options        : options,
        highlighted    : null,
        focus          : false
    };
    this.bound = {
        onClickOut    : this.onClickOut.bind(this),
        onFocus       : this.onFocus.bind(this),
        onBlur        : this.onBlur.bind(this),
        onChange      : this.onChange.bind(this),
        onKeyPress    : this.onKeyPress.bind(this),
        onKeyDown     : this.onKeyDown.bind(this),
        onKeyUp       : this.onKeyUp.bind(this),
        toggle        : this.toggle.bind(this)
    };
    this.renderOption = this.renderOption.bind(this);
    this.selectAll = false;
  }

    bind() {

    }

  componentWillReceiveProps(nextProps) {
      if (nextProps.options) {
          this.setState({
              options: nextProps.options,
              defaultOptions: nextProps.options
          })
      }
  }
  componentWillUnmount() {
      document.removeEventListener('keydown', this.bound.onKeyDown);
      document.removeEventListener('keypress', this.bound.onKeyPress);
      document.removeEventListener('keyup', this.bound.onKeyUp);
  }

  componentDidUpdate(prevProps, prevState) {
      /* Fire callbacks */
      if (this.state.focus && this.state.focus != prevState.focus) {
          this.handleFocus();
      }

      if (!this.state.focus && this.state.focus != prevState.focus) {
          this.handleBlur();
          this.props.onBlur.call(null, this.state.value, this.state, this.props);
      }
  }

  onChange(e) {

  }

  onKeyPress(e) {
      if (!this.state.options || this.state.options.length < 1) {
          return;
      }

  }

  onKeyDown(e) {
      if (!this.state.focus) {
          return;
      }

      /** Tab */
      if (e.keyCode === 9) {
          return this.onBlur();
      }

  }

  onKeyUp(e) {
      /** Esc */
      if (e.keyCode === 27) {
          this.handleEsc();
      }
  }

  handleEsc() {
      this.onBlur();
  }
  handleFocus() {
      document.addEventListener('keydown', this.bound.onKeyDown);
      document.addEventListener('keypress', this.bound.onKeyPress);
      document.addEventListener('keyup', this.bound.onKeyUp);
    }
  handleBlur() {
      document.removeEventListener('keydown', this.bound.onKeyDown);
      document.removeEventListener('keypress', this.bound.onKeyPress);
      document.removeEventListener('keyup', this.bound.onKeyUp);
  }
  toggle() {
      if (this.state.focus) {
          this.onBlur();
      } else {
          this.onFocus();
      }
  }
  onFocus() {
        this.setState({focus: true});
  }
  onBlur() {
      this.setState({focus: false, search: '',options:this.state.defaultOptions});
  }

  onClickOut() {
    if(this.state.focus){
      console.log("clicked out")
        this.onBlur();
    }

  }
  chooseOption(option){
    console.log(option);
    let value;
    if(option.value == 'select-all-search'){
      this.selectAll = true;
      value =  this.state.options.map(option=>option.value)
    }else {
      this.selectAll = false;
      value = this.state.value
      value.push(option.value)
    }
      this.setState({value:value})
  }
  removeOption(index){
      let newValue = this.state.value;
    if(index ==0){
      newValue = [];
    }{
      newValue.splice(index,1)
    }
    this.selectAll = false;
    this.setState({value:newValue})
  }
  renderSearchField() {
    return <input style={{width:'100%'}} name={null} ref="search" onFocus={this.bound.onFocus} onKeyPress={this.bound.onKeyPress} className={"custom-select-searchinput"} type="search" value={this.state.search} onChange={this.bound.onChange} placeholder={this.props.placeholder} />;
   }
   renderOption({ index, isScrolling, key, style }){
     let option = this.state.options[index]
     let optionIndex = this.state.value.indexOf(option.value);
     console.log(optionIndex,this.state.value.indexOf(option.value))
     if(optionIndex>=0 || (index ==0 && this.selectAll)){
       return (<div className={"select-search-option option_selected"} key={key} style={style} onClick={this.removeOption.bind(this, optionIndex)}><span>{option.name}</span></div>)
     }else{
       return (<div className={"select-search-option"} key={key} style={style} onClick={this.chooseOption.bind(this, option)}><span>{option.name}</span></div>)
     }
   }
   renderOptions(){
     return (
       <List
        className={'list-search-options'}
        height={300}
        overscanRowCount={2}
        noRowsRenderer={()=><div>no rows found</div>}
        rowCount={this.state.options.length}
        rowHeight={40}
        rowRenderer={this.renderOption}
        width={300}
        style={{outline: 'none'}}
      />

     )
   }
   render(){
     return (
       <div className={"select-search-container"} style={{width:300}}>
         {this.renderSearchField()}
         {this.state.focus &&<div className={"select-search-options"}>
          {this.renderOptions()}
         </div>}
      </div>
    )
   }
}

CustomSelectSearch = onClickOutside(CustomSelectSearch,{
    handleClickOutside: function(instance){
        return instance.bound.onClickOut
    }
})

export default CustomSelectSearch;
