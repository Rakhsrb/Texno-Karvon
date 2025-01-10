import Career from "../models/careerModel.js";

export const createCareer = async (req, res) => {
  try {
    const { name, salary, requirements, tasks } = req.body;

    if (!name || !salary?.from || !salary?.to) {
      return res
        .status(400)
        .json({ message: "Все обязательные поля должны быть заполнены" });
    }

    const newCareer = new Career({
      name,
      salary,
      requirements: requirements || [],
      tasks: tasks || [],
    });

    const savedCareer = await newCareer.save();
    res.status(201).json(savedCareer);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании записи", error });
  }
};

export const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json({ data: careers });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении записей", error });
  }
};

export const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);
    if (!career) {
      return res.status(404).json({ message: "Запись не найдена" });
    }

    res.status(200).json({ data: career });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении записи", error });
  }
};

export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary, requirements, tasks } = req.body;

    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      {
        name,
        salary,
        requirements,
        tasks,
      },
      { new: true }
    );

    if (!updatedCareer) {
      return res.status(404).json({ message: "Запись не найдена" });
    }

    res.status(200).json(updatedCareer);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении записи", error });
  }
};

export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCareer = await Career.findByIdAndDelete(id);
    if (!deletedCareer) {
      return res.status(404).json({ message: "Запись не найдена" });
    }

    res.status(200).json({ message: "Запись успешно удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении записи", error });
  }
};
