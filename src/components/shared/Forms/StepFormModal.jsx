"use client";
import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilePlus, ChevronRight, ChevronLeft } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

const StepFormModal = ({ isOpen, onClose, title, modelInputs = [], onSubmit, defaultValues = {} }) => {
  const [formData, setFormData] = useState({}); 
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState("step-0");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Evitar re-renders infinitos asegurando que el estado solo se setea cuando cambia `defaultValues` o se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData(defaultValues || {}); // Se establece solo cuando el modal se abre
    }
  }, [isOpen]);

  const groupedSteps = useMemo(() => {
    const chunkSize = 6;
    return modelInputs.reduce((acc, curr, index) => {
      const stepIndex = Math.floor(index / chunkSize);
      if (!acc[stepIndex]) acc[stepIndex] = { key: `step-${stepIndex}`, label: `Paso ${stepIndex + 1}`, fields: [] };
      acc[stepIndex].fields.push(curr);
      return acc;
    }, []);
  }, [modelInputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const field = modelInputs.find(f => f.key === name);
    let error = "";

    if (field?.required && !value) {
      error = "Este campo es obligatorio.";
    } else if (field?.minLength && value.length < field.minLength) {
      error = `Debe tener al menos ${field.minLength} caracteres.`;
    } else if (field?.maxLength && value.length > field.maxLength) {
      error = `No puede exceder los ${field.maxLength} caracteres.`;
    } else if (field?.pattern && !new RegExp(field.pattern).test(value)) {
      error = "Formato inválido.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleClose = () => {
    setFormData({});
    setErrors({});
    setActiveStep("step-0");
    onClose();
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const nextStep = () => {
    const currentIndex = groupedSteps.findIndex((s) => s.key === activeStep);
    if (currentIndex < groupedSteps.length - 1) {
      setActiveStep(groupedSteps[currentIndex + 1].key);
    }
  };

  const prevStep = () => {
    const currentIndex = groupedSteps.findIndex((s) => s.key === activeStep);
    if (currentIndex > 0) {
      setActiveStep(groupedSteps[currentIndex - 1].key);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeStep} value={activeStep} onValueChange={setActiveStep}>
          <TabsList className="flex overflow-x-auto border-b pb-2 scrollbar-hide">
            {groupedSteps.map((step) => (
              <TabsTrigger key={step.key} value={step.key} className="px-4 py-2 text-gray-700 font-medium">
                {step.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {groupedSteps.map((step) => (
            <TabsContent key={step.key} value={step.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {step.fields.map((field) => (
                <div key={field.key} className="flex flex-col">
                  <Label>
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>

                  {field.type === "text" && (
                    <Input name={field.key} value={formData[field.key] || ""} onChange={handleInputChange} />
                  )}

                  {field.type === "password" && (
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} name={field.key} value={formData[field.key] || ""} onChange={handleInputChange} />
                      <button type="button" className="absolute right-3 top-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  )}

                  {field.type === "email" && (
                    <Input type="email" name={field.key} value={formData[field.key] || ""} onChange={handleInputChange} />
                  )}

                  {field.type === "number" && (
                    <Input type="number" name={field.key} value={formData[field.key] || ""} onChange={handleInputChange} />
                  )}

                  {field.type === "date" && (
                    <Input type="date" name={field.key} value={formData[field.key] || ""} onChange={handleInputChange} />
                  )}

                  {field.type === "select" && field.options && (
                    <Select value={formData[field.key] || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, [field.key]: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option, index) => (
                          <SelectItem key={`${option.value}-${index}`} value={option.value || `option-${index}`}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {field.type === "file" && <Input type="file" name={field.key} onChange={handleFileChange} />}

                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" name={field.key} checked={formData[field.key] || false} onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.checked }))} />
                      <Label htmlFor={field.key}> {field.label} </Label>
                    </div>
                  )}

                  {errors[field.key] && <span className="text-red-500 text-sm">{errors[field.key]}</span>}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={prevStep} disabled={groupedSteps.findIndex((s) => s.key === activeStep) === 0}>
            <ChevronLeft size={18} /> Anterior
          </Button>
          <Button onClick={() => onSubmit(formData)}>
            <FilePlus size={18} className="mr-2" /> Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StepFormModal;
