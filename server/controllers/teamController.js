import Team from "../models/teamModel.js";
import { sendError } from "../utils/SendError.js";

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

export async function addTeamate(req, res) {
  try {
    const { fullName, biography, role, skills, photo } = req.body;

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
  try {
    const { id } = req.params;

    const teamate = await Team.findByIdAndDelete(id);
    if (!teamate) {
      return res.status(404).json({ message: "Teamate not found." });
    }

    return res.status(200).json({ message: "Teamate deleted successfully." });
  } catch (error) {
    sendError(res);
  }
}
