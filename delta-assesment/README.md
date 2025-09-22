# Delta Assesment Angular Dynamic Form Builder

This project is a **Dynamic Form Builder** built with Angular.  
It demonstrates role-based access, dynamic form creation, drag-and-drop reordering, and form submission with a mock API.

---

##  Application Flow (End-to-End)

### 1. Login & Role Selection
- On load, user chooses a **role** (`Admin` or `User`) from a dropdown.
- Role is stored in **localStorage** and enforced with `AuthGuard`.
  - **Admin** → access to Form Builder (create, edit, manage forms).  
  - **User** → access only to Form Viewer (view and fill forms).

### 2. Dashboard
- Shows all available forms.
- Admins see **"Create Form"** button in addition to the list.
- Users only see the form list.

### 3. Create Form (Admin)
- Admin clicks **Create Form** → taken to builder.
- Builder has:
  - **Form Name input**
  - Toolbar with field types: `Text`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Date`.
- Clicking a button adds a new field.
  - Example: click **Text** twice → two text fields added.
- Each field can be reordered with **drag & drop**.

### 4. Field Configuration
- Every field supports:
  - Label  
  - Required toggle  
  - Help text  
  - Validation rules (min/max length, regex)  
  - Options (for select, checkbox, radio)

### 5. Drag-and-Drop
- Admin can reorder fields via Angular CDK drag-drop.
- Under the hood, `FormArray` is updated using `moveItemInArray` to maintain order.

### 6. Preview
- Admin clicks **Preview** to see how end users will interact with the form.
- Preview is read-only (no editing allowed).

### 7. Save Form
- Admin clicks **Save**.
- Form definition (name, fields, validations, order) is stored via a **mock API service**.
- The form now appears in the **dashboard list**.

### 8. User View & Submit
- A User logs in with role = `User`.
- User sees the list of available forms.
- User opens a form, fills it, and submits.
- Submission is sent to the mock API.

---

##  Technical Approach

1. **Reactive Forms**
   - Used `FormGroup` + `FormArray` to dynamically build forms.
   - Each form field is a nested `FormGroup`.

2. **Role-Based Access**
   - `AuthService` manages role in `localStorage`.
   - `AuthGuard` restricts routes based on role.

3. **Drag & Drop**
   - Implemented with Angular CDK (`CdkDropList`, `CdkDrag`).
   - Keeps form field order synced with `FormArray`.

4. **Mock API**
   - Simulates backend storage of forms and submissions.
   - Provides `getForms()`, `saveForm()`, and `submitForm()`.

5. **NgRx Store (if included)**
   - Centralized state for forms and authentication.

6. **Testing**
   - Unit tests for:
     - `FormBuilderComponent`
     - `formfillcomponent`

---

##  Why This Approach?

- **Reactive Forms** → Flexible, scalable for dynamic form creation.  
- **FormArray with nested FormGroups** → Perfect for handling multiple dynamic fields.  
- **Angular CDK drag-drop** → Native, no external dependency, easy to maintain.  
- **Role-based Auth with Guards** → Clean separation of Admin and User features.  
- **Mock API service** → Keeps solution self-contained, no backend setup needed.  
- **Preview mode** → Improves UX, ensures correctness before saving.  
- **NgRx (optional)** → State consistency across components.  

This approach ensures:
- Separation of concerns (Auth, Builder, Viewer).
- Maintainability for future enhancements (new field types, real API).
- Clear Admin vs User workflows.

---

##  How to Run

  -ng serve
