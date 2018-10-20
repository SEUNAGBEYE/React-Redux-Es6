import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Homepage from './components/home/HomePage';
import Aboutpage from './components/about/AboutPage';
import Coursespage from './components/course/CoursesPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Homepage} />
        <Route path="courses" component={Coursespage} />
        <Route path="about" component={Aboutpage} />
    </Route>
);