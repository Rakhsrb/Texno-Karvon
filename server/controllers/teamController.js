import Team from "../models/teamModel.js";
import { sendError } from "../utils/SendError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function GetAllTeam(req, res) {
  try {
    const { fullName } = req.query;

    const query = {};

    if (fullName) query.fullName = { $regex: fullName, $options: "i" };

    const team = await Team.find(query).populate("portfolios");
    return res.status(200).json({ data: team });
  } catch (error) {
    sendError(res);
  }
}

export async function GetOneTeam(req, res) {
  try {
    const { id } = req.params;

    const teamate = await Team.findById(id).populate("portfolios");
    if (!teamate) {
      return res.status(404).json({ message: "Teamate not found." });
    }

    return res.status(200).json({ data: teamate });
  } catch (error) {
    sendError(res);
  }
}

export const addPortfolioToTheTeamate = async (req, res) => {
  const { project, author } = req.body;

  try {
    const teamate = await Team.findById(author._id);

    if (!teamate) {
      return res.status(404).json({ message: "Author not found" });
    }

    const isExists = teamate.portfolios.some(
      (existingPortfolioId) => existingPortfolioId.toString() === project._id
    );

    if (isExists) {
      return res.status(409).json({
        message: "The portfolio has already been added to this teamate",
      });
    }

    teamate.portfolios.push(project._id);
    await teamate.save();

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

export const removePortfolioFromTheTeamate = async (req, res) => {
  const { project, author } = req.body;

  try {
    const teamate = await Team.findById(author._id);

    if (!teamate) {
      return res.status(404).json({ message: "Author not found" });
    }

    teamate.portfolios = teamate.portfolios.filter(
      (ar) => ar._id.toString() !== project._id
    );

    await teamate.save();
    return res
      .status(200)
      .json({ message: "Portfolio has been removed successfully" });
  } catch (error) {
    console.error("Error removing author from project:", error);
    return res
      .status(500)
      .json({ message: "Server error while adding author" });
  }
};

export async function addTeamate(req, res) {
  try {
    const { fullName, biography, role, skills } = req.body;

    if (!fullName || !biography || !role || skills.length <= 0) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const teamate = new Team({
      fullName,
      biography,
      role,
      skills,
      photo: req.uploadedImage,
    });

    await teamate.save();
    return res.status(201).json({
      message: "Teamate has been added successfully.",
      data: teamate,
    });
  } catch (error) {
    sendError(res);
  }
}

export async function editTeamate(req, res) {
  try {
    const { id } = req.params;
    const { fullName, biography, role, skills, photo } = req.body;

    const updates = {
      fullName,
      biography,
      role,
      skills,
      photo: req.uploadedImage,
    };

    const teamate = await Team.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!teamate) {
      return res.status(404).json({ message: "Teamate not found." });
    }

    return res.status(200).json({
      message: "Teamate has been edited successfully.",
      data: teamate,
    });
  } catch (error) {
    sendError(res);
  }
}

export async function deleteTeamate(req, res) {
  const { id } = req.params;
  try {
    const teamate = await Team.findById(id);

    if (!teamate) return res.status(404).json({ message: "Teamate not found" });

    const slicedPhoto = teamate.photo.slice(30);
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

    const deletedTeamate = await Team.findByIdAndDelete(id);
    if (!deletedTeamate) {
      return res.status(404).json({ message: "Teamate not found." });
    }

    return res.status(200).json({ message: "Teamate deleted successfully." });
  } catch (error) {
    sendError(res);
  }
}
