import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, setValue)} className="w-75 m-auto">
        <input
          className="form-control"
          type="text"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
