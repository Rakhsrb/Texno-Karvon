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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";

export function AddTeamate() {
  const [formData, setFormData] = useState<{
    fullName: string;
    biography: string;
    role: string;
    photo: File | null;
    skills: string[];
  }>({
    fullName: "",
    biography: "",
    role: "",
    photo: null,
    skills: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState([
    "React.js",
    "Next.js",
    "Nodejs & Express.js",
    "Nest.js",
    "Java & Spring",
    "React native",
    "Flutter",
    "Android & IOS",
  ]);

  const resetForm = () => {
    setFormData({
      fullName: "",
      biography: "",
      role: "",
      photo: null,
      skills: [],
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Fullname is required.";
    if (!formData.biography.trim())
      newErrors.biography = "Biography is required.";
    if (!formData.role.trim()) newErrors.role = "Role is required.";
    if (!formData.photo) newErrors.photo = "Photo is required.";
    if (formData.skills.length <= 0) newErrors.skills = "Skills are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, photo: file });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setAvailableSkills((prevData) => [...prevData, newSkill]);
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
    setNewSkill("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await Fetch.post("/team", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);

      toast("Teamate has been added", {
        action: {
          label: "Remove",
          onClick: () => console.log("Undo"),
        },
      });
      resetForm();
      setIsSheetOpen(false);
    } catch (error: any) {
      alert(error.message || "Something went wrong.");
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
        <Button variant="secondary">New Teammate</Button>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">
            Add a new teammate
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <span>Fill all fields to add a teammate</span>
        </SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="fullName">
              Full Name <span className="text-blue-600">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="biography">
              Biography <span className="text-blue-600">*</span>
            </Label>
            <Textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              className={errors.biography ? "border-red-500" : ""}
            />
            {errors.biography && (
              <span className="text-red-500 text-sm">{errors.biography}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">
              Role <span className="text-blue-600">*</span>
            </Label>
            <Select
              value={formData.role}
              name="role"
              onValueChange={handleRoleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && (
              <span className="text-red-500 text-sm">{errors.role}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">
              Photo <span className="text-blue-600">*</span>
            </Label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="photo"
                className="flex items-center justify-center w-full h-32 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400"
              >
                {formData.photo ? (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-sm text-gray-400">Upload Photo</span>
                )}
                <Input
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {formData.photo && (
                <Button
                  type="button"
                  onClick={() => setFormData({ ...formData, photo: null })}
                  variant="destructive"
                >
                  Remove
                </Button>
              )}
            </div>
            {errors.photo && (
              <span className="text-red-500 text-sm">{errors.photo}</span>
            )}
          </div>

          <div>
            <Label htmlFor="skills">
              Skills <span className="text-blue-600">*</span>
            </Label>
            <div className="flex my-3 gap-3">
              <Input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button variant={"secondary"} onClick={handleAddSkill}>
                add skill
              </Button>
            </div>
            <div className="flex gap-2 my-2 flex-wrap">
              {availableSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => {
                      const isSkillSelected = prev.skills.includes(skill);
                      return {
                        ...prev,
                        skills: isSkillSelected
                          ? prev.skills.filter((s) => s !== skill)
                          : [...prev.skills, skill],
                      };
                    });
                  }}
                  className={`px-3 py-1 rounded-full ${
                    formData.skills.includes(skill)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {errors.skills && (
              <span className="text-red-500 text-sm">{errors.skills}</span>
            )}
          </div>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add New Teammate"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
