import React, { PropTypes, Component } from 'react';
import Header from './common/Header';
import { CoursesPage } from './course/CoursesPage';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}



App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;