import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

//! Create Product Controller
const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    /*
    when we use express-formidable package then when we post simple values then it will be in  req.fields and for image it will be in req.files
    */

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is requried" });
      case !description:
        return res.status(500).send({ error: "description is requried" });
      case !price:
        return res.status(500).send({ error: "price is requried" });
      case !category:
        return res.status(500).send({ error: "category is requried" });
      case !quantity:
        return res.status(500).send({ error: "quantity is requried" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is requried and should less then 1mb" });
    }
    const data = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      data.photo.data = fs.readFileSync(photo.path);
      data.photo.contentType = photo.type;
    }
    const product = await data.save();
    console.log({
      success: true,
      message: "Product created successfully",
      product,
    });
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
    });
  }
};

//! Update Product Controller
const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    /*
    when we use express-formidable package then when we post simple values then it will be in  req.fields and for image it will be in req.files
    */

    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is requried" });
      case !description:
        return res.status(500).send({ error: "description is requried" });
      case !price:
        return res.status(500).send({ error: "price is requried" });
      case !category:
        return res.status(500).send({ error: "category is requried" });
      case !quantity:
        return res.status(500).send({ error: "quantity is requried" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is requried and should less then 1mb" });
    }

    //const data = await productModel.findByIdAndUpdate(req.params.pid,{ ...req.fields, slug: slugify(name) } ,{ new: true });

    const data = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      data.photo.data = fs.readFileSync(photo.path);
      data.photo.contentType = photo.type;
    }
    const product = await data.save();
    console.log({
      success: true,
      message: "Product updated successfully",
      product,
    });
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
    });
  }
};

//! Get All Product Controller
const getAllProductController = async (req, res) => {
  try {
    // const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1});

    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    console.log({
      success: true,
      message: "Get All products successfully",
      products,
    });
    res.status(200).send({
      success: true,
      message: "Get All products successfully",
      total_products: products.length,
      products,
    });
    /*
      The above code will not get photo from the products otherwise it will consume alot of time while loading and after it we apply limit that it will get the first 12 products and populate method will also add category information
    */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong while getting all the products",
      error,
    });
  }
};

//! Get Single Product
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    console.log({
      success: true,
      message: "Single Product fetched",
      product,
    });
    res.status(200).send({
      success: true,
      message: "Single Product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong while getting a single products",
      error,
    });
  }
};

//! Get Photo Controller
const getPhotoController = async (req, res) => {
  try {
    // const productPhoto=await productModel.findById(req.params.pid).select("photo")

    const productPhoto = await productModel
      .findById(req.params.pid)
      .select("photo");

    if (productPhoto.photo.data) {
      res.set("Content-type", productPhoto.photo.contentType);
      return res.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Something wents wrong while fetching the photo",
      error,
    });
  }
};

//! Delete Product Controller
const deleteProductController = async (req, res) => {
  try {
    // const product=await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");

    console.log({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });

    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export {
  createProductController,
  updateProductController,
  getAllProductController,
  getSingleProductController,
  getPhotoController,
  deleteProductController,
};
