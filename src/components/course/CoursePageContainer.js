import { connect } from 'react-redux';
import CoursePage from './CoursesPage';
import {loadCourses} from '../../actions/courseActions'


const mapStateToProps = (state) => ({
  courses: state.courses
});

const mapDispatchToProps = (dispatch) => ({
  loadCourses(){
    dispatch(loadCourses());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
