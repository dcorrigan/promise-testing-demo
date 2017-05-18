import React from 'react'
import Api from './Api';

export default class RecipeSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: null
    }
  }

  updateSearchTerm = (e) => {
    e.preventDefault();
    this.setState({searchTerm: e.target.value});
  }

  submit = () => {
    Api.get(
      'http://api.awesomerecipes.com/search',
      {query: this.state.searchTerm}
    ).then(json => {
      this.props.updateParent(json);
    })
  }

  render() {
    return (<form>
      <label htmlFor="search">Search for a recipe!</label>
      <input
        type="text"
        name="search"
        onChange={this.updateSearchTerm}
      />
      <input
        type="submit"
        value="Submit"
        onClick={this.submit}
      />
    </form>);
  }
}
