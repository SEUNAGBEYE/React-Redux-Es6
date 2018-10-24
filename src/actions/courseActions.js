import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import {beginAjaxCalls, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses){
  return { type: types.LOAD_COURSES_SUCCESS, courses};
}
export function updateCourseSuccess(course){
  return { type: types.UPDATE_COURSE_SUCCESS, course};
}
export function saveCourseSuccess(course){
  return { type: types.CREATE_COURSE_SUCCESS, course};
}

export function loadCourses() {
  return function(dispatch){
    dispatch(beginAjaxCalls());
    return CourseApi.getAllCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveCourse(course) {
  return function(dispatch){
    dispatch(beginAjaxCalls());
    return CourseApi.saveCourse(course)
    .then(savedCourse => {
      savedCourse.id ? dispatch(updateCourseSuccess(savedCourse)) :
      dispatch(saveCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}