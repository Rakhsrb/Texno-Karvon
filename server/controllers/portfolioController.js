import Portfolio from "../models/portfolioModel.js";
import { sendError } from "../utils/SendError.js";

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

export async function getAllPortfolios(req, res) {
  try {
    const { category, title } = req.query;

    const query = {};
    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: "i" };

    const portfolios = await Portfolio.find(query);
    return res.status(200).json({ data: portfolios });
  } catch (error) {
    console.error("Error retrieving portfolios:", error);
    sendError(res);
  }
}

export async function getPortfolioById(req, res) {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found." });
    }

    return res.status(200).json({ data: portfolio });
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

    const portfolio = await Portfolio.findByIdAndDelete(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found." });
    }

    return res
      .status(200)
      .json({ message: "Portfolio item deleted successfully." });
  } catch (error) {
    sendError(res);
  }
}
