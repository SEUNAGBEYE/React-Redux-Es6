import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthor, onSave, onChange, loading, errors}) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput 
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        errors={errors.title}
      />

      <SelectInput 
        name="authorId"
        label="Author"
        value={course.authorId}
        defaultOption="Select Author"
        options={allAuthor}
        onChange={onChange}
        errors={errors.authorId}
      />

      <TextInput 
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        errors={errors.category}
      />

      <TextInput 
        name="length"
        label="Length"
        value={course.length}
        onChange={onChange}
        errors={errors.length}
      />

      <input
        type="submit"
        disabled={loading}
        value={loading ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  )
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthor: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default CourseForm;
