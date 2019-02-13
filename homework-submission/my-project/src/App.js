import React, { Component } from 'react';
import './App.css';
import SingingIn from './components/SignIn';
import Posts from './components/Posts';
import AddForm from './components/AddForm';
import Service from './service/service';
import MaximizePost from './components/MaximizePost';

class App extends Component {
  state = {
    post: '',
    data: [],
    signIn: false,
    user: '',
    add: false,
    description: '',
    maxPost: {},
    showPost: false,
    comment: '',
    indexPost: -1,
  };

  componentDidMount() {
    Service.getPostList().then(data => this.setState({ data }));
  }

  handleSubmitSingingIn = e => {
    e.preventDefault();
    let user = e.target.author.value;
    if (user.length > 0) {
      this.setState({ user: user });
      this.setState({ signIn: true });
    }
  };
  SwitchAddMode = () => {
    this.setState({ add: !this.state.add });
  };
  signingOut = () => {
    this.setState({ signIn: false });
  };
  addPost = post => {
    this.setState({ data: [...this.state.data, post] });
  };
  addComment = comment => {
    this.setState({ comment: this.state.comment });
  };

  deletePost = () => {
    this.setState({ data: this.state.data });
  };

  handleMaximizePost = (maxPost, index) => {
    this.setState({ maxPost: maxPost });
    this.setState({ showPost: true });
    this.setState({ indexPost: index });
  };
  minPost = () => {
    this.setState({ showPost: false });
  };
  deleteComment = commentIndex => {
    let data = [...this.state.data];
    data[this.state.indexPost].comment.splice(commentIndex, 1);
    this.setState({ data });
  };
  editComment = newComment => {
    let data = [...this.state.data];
    data[this.state.indexPost].comment = newComment;
    this.setState({ data });
  };
  addComment = comments => {
    let data = [...this.state.data];
    data[this.state.indexPost].comment = comments;
    this.setState({ data });
  };

  render() {
    let posts = this.state.data.map((post, index) => (
      <Posts
        key={post.id}
        index={index}
        post={post}
        addComment={this.addComment}
        author={this.state.user}
        handleLike={this.handleLike}
        data={this.state.data}
        deletePost={this.deletePost}
        handleMaximizePost={this.handleMaximizePost}
      />
    ));
    return this.state.signIn ? (
      <div className="container">
        <AddForm
          addPost={this.addPost}
          SwitchAddMode={this.SwitchAddMode}
          author={this.state.user}
        />
        {this.state.showPost ? (
          <div className="max-div">
            <input type="button" value="Back to home" onClick={() => this.minPost()} />
            <MaximizePost
              post={this.state.maxPost}
              user={this.state.user}
              deleteComment={this.deleteComment}
              editComment={this.editComment}
              addComment={this.addComment}
            />
          </div>
        ) : !this.state.add ? (
          <div className="all-posts">
            <input type="button" value="Sign out" onClick={() => this.signingOut()} />
            {posts}
          </div>
        ) : null}
      </div>
    ) : (
      <SingingIn handleSubmitSingingIn={this.handleSubmitSingingIn} />
    );
  }
}

export default App;
