export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio' | 'date';
  label: string;
  required: boolean;
  helpText?: string;
  options?: string[];
  validations?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface FormTemplate {
  id: string;
  name: string;
  fields: FormField[];
}

export interface FormSubmission {
  id: string;          
  formId: string;
  data: any;
  submittedAt: Date;
}
