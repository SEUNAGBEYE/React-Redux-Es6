import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import {saveCourse, loadCourses} from '../../actions/courseActions';
import {loadAuthors} from '../../actions/authorActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends Component {
  constructor(props, context){
    super(props, context);
    
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidMount() {
    this.props.authorActions.loadAuthors();
    this.props.params.id && this.props.courseActions.loadCourses();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id){
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    let course = this.state.course;
    course = Object.assign({}, course, { [event.target.name]: event.target.value});
    return this.setState({course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.courseActions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        this.setState({saving: false});
        toastr.error(error);
      });
    
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course Added');
    this.context.router.push('/courses');
  }
  render() {
    return (
        <CourseForm 
          course={this.state.course}
          errors={this.state.errors}
          allAuthor={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          saving={this.state.saving}
        />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired,
  courseActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id === id);
  return course ? course[0] : null;
};

const mapStateToProps = (state, ownProps) => {
  let courseId = ownProps.params.id;
  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if (courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  const transformAuthorsForDropdown = state.authors.map(author => ({
    value: author.id,
    text: `${author.firstName} ${author.lastName}`
  }));

  return {
    course,
    authors: transformAuthorsForDropdown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    courseActions: bindActionCreators({saveCourse, loadCourses}, dispatch),
    authorActions: bindActionCreators({loadAuthors}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
