# Invoice Management App - Stage 2 Frontend

A fully functional, responsive invoice management application built with React and Tailwind CSS. Create, read, update, and delete invoices with real-time filtering, dark mode support, and persistent state management.

## 🎯 Overview

This is a professional-grade invoice management system that allows users to manage their invoices efficiently. Features include full CRUD operations, form validation, invoice status tracking, and a beautiful dark/light theme toggle.

**Live Demo:** [https://invoice-management-app-nu.vercel.app/]  
**GitHub Repository:** [https://github.com/alaminjibril/invoice_management_app]

---

## ✨ Features

### Core Functionality
- ✅ **Create Invoices** — Fill out a form with client details, invoice items, and dates
- ✅ **View Invoices** — Browse all invoices in a responsive grid/list layout
- ✅ **Edit Invoices** — Update existing invoices and persist changes
- ✅ **Delete Invoices** — Remove invoices with confirmation modal
- ✅ **Invoice Details** — Click any invoice to view full details

### Status Management
- ✅ **Draft Status** — Save invoices as drafts for later editing
- ✅ **Pending Status** — Mark invoices as sent to client
- ✅ **Paid Status** — Mark invoices as paid
- ✅ **Status Flow Logic** — Enforce proper status transitions (Draft → Pending → Paid)

### Filtering & Search
- ✅ **Filter by Status** — View all, drafts only, pending only, or paid only
- ✅ **Status Counts** — See invoice count for each status
- ✅ **Empty States** — User-friendly messages when no invoices match filter

### Form Validation
- ✅ **Required Field Validation** — Client name and email are required
- ✅ **Email Format Validation** — Ensures valid email addresses
- ✅ **Date Validation** — Due date cannot be before issue date
- ✅ **Invoice Items Validation** — At least one item required, quantity > 0, price ≥ 0
- ✅ **Error Messages** — Clear, helpful error feedback with visual indicators

### Theme Management
- ✅ **Light Mode** — Clean, professional light theme
- ✅ **Dark Mode** — Easy on the eyes, perfect for low-light environments
- ✅ **Theme Toggle** — One-click toggle in header
- ✅ **Persistent Theme** — Theme preference saved to localStorage
- ✅ **WCAG AA Compliant** — Good color contrast in both modes

### Responsive Design
- ✅ **Mobile (320px+)** — Full-width, optimized layout
- ✅ **Tablet (768px+)** — 2-column grid, comfortable spacing
- ✅ **Desktop (1024px+)** — 3-column grid, maximum width 1200px
- ✅ **Responsive Forms** — Single column on mobile, 2 columns on desktop
- ✅ **No Overflow** — Perfect scaling at all screen sizes

### Interactive Elements
- ✅ **Hover Effects** — All interactive elements have visible hover states
- ✅ **Focus Indicators** — Keyboard navigation with clear focus rings
- ✅ **Smooth Transitions** — Polished animations and transitions
- ✅ **Click Feedback** — Buttons provide visual feedback on interaction
- ✅ **Loading States** — Appropriate loading indicators where needed

### Data Persistence
- ✅ **localStorage Integration** — All data persists between sessions
- ✅ **Theme Persistence** — Theme preference survives page reload
- ✅ **Auto-Save** — Changes save automatically
- ✅ **Data Recovery** — Recovered from localStorage on app load

### Accessibility
- ✅ **Semantic HTML** — Proper use of article, section, form, button elements
- ✅ **ARIA Labels** — All interactive elements have accessible names
- ✅ **Keyboard Navigation** — Full keyboard support (Tab, Enter, Escape)
- ✅ **Focus Management** — Focus trapped in modals, returned after close
- ✅ **Screen Reader Support** — Compatible with assistive technologies
- ✅ **Color Contrast** — WCAG AA compliant (4.5:1 ratio)
- ✅ **Form Labels** — All inputs have associated labels

---

## 🛠️ Tech Stack

### Core
- **React 18+** — Modern UI framework
- **Vite** — Lightning-fast build tool
- **JavaScript** — No TypeScript complexity, faster development

### Styling
- **Tailwind CSS** — Utility-first CSS framework
- **Dark Mode** — Built-in Tailwind dark mode support
- **Responsive Design** — Mobile-first approach with responsive utilities

### State Management
- **React Hooks** — useState, useEffect, useContext
- **Custom Hooks** — useInvoices, useTheme, useLocalStorage, useFormValidation
- **localStorage API** — Persistent data storage

### Utilities
- **uuid** — Unique ID generation for invoices
- **Date API** — Native JavaScript date handling
- **localStorage** — Client-side data persistence

### Development
- **Vite** — Fast dev server and build
- **ES Modules** — Modern JavaScript modules
- **npm** — Package management

---

## 📋 Data Structure

### Invoice Object
```javascript
{
  id: "unique-id",                    // Unique identifier
  invoiceNumber: "INV-0001",          // Human-readable invoice number
  clientName: "Acme Corp",            // Required
  clientEmail: "contact@acme.com",    // Required, valid email
  issueDate: "2024-04-23",            // ISO date format
  dueDate: "2024-05-23",              // ISO date format
  status: "Pending",                  // "Draft" | "Pending" | "Paid"
  items: [
    {
      id: "item-1",
      name: "Design Services",
      quantity: 10,
      price: 150.00,
      total: 1500.00                  // Auto-calculated
    }
  ],
  subtotal: 1500.00,                  // Sum of items
  tax: 150.00,                        // Tax amount
  discount: 50.00,                    // Discount amount
  total: 1600.00,                     // subtotal + tax - discount
  description: "Optional notes",      // Optional field
  createdAt: "2024-04-23T10:30:00Z", // ISO timestamp
  updatedAt: "2024-04-23T10:30:00Z"  // ISO timestamp
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/invoice-app.git
cd invoice-app
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

#### 4. Build for Production
```bash
npm run build
```

Output files will be in the `dist/` directory.

### Usage

#### Creating an Invoice
1. Click **"+ Create Invoice"** button
2. Fill in client information (name, email)
3. Set issue and due dates
4. Add invoice items (name, quantity, price)
5. Click **"Create Invoice"** to save

#### Viewing & Editing
1. Click any invoice to view details
2. Click **"Edit"** button to modify
3. Make changes and click **"Update Invoice"**
4. Click **"Back"** to return to list

#### Changing Status
1. Open invoice details
2. Use status dropdown to change status
3. Status updates immediately
4. Paid invoices cannot be changed

#### Deleting
1. Open invoice details
2. Click **"Delete"** button
3. Confirm in modal
4. Invoice removed from list

#### Filtering
1. Use filter buttons: **All**, **Draft**, **Pending**, **Paid**
2. List updates to show only matching invoices
3. Invoice counts shown on each button

#### Theme Toggle
1. Click theme icon (☀️/🌙) in header
2. Colors change immediately
3. Preference saved to localStorage
4. Theme persists on page reload

---

## 📁 Project Structure

```
invoice-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # App header with theme toggle
│   │   ├── InvoiceList.jsx            # Invoice grid/list view
│   │   ├── InvoiceForm.jsx            # Create/edit form
│   │   ├── InvoiceDetail.jsx          # Detail view
│   │   ├── StatusBadge.jsx            # Status indicator
│   │   ├── FilterControl.jsx          # Status filter buttons
│   │   ├── ConfirmationModal.jsx      # Delete confirmation
│   │   ├── EmptyState.jsx             # No invoices message
│   │   └── ThemeProvider.jsx          # Theme context provider
│   ├── hooks/
│   │   ├── useInvoices.js             # Invoice CRUD logic
│   │   ├── useTheme.js                # Theme management
│   │   ├── useLocalStorage.js         # localStorage persistence
│   │   └── useFormValidation.js       # Form validation
│   ├── utils/
│   │   ├── formatters.js              # Date/currency formatting
│   │   ├── validators.js              # Validation functions
│   │   ├── generateId.js              # ID generation
│   │   └── colors.js                  # Theme color definitions
│   ├── App.jsx                        # Main app component
│   ├── index.css                      # Tailwind directives
│   ├── App.css                        # App-specific styles
│   └── main.jsx                       # Entry point
├── index.html                         # HTML template
├── tailwind.config.js                 # Tailwind configuration
├── postcss.config.js                  # PostCSS configuration
├── vite.config.js                     # Vite configuration
├── package.json                       # Dependencies
├── .gitignore                         # Git ignore rules
└── README.md                          # This file
```

---

## 🎨 Design System

### Color Palette

#### Light Mode
```
Background (primary):      #FFFFFF
Background (secondary):    #F5F6F8
Text (primary):           #1F2937
Text (secondary):         #6B7280
Border:                   #E5E7EB
Accent (blue):            #2563EB
Success (green):          #10B981
Warning (amber):          #F59E0B
Error (red):              #EF4444
Draft (gray):             #9CA3AF
```

#### Dark Mode
```
Background (primary):      #1A1A2E
Background (secondary):    #16213E
Text (primary):           #FFFFFF
Text (secondary):         #B8B8B8
Border:                   #374151
Accent (blue):            #6B9FFF
Success (green):          #34D399
Warning (amber):          #FBBF24
Error (red):              #F87171
Draft (gray):             #9CA3AF
```

### Typography
```
Font Family: System fonts (-apple-system, 'Segoe UI', Roboto, sans-serif)

H1: 32px, weight 700, line-height 1.2
H2: 24px, weight 600, line-height 1.3
H3: 20px, weight 600, line-height 1.4

Body: 16px, weight 400, line-height 1.6
Small: 14px, weight 400, line-height 1.5
Detail: 12px, weight 400, line-height 1.5
```

### Spacing
```
8px, 16px, 24px, 32px, 48px, 64px
(Multiples of 8 for consistency)
```

---

## ✅ Validation Rules

### Client Information
- **Client Name**: Required, minimum 1 character
- **Email**: Required, valid email format (xxx@xxx.xxx)

### Invoice Items
- **Minimum Items**: At least 1 item required
- **Item Name**: Required per item
- **Quantity**: Must be > 0
- **Price**: Must be ≥ 0

### Dates
- **Due Date**: Cannot be before issue date
- **Both Required**: Issue and due dates must be provided

### Error Handling
- **Visual Feedback**: Red border on invalid fields
- **Error Messages**: Clear messages below each invalid field
- **Submission Blocking**: Form cannot submit with errors

---

## 🧪 Testing Checklist

### Functionality
- [ ] Create new invoice with valid data
- [ ] Created invoice appears in list
- [ ] Click invoice to view details
- [ ] Edit invoice and changes persist
- [ ] Delete invoice with confirmation
- [ ] Draft → Pending → Paid status flow works
- [ ] Pending → Draft revert works
- [ ] Paid status cannot be changed

### Validation
- [ ] Missing client name shows error
- [ ] Invalid email shows error
- [ ] Missing items shows error
- [ ] Item with quantity 0 shows error
- [ ] Item with negative price shows error
- [ ] Due date before issue date shows error
- [ ] Error messages clear when corrected

### Filtering
- [ ] All filter shows all invoices
- [ ] Draft filter shows only drafts
- [ ] Pending filter shows only pending
- [ ] Paid filter shows only paid
- [ ] Status counts accurate
- [ ] Empty state shows when no matches

### Theme
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] Toggle switches theme instantly
- [ ] Theme persists after page reload
- [ ] Color contrast WCAG AA compliant
- [ ] All components adapt to theme

### Responsive
- [ ] Mobile (320px): Full width, readable
- [ ] Tablet (768px): 2-column layout
- [ ] Desktop (1024px+): 3-column layout
- [ ] Forms usable on all sizes
- [ ] No horizontal overflow
- [ ] Images scale appropriately

### Accessibility
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus visible on all interactive elements
- [ ] Form labels associated with inputs
- [ ] Modal closes with ESC key
- [ ] Focus trapped in modal
- [ ] Screen reader friendly
- [ ] No console errors

### Performance
- [ ] App loads quickly
- [ ] Theme toggle is instant
- [ ] Filter change is instant
- [ ] localStorage saves without lag
- [ ] No unnecessary re-renders

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### 1. Push to GitHub
```bash
git add .
git commit -m "Stage 2: Invoice Management App"
git push origin main
```

#### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Follow the prompts to connect your GitHub repo.

#### 3. Get Live URL
Your app will be available at `https://your-project.vercel.app`

### Deploy to Netlify

#### 1. Build the app
```bash
npm run build
```

#### 2. Deploy
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### 3. Get Live URL
Your app will be available at Netlify's URL

### Deploy to GitHub Pages

```bash
npm run build
# Follow GitHub Pages instructions for your repo
```

---

## 🏗️ Architecture & Design Decisions

### Component Structure
- **Separation of Concerns** — Each component has single responsibility
- **Reusable Components** — StatusBadge, FilterControl, etc.
- **Container vs Presentational** — App.jsx manages state, components are presentational

### State Management
- **Custom Hooks** — useInvoices, useTheme, useLocalStorage
- **Context API** — ThemeProvider for theme state
- **localStorage** — Persistent state between sessions
- **No Redux** — Simpler approach for this scope

### Styling Approach
- **Tailwind CSS** — Utility-first, no CSS files
- **Dark Mode** — Built-in Tailwind support
- **Responsive** — Mobile-first design
- **Custom Components** — Tailwind @layer for DRY code

### Data Persistence
- **localStorage** — Simple, browser-native solution
- **Auto-Save** — Changes saved automatically
- **JSON Serialization** — Data converted to JSON strings
- **No Backend** — All data stored locally

### Form Validation
- **Real-time** — Validation on blur and submit
- **Clear Feedback** — Error messages and visual states
- **Preventive** — Submit button disabled if errors exist
- **Reusable** — useFormValidation hook

---

## 🎓 Learning & Improvements

### What Was Built
- ✅ Full CRUD invoice management
- ✅ Complex form validation
- ✅ State management with hooks
- ✅ Theme persistence
- ✅ Responsive design
- ✅ Accessible UI
- ✅ Professional styling

### Key Technologies Learned
- React hooks (useState, useEffect, useContext)
- Custom hooks development
- Tailwind CSS utility-first approach
- localStorage API
- Form validation patterns
- Responsive design techniques
- Accessibility best practices

### Potential Improvements (Beyond Requirements)

#### Features
- 📧 Email invoice to client
- 💾 Export invoice as PDF
- 🔍 Search by client name
- 📊 Invoice statistics dashboard
- 🔔 Payment reminders
- 📱 Mobile app version
- 💳 Payment integration (Stripe)

#### Technical
- 🔐 User authentication
- ☁️ Backend API (Node/Express)
- 📦 Database (MongoDB, PostgreSQL)
- 🧪 Unit tests (Jest, React Testing Library)
- 🔄 CI/CD pipeline
- 📈 Analytics
- 🌐 Multi-language support

---

## 🤝 Contributing

This is a personal project for the Frontend Wizards Stage 2 assessment. For improvements or suggestions, feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

This project is open source and available under the MIT License. Feel free to use it as a reference or starting point for your own projects.

---

## 📞 Support & Contact

### Troubleshooting

**App won't start?**
- Clear `node_modules/` and reinstall: `npm install`
- Delete cache: `npm cache clean --force`
- Restart dev server: `npm run dev`

**Data not persisting?**
- Check browser localStorage (DevTools → Application → localStorage)
- Clear browser cache and try again
- Ensure localStorage not disabled in browser

**Styling looks broken?**
- Reload page (Ctrl+F5 / Cmd+Shift+R)
- Clear CSS cache
- Check browser console for errors

**Theme not toggling?**
- Check localStorage for 'theme' key
- Clear localStorage and refresh
- Check if dark mode CSS is loaded

### Contact
- **GitHub:** [Your GitHub Profile]
- **Email:** [Your Email]
- **LinkedIn:** [Your LinkedIn]

---

## 🙏 Acknowledgments

- **Figma Design** — Provided design reference
- **Frontend Wizards** — Assessment framework
- **React Team** — Excellent documentation
- **Tailwind Labs** — Amazing CSS framework
- **Web.dev** — Accessibility resources

---

## 📝 Submission Details

- **Assessment:** Frontend Wizards - Stage 2
- **Deadline:** April 23, 2026, 12:00 AM UTC
- **Pass Mark:** 70/100
- **Total Points:** 100
- **Submitted:** [Submission Date]
- **GitHub Repo:** [Your Repo URL]
- **Live Demo:** [Your Live URL]

---

## 🎉 Project Summary

This Invoice Management Application demonstrates:
- ✅ Full CRUD operations in React
- ✅ Complex form validation
- ✅ State persistence with localStorage
- ✅ Theme management (light/dark mode)
- ✅ Responsive design (mobile to desktop)
- ✅ Accessibility compliance (WCAG AA)
- ✅ Clean component architecture
- ✅ Professional UI/UX

**Total Development Time:** ~40-50 hours  
**Lines of Code:** ~2000+  
**Components:** 8+  
**Custom Hooks:** 4  
**Features:** 20+

---

**Built with ❤️ using React, Tailwind CSS, and JavaScript**

Happy invoicing! 📄✨