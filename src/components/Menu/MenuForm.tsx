// src/components/Menu/MenuForm.tsx
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Plus, Trash2, ImageUp } from "lucide-react";
import {
  mockCategories,
  mockIngredients,
  mockExtraIngredients,
} from "@/data/mockMenu";
import type { MenuItem, ExtraIngredient, MenuSize } from "@/types/menu";

interface MenuFormProps {
  initialData: Partial<MenuItem>;
  onSubmit: (data: Partial<MenuItem>) => void;
  isSubmitting: boolean;
  submitButtonText: string;
}

export default function MenuForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
}: MenuFormProps) {
  const [formData, setFormData] = useState<Partial<MenuItem>>(initialData);
  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const [airViewPreview, setAirViewPreview] = useState(
    initialData.airViewImage || ""
  );
  const [isHovering, setIsHovering] = useState(false);
  const [autoRotation, setAutoRotation] = useState({ x: 0, y: 0 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const imageInputRef = useRef<HTMLInputElement>(null);
  const airViewInputRef = useRef<HTMLInputElement>(null);
  const airViewContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const subCategories =
    mockCategories.find((cat) => cat.name === formData.category)
      ?.subCategories || [];

  // Automatic 3D rotation effect
  useEffect(() => {
    if (!airViewPreview || isHovering) return;

    let angle = 0;
    const animate = () => {
      angle += 0.5; // Rotation speed
      const rotateY = Math.sin(angle * 0.02) * 15; // Oscillate between -15 and 15 degrees
      const rotateX = Math.cos(angle * 0.015) * 10; // Oscillate between -10 and 10 degrees

      setAutoRotation({ x: rotateX, y: rotateY });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [airViewPreview, isHovering]);

  // Apply rotation to image
  useEffect(() => {
    if (!airViewContainerRef.current || isHovering) return;

    const img = airViewContainerRef.current.querySelector(
      ".air-view-image"
    ) as HTMLElement;

    if (img) {
      img.style.transform = `perspective(1000px) rotateX(${autoRotation.x}deg) rotateY(${autoRotation.y}deg) scale3d(1, 1, 1)`;
    }
  }, [autoRotation, isHovering]);

  const handleInputChange = (
    field: keyof MenuItem,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "airView"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "image") {
          setImagePreview(result);
          handleInputChange("image", result);
        } else {
          setAirViewPreview(result);
          handleInputChange("airViewImage", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handle3DMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!airViewContainerRef.current) return;

    const container = airViewContainerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -20; // Increased range for more dramatic effect
    const rotateY = ((x - centerX) / centerX) * 20;

    const img = container.querySelector(".air-view-image") as HTMLElement;
    if (img) {
      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
  };

  const handle3DMouseEnter = () => {
    setIsHovering(true);
  };

  const handle3DMouseLeave = () => {
    setIsHovering(false);

    if (!airViewContainerRef.current) return;

    const img = airViewContainerRef.current.querySelector(
      ".air-view-image"
    ) as HTMLElement;

    if (img) {
      // Resume automatic rotation smoothly
      img.style.transition = "transform 0.5s ease-out";
      setTimeout(() => {
        if (img) {
          img.style.transition = "transform 0.1s ease-out";
        }
      }, 500);
    }
  };

  const handleAddIngredient = (ingredientId: string) => {
    const ingredient = mockIngredients.find((ing) => ing.id === ingredientId);
    if (
      ingredient &&
      !formData.ingredients?.some((i) => i.id === ingredientId)
    ) {
      const newIngredients = [
        ...(formData.ingredients || []),
        { ...ingredient },
      ];
      setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
    }
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    const newIngredients = formData.ingredients?.filter(
      (ing) => ing.id !== ingredientId
    );
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleIngredientConsumptionChange = (
    ingredientId: string,
    consumptionQty: number
  ) => {
    const newIngredients = formData.ingredients?.map((ing) =>
      ing.id === ingredientId ? { ...ing, consumptionQty } : ing
    );
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleAddExtraIngredient = () => {
    const newExtra: ExtraIngredient = {
      id: `extra-${Date.now()}`,
      name: "",
      price: 0,
    };
    setFormData((prev) => ({
      ...prev,
      extraIngredients: [...(prev.extraIngredients || []), newExtra],
    }));
  };

  const handleRemoveExtraIngredient = (index: number) => {
    const newExtras = formData.extraIngredients?.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, extraIngredients: newExtras }));
  };

  const handleExtraIngredientChange = (
    index: number,
    field: keyof ExtraIngredient,
    value: string | number
  ) => {
    const newExtras = formData.extraIngredients?.map((extra, i) =>
      i === index ? { ...extra, [field]: value } : extra
    );
    setFormData((prev) => ({ ...prev, extraIngredients: newExtras }));
  };

  const handleAddSize = () => {
    const newSize: MenuSize = {
      id: `size-${Date.now()}`,
      size: "",
      regularPrice: 0,
      offerPrice: 0,
    };
    setFormData((prev) => ({
      ...prev,
      sizes: [...(prev.sizes || []), newSize],
    }));
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = formData.sizes?.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const handleSizeChange = (
    index: number,
    field: keyof MenuSize,
    value: string | number
  ) => {
    const newSizes = formData.sizes?.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Item name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.subCategory) {
      newErrors.subCategory = "Sub category is required";
    }

    if (!formData.sizes || formData.sizes.length === 0) {
      newErrors.sizes = "At least one size is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Upload Image */}
      <div className="space-y-2">
        <Label className="font-semibold">Upload Image</Label>
        <div className="flex flex-col items-center gap-3">
          {imagePreview ? (
            <div className="w-52 h-52 rounded-full overflow-hidden bg-linear-to-br from-orange-50 to-orange-100 border-4 border-white shadow-xl">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-52 h-52 rounded-full bg-linear-to-br from-orange-50 to-orange-100 border-4 border-white shadow-xl flex items-center justify-center">
              <ImageUp className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "image")}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => imageInputRef.current?.click()}
            className="gap-3 w-52 h-12 rounded-md font-semibold"
          >
            <ImageUp className="w-4 h-4" />
            Replace image
          </Button>
        </div>
      </div>

      {/* Upload 3D Air View with Interactive 3D Effect */}
      <div className="space-y-2">
        <Label className="font-semibold">Upload 3D Air View</Label>
        <div className="flex flex-col items-center gap-3">
          <div
            ref={airViewContainerRef}
            onMouseMove={handle3DMouseMove}
            onMouseEnter={handle3DMouseEnter}
            onMouseLeave={handle3DMouseLeave}
            className="w-52 h-52 rounded-full cursor-pointer"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {airViewPreview ? (
              <div className="w-full h-full rounded-full overflow-hidden bg-linear-to-br from-blue-50 to-purple-100 border-4 border-white shadow-xl">
                <img
                  src={airViewPreview}
                  alt="Air View Preview"
                  className="air-view-image w-full h-full object-cover transition-transform duration-100 ease-out"
                  style={{
                    transform:
                      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-linear-to-br from-blue-50 to-purple-100 border-4 border-white shadow-xl flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <input
            ref={airViewInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "airView")}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => airViewInputRef.current?.click()}
            className="gap-3 w-52 h-12 rounded-md font-semibold"
          >
            <ImageUp className="w-4 h-4" />
            Replace 3D Air View
          </Button>
        </div>
      </div>

      {/* Food Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Food Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="name">
              Item Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Chowmein"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="cookingTime">Cooking Time</Label>
            <Input
              id="cookingTime"
              value={formData.cookingTime || ""}
              onChange={(e) => handleInputChange("cookingTime", e.target.value)}
              placeholder="20 min"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category || ""}
              onValueChange={(value) => {
                handleInputChange("category", value);
                handleInputChange("subCategory", "");
              }}
            >
              <SelectTrigger
                id="category"
                className={`h-12! w-full bg-card ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Main Course" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="subCategory">
              Sub Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.subCategory || ""}
              onValueChange={(value) => handleInputChange("subCategory", value)}
              disabled={!formData.category}
            >
              <SelectTrigger
                id="subCategory"
                className={`h-12! w-full bg-card ${
                  errors.subCategory ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Chowmein" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.name}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subCategory && (
              <p className="text-sm text-red-500">{errors.subCategory}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="ABC"
            rows={3}
            className="bg-card"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Ingredients</h3>

        <div className="space-y-3">
          <Label>Using Ingredients</Label>
          <Select onValueChange={handleAddIngredient}>
            <SelectTrigger className="h-12! w-full bg-card">
              <SelectValue placeholder="Select an ingredient to include" />
            </SelectTrigger>
            <SelectContent>
              {mockIngredients
                .filter(
                  (ing) => !formData.ingredients?.some((i) => i.id === ing.id)
                )
                .map((ing) => (
                  <SelectItem key={ing.id} value={ing.id}>
                    {ing.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {formData.ingredients && formData.ingredients.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-left px-3 py-5">Name</th>
                  <th className="text-center px-3 py-5">Available QTY</th>
                  <th className="text-center px-3 py-5">Consumption QTY</th>
                  <th className="text-center px-3 py-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.ingredients.map((ing) => (
                  <tr key={ing.id} className="border-t border-border bg-card">
                    <td className="p-3">{ing.name}</td>
                    <td className="text-center p-3">{ing.availableQty}</td>
                    <td className="text-center p-3">
                      <Input
                        type="number"
                        value={ing.consumptionQty}
                        onChange={(e) =>
                          handleIngredientConsumptionChange(
                            ing.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 mx-auto text-center"
                        min="0"
                      />
                    </td>
                    <td className="text-center p-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveIngredient(ing.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Extra Ingredients */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Extra Ingredients</h3>
          <Button
            type="button"
            onClick={handleAddExtraIngredient}
            className="gap-2 bg-primary hover:bg-primary/80"
          >
            <Plus className="w-4 h-4" />
            Add Extra Ingredient
          </Button>
        </div>

        {formData.extraIngredients?.map((extra, index) => (
          <div key={extra.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={extra.name}
              onValueChange={(value) =>
                handleExtraIngredientChange(index, "name", value)
              }
            >
              <SelectTrigger className="h-12! w-full bg-card">
                <SelectValue placeholder="Select extra ingredient" />
              </SelectTrigger>
              <SelectContent>
                {mockExtraIngredients.map((ing) => (
                  <SelectItem key={ing.id} value={ing.name}>
                    {ing.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                type="number"
                value={extra.price}
                onChange={(e) =>
                  handleExtraIngredientChange(
                    index,
                    "price",
                    parseFloat(e.target.value) || 0
                  )
                }
                placeholder="$1"
                step="0.01"
                min="0"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExtraIngredient(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Size & Price */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Size & Price <span className="text-red-500">*</span>
          </h3>
          <Button
            type="button"
            onClick={handleAddSize}
            className="gap-2 bg-primary hover:bg-primary/80"
          >
            <Plus className="w-4 h-4" />
            Add more
          </Button>
        </div>

        {errors.sizes && <p className="text-sm text-red-500">{errors.sizes}</p>}

        {formData.sizes?.map((size, index) => (
          <div key={size.id} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Size</Label>
                <Input
                  value={size.size}
                  onChange={(e) =>
                    handleSizeChange(index, "size", e.target.value)
                  }
                  placeholder="Regular"
                />
              </div>

              <div className="space-y-2">
                <Label>Regular Price</Label>
                <Input
                  type="number"
                  value={size.regularPrice}
                  onChange={(e) =>
                    handleSizeChange(
                      index,
                      "regularPrice",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="$10.99"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label>Offer Price</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={size.offerPrice}
                    onChange={(e) =>
                      handleSizeChange(
                        index,
                        "offerPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="$9.99"
                    step="0.01"
                    min="0"
                  />
                  {formData.sizes && formData.sizes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSize(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/80 h-12 text-lg"
      >
        {isSubmitting ? "Saving..." : submitButtonText}
      </Button>
    </form>
  );
}
