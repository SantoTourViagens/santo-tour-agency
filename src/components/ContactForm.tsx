
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: ""
};

const ContactForm = () => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formValues.name.trim()) {
      newErrors.name = "O nome é obrigatório";
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = "O email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Por favor, insira um email válido";
    }
    
    if (!formValues.phone.trim()) {
      newErrors.phone = "O telefone é obrigatório";
    } else if (!/^[0-9\s\-+()]*$/.test(formValues.phone)) {
      newErrors.phone = "Por favor, insira um telefone válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      // Reset form
      setFormValues(INITIAL_VALUES);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 animate-fade-in">
      <div className="relative overflow-hidden bg-white bg-opacity-95 rounded-2xl p-8 shadow-xl backdrop-blur-glass">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-10 rounded-full animate-float" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-300 opacity-10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Entre em contato</h2>
            <p className="text-muted-foreground text-sm">Preencha o formulário abaixo e entraremos em contato em breve.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-1">
            <FormInput
              label="Nome"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              error={errors.name}
              required
              className="animate-slide-up"
              style={{ animationDelay: '100ms' }}
            />
            
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              error={errors.email}
              required
              className="animate-slide-up"
              style={{ animationDelay: '200ms' }}
            />
            
            <FormInput
              label="Telefone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              className="animate-slide-up"
              style={{ animationDelay: '300ms' }}
            />
            
            <div className="pt-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <Button
                type="submit"
                className={cn(
                  "w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-4 rounded-lg transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                  "transform hover:-translate-y-0.5 active:translate-y-0",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
