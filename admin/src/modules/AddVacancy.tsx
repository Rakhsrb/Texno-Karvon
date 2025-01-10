import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import { CareerTypes } from "@/types/RootTypes";

export function AddVacancy() {
  const [formData, setFormData] = useState<CareerTypes>({
    name: "",
    salary: {
      from: 0,
      to: 0,
    },
    requirements: [],
    tasks: [],
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newTask, setNewTask] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      salary: {
        from: 0,
        to: 0,
      },
      requirements: [],
      tasks: [],
    });
    setNewRequirement("");
    setNewTask("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Название обязательно.";
    }

    if (formData.requirements.some((req) => !req.trim())) {
      newErrors.requirements = "Все требования должны быть заполнены.";
    }

    if (formData.tasks.some((task) => !task.trim())) {
      newErrors.tasks = "Все задания должны быть заполнены.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement],
      });
      setNewRequirement("");
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      setFormData({
        ...formData,
        tasks: [...formData.tasks, newTask],
      });
      setNewTask("");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log(formData);

      const response = await Fetch.post("career", formData);
      console.log(response);

      toast("Вакансия была создана", {
        action: {
          label: "Удалить",
          onClick: () => console.log("Отменить"),
        },
      });
      resetForm();
      setIsSheetOpen(false);
    } catch (error) {
      alert("Не удалось создать вакансию. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) resetForm();
      }}
    >
      <SheetTrigger asChild>
        <Button variant="secondary">Новая вакансия</Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">
            Создать новую вакансию
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <span>Заполните все поля для создания вакансии</span>
        </SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          {/* Название */}
          <div className="space-y-1">
            <Label htmlFor="name">
              Название
              <span
                className={`${errors.name ? "text-red-500" : "text-blue-500"}`}
              >
                *
              </span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Зарплата */}
          <div className="flex gap-2">
            <div className="space-y-1 flex-1">
              <Label htmlFor="salaryFrom">Зарплата от</Label>
              <Input
                id="salaryFrom"
                type="number"
                value={formData.salary.from}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: {
                      ...formData.salary,
                      from: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label htmlFor="salaryTo">Зарплата до</Label>
              <Input
                id="salaryTo"
                type="number"
                value={formData.salary.to}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: { ...formData.salary, to: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>

          {/* Требования */}
          <div className="space-y-1">
            <Label>Требования</Label>
            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Добавить требование"
              />
              <Button
                variant={"outline"}
                className="text-black"
                onClick={addRequirement}
              >
                Добавить
              </Button>
            </div>
            <ul className="flex flex-col gap-2">
              {formData.requirements.map((requirement, index) => (
                <li key={index} className="list-disc">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          {/* Задания */}
          <div className="space-y-1">
            <Label>Задания</Label>
            <div className="flex gap-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Добавить задание"
              />
              <Button
                variant={"outline"}
                className="text-black"
                onClick={addTask}
              >
                Добавить
              </Button>
            </div>
            <ul className="flex flex-col gap-2">
              {formData.tasks.map((task, index) => (
                <li key={index} className="list-disc">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SheetFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setIsSheetOpen(false);
              resetForm();
            }}
          >
            Отменить
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Создание..." : "Создать"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
