import Portfolio from "../models/portfolioModel.js";
import { sendError } from "../utils/SendError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAllPortfolios(req, res) {
  try {
    const { category, title } = req.query;

    const query = {};
    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: "i" };

    const portfolios = await Portfolio.find(query).populate("authors");
    return res.status(200).json({ data: portfolios });
  } catch (error) {
    console.error("Error retrieving portfolios:", error);
    sendError(res);
  }
}

export async function getPortfolioById(req, res) {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findById(id).populate("authors");
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found." });
    }

    return res.status(200).json({ data: portfolio });
  } catch (error) {
    sendError(res);
  }
}

export const addAuthorToThePortfolio = async (req, res) => {
  const { author, project } = req.body;

  try {
    const portfolio = await Portfolio.findById(project._id);

    if (!portfolio) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isExists = portfolio.authors.some(
      (existingStaffId) => existingStaffId.toString() === author._id
    );

    if (isExists) {
      return res.status(409).json({
        message: "The author has already been added to this project",
      });
    }

    portfolio.authors.push(author._id);
    await portfolio.save();

    return res
      .status(200)
      .json({ message: "Author has been added successfully" });
  } catch (error) {
    console.error("Error adding author to project:", error);
    return res
      .status(500)
      .json({ message: "Server error while adding author" });
  }
};

export const removeAuthorFromThePortfolio = async (req, res) => {
  const { author, project } = req.body;

  try {
    const portfolio = await Portfolio.findById(project._id);

    if (!portfolio) {
      return res.status(404).json({ message: "Project not found" });
    }

    portfolio.authors = portfolio.authors.filter(
      (ar) => ar._id.toString() !== author._id
    );

    await portfolio.save();

    return res
      .status(200)
      .json({ message: "Author has been removed successfully" });
  } catch (error) {
    console.error("Error removing author from project:", error);
    return res
      .status(500)
      .json({ message: "Server error while adding author" });
  }
};

export async function createPortfolio(req, res) {
  try {
    const { title, description, link, category, tags } = req.body;

    if (!title || !description || !link || !category || tags.length <= 0) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const portfolio = new Portfolio({
      title,
      description,
      link,
      category,
      photo: req.uploadedImage,
      tags,
    });

    await portfolio.save();
    return res.status(201).json({
      message: "Portfolio item created successfully.",
      data: portfolio,
    });
  } catch (error) {
    sendError(res);
  }
}

export async function updatePortfolio(req, res) {
  try {
    const { id } = req.params;
    const { title, description, link, category, photo, tags, likeCount } =
      req.body;

    const updates = {
      title,
      description,
      link,
      category,
      photo,
      tags,
      likeCount,
    };

    const portfolio = await Portfolio.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found." });
    }

    return res.status(200).json({
      message: "Portfolio item updated successfully.",
      data: portfolio,
    });
  } catch (error) {
    sendError(res);
  }
}

export async function deletePortfolio(req, res) {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findById(id);

    if (portfolio && portfolio.photo) {
      const slicedPhoto = portfolio.photo.slice(30);
      const filePath = path.join(__dirname, "..", "uploads", slicedPhoto);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      } catch (err) {
        console.error(`Failed to delete image: ${filePath}`, err);
      }
    }

    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio item not found." });
    }

    return res
      .status(200)
      .json({ message: "Portfolio item deleted successfully." });
  } catch (error) {
    sendError(res);
  }
}
