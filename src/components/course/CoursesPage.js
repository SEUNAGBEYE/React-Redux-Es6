import React, { PropTypes, Component } from 'react';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';


class CoursesPage extends Component {
  constructor(props, context){
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  componentDidMount(){
    this.props.loadCourses();
  }
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  
  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.object.isRequired,
  loadCourses: PropTypes.object.isRequired
};

export default CoursesPage;
