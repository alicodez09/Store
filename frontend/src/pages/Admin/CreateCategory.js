import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e, setValue) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );

      if (data?.success) {
        alert("Category Created");
        setValue("");
        handleRefresh();
      } else {
        alert("Something went wrong while creating category");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data?.success) {
        alert("Category Updated");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        handleRefresh();
        getAllCategory();
      } else {
        alert("Something went wrong while creating category");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );

      if (data?.success) {
        alert("Category Deleted");
        setSelected(null);
        setUpdatedName("");
        handleRefresh();
        getAllCategory();
      } else {
        alert("Something went wrong while creating category");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while getting all categories");
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    getAllCategory();
  }, [refresh]);

  return (
    <>
      <div className="container-fluid vh-100 bg-light">
        <div className="row">
          <div className="col-4">
            <AdminMenu />
          </div>
          <div className="col-8 mt-5 pt-2">
            <h2 className="text-center">Create Category</h2>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="table-responsive w-75 m-auto">
              <table className="table table-sm bg-dark text-white">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm ms-1"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-1"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              open={visible}
              footer={null}
            >
              <h3 className="text-center mb-4">Edit Category</h3>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
