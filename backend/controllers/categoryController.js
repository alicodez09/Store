import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//! Create Category Controller

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(501).send({ message: "Name is Required" });
    }
    // Checking the category
    const existingCategory = await categoryModel.findOne({ name });
    // checking the existing category
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exist",
      });
    }
    // saving the category
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    console.log({
      success: true,
      message: "New Category Created",
      category,
    });
    res.status(201).send({
      success: true,
      message: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Registration",
    });
  }
};

//! Update Category Controller
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // updating the category
    //TODO=>const category = await categoryModel.findByIdAndUpdate( id, { name, slug: slugify(name), }, { new: true } );

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    console.log({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
    });
  }
};
//! Get All Category
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    console.log({
      success: true,
      message: "Get All categories successfully",
      categories,
    });
    res.status(200).send({
      success: true,
      message: "Get All categories successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong while getting all the categories",
      error,
    });
  }
};
//! Get Single Category
const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne(slug);

    // const category = await categoryModel.findOne({slug:slug.params.slug});
    console.log({
      success: true,
      message: "Get Single category successfully",
      category,
    });
    res.status(200).send({
      success: true,
      message: "Get Single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong while getting  category",
      error,
    });
  }
};
// ! Delete Category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    console.log({
      success: true,
      message: "category deleted successfully",
      category,
    });
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong while deleting  category",
      error,
    });
  }
};
export {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
};
