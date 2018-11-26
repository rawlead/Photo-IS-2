import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import LoadMore from '../common/LoadMore';

class AuthorsComponent extends Component {
  constructor(props) {
    super(props);
    this.createAuthorsView = this.createAuthorsView.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);

    this.state = {
      authorFilter: '',
    }
  }

  handleClearFilter() {
    this.setState({
      authorFilter: ''
    })
  }

  componentDidMount() {
    if (this.props.authors.length > 0) {
      return;
    }
    this.props.loadAuthorList();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoadMore() {
    const { page } = this.props;
    this.props.loadAuthorList(page + 1);
  }

  createAuthorsView() {
    const {authorFilter} = this.state
    const filteredAuthors = this.props.authors.filter((author) => {
      let authorName = author.firstName.toLowerCase() + author.username.toLowerCase()
      return authorName.indexOf(
        authorFilter.toLowerCase()) !== -1
    })

    return filteredAuthors.map((author) => (
      <div key={author.id} className="grid-item hvr-glow hvr-curl-top-right">
        <Link to={'/profile/' + author.username}>
          <img src={author.avatarUrl} alt="" />
          <p>@{author.username}<br />
            {author.firstName}</p>
        </Link>
      </div>)
    )
  }

  render() {
    const { isLoading, isLast, error, page, totalPages, size, totalElements } = this.props;
    const { authorFilter } = this.state;
     const authorsView = this.createAuthorsView();
    return (
      <Layout title="Authors">
        <div id="authorsRoot">

          <div className="authors-list-header">
          <p style={{margin: '5px 0'}}>Shown pages: {page + 1} / {totalPages} <span style={{color: '#EEB902'}}> | </span> Authors per page: {size} <span style={{color: '#EEB902'}}> | </span> Authors listed: {totalElements}</p>
          <form>
          <input 
            type="text" 
            className="authors-filter-input" 
            placeholder="filter"
            onChange={this.handleChange}
            value={authorFilter}
            name="authorFilter"
          />
          {authorFilter &&
          <button type="button" onClick={this.handleClearFilter} className="btn btn-dark">Clear</button>
          }
          </form>
          </div>
          
          <div className="authors-container" >
            {authorsView}
          </div>

          <p>{error}</p>

          <LoadMore isLoading={isLoading} isLast={isLast} handleLoadMore={this.handleLoadMore} />
        </div>
      </Layout>
    );
  }
}

export default AuthorsComponent;
