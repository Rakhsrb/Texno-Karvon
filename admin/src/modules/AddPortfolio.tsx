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

export function AddPortfolio() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    link: string;
    category: string;
    photo: File | null;
    tags: string[];
  }>({
    title: "",
    description: "",
    link: "",
    category: "",
    photo: null,
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [availableTags] = useState([
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
      title: "",
      description: "",
      link: "",
      category: "",
      photo: null,
      tags: [],
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.link.trim()) newErrors.link = "Link is required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.photo) newErrors.photo = "Photo is required.";
    if (formData.tags.length <= 0) newErrors.tags = "Tags are required.";

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

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag("");
    }
  };

  const handleTagDelete = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((existingTag) => existingTag !== tag),
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await Fetch.post("/portfolios", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);

      toast("Portfolio has been added", {
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
        <Button variant="secondary">New Portfolio</Button>
      </SheetTrigger>
      <SheetContent className="h-screen overflow-y-auto w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">
            Add a new portfolio
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <span>Fill all fields to add a portfolio item</span>
        </SheetDescription>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="title">
              Title{" "}
              <span
                className={`${errors.title ? "text-red-600" : "text-blue-600"}`}
              >
                *
              </span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">
              Description{" "}
              <span
                className={`${
                  errors.description ? "text-red-600" : "text-blue-600"
                }`}
              >
                *
              </span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="link">
              Link{" "}
              <span
                className={`${errors.link ? "text-red-600" : "text-blue-600"}`}
              >
                *
              </span>
            </Label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className={errors.link ? "border-red-500" : ""}
            />
            {errors.link && (
              <span className="text-red-500 text-sm">{errors.link}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="category">
              Category
              <span
                className={`${
                  errors.category ? "text-red-600" : "text-blue-600"
                }`}
              >
                *
              </span>
            </Label>
            <Select
              value={formData.category}
              name="category"
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="mobile">Mobile application</SelectItem>
                  <SelectItem value="crm">CRM System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="photo"
              className="block text-sm font-medium text-white"
            >
              Photo
              <span
                className={`${errors.photo ? "text-red-600" : "text-blue-600"}`}
              >
                *
              </span>
            </Label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="photo"
                className="flex items-center justify-center w-full h-32 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, photo: null })}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
            {errors.photo && (
              <span className="text-red-500 text-sm">{errors.photo}</span>
            )}
          </div>

          <div>
            <Label htmlFor="tags">
              Tags{" "}
              <span
                className={`${errors.tags ? "text-red-600" : "text-blue-600"}`}
              >
                *
              </span>
            </Label>
            <div className="flex gap-2 flex-wrap">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-600 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagDelete(tag)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 my-2">
              <Input
                id="tags"
                value={newTag}
                onChange={handleTagChange}
                name="tags"
                placeholder="Add custom tag"
                className={`${errors.tags ? "border-red-500" : ""} flex-1`}
              />
              <Button type="button" onClick={handleAddTag} variant="secondary">
                Add Tag
              </Button>
            </div>
            {errors.tags && (
              <span className="text-red-500 text-sm">{errors.tags}</span>
            )}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTags.map((tag, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="default"
                    onClick={() => {
                      if (!formData.tags.includes(tag)) {
                        setFormData({
                          ...formData,
                          tags: [...formData.tags, tag],
                        });
                      }
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add new portfolio"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
