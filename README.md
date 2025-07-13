<div align="center">

# 🔐 Firebase Authentication Action Handler

### **Beautiful, Branded Authentication Experience for Firebase Apps**

[![Netlify Status](https://api.netlify.com/api/v1/badges/db123a98-81bd-4201-b9b8-337a1b20e0d0/deploy-status)](https://app.netlify.com/projects/authturri/deploys)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

**🌐 Live Example (working for https://turri.in.net):** [auth.turri.in.net](https://auth.turri.in.net)  
**⭐ Star this repo if it helped you!**

</div>

---

## 🎯 **What is This?**

A **custom authentication action handler** that provides a branded, professional experience for Firebase authentication actions. Instead of users seeing Firebase's generic pages, they get a beautiful, consistent experience on your domain.

<div align="center">

### **✨ Before vs After**

| 🚫 **Firebase Default** | ✅ **Your Branded Experience** |
|:---:|:---:|
| Generic Firebase domain | Your custom domain |
| Basic styling | Beautiful dark/light mode |
| No branding | Consistent with your app |
| Poor mobile experience | Fully responsive |

</div>

---

## 🚀 **Features**

<table>
<tr>
<td width="50%">

### 🎨 **Design & UX**
- ✅ **Dark/Light Mode** - Auto-detects system preference
- ✅ **Fully Responsive** - Perfect on all devices
- ✅ **Smooth Animations** - Polished micro-interactions
- ✅ **Clean Typography** - Professional, readable fonts
- ✅ **Consistent Branding** - Matches your app's identity

</td>
<td width="50%">

### 🔐 **Authentication Actions**
- ✅ **Password Reset** - Secure password updates
- ✅ **Email Verification** - Confirm new accounts
- ✅ **Email Change** - Verify new email addresses
- ✅ **Email Recovery** - Restore compromised accounts
- ✅ **Error Handling** - Clear, helpful error messages

</td>
</tr>
</table>

---

## 🛠️ **How It Works**

<div align="center">

```mermaid
graph LR
    A[User clicks 'Forgot Password'] --> B[Firebase sends email]
    B --> C[Email contains link to your domain]
    C --> D[User clicks link]
    D --> E[Beautiful branded page loads]
    E --> F[User resets password]
    F --> G[Redirected back to main app]
```

</div>

### **🔄 User Journey**

1. **🔑 User Action** - Clicks "Forgot Password" in your app
2. **📧 Email Sent** - Firebase sends email with custom action URL
3. **🌐 Branded Experience** - User lands on your custom domain
4. **✨ Beautiful Interface** - Clean, professional password reset form
5. **🔒 Secure Processing** - Firebase handles all security validation
6. **↩️ Return Home** - User redirected back to your app

---

## ⚡ **Quick Start**

### **1. Clone & Install**

```bash
git clone https://github.com/your-username/firebase-auth-handler.git
cd firebase-auth-handler
npm install
```

### **2. Configure Firebase**

Update `src/firebase/config.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  // ... other config
};
```

### **3. Update Firebase Console**

Set this URL in Firebase Console for **ALL** email templates:

```bash
https://your-domain.com/auth-action
```

### **4. Deploy**

```bash
npm run build
# Deploy to Netlify, Vercel, or your preferred platform
```

---

## ⚙️ **Firebase Console Setup**

### **📋 Quick Setup Checklist**

- [ ] Open [Firebase Console](https://console.firebase.google.com/)
- [ ] Navigate to **Authentication** → **Templates**
- [ ] Update Action URL for each template
- [ ] Test with a real email

<details>
<summary><strong>📖 Detailed Setup Instructions</strong></summary>

1. **Go to Firebase Console**
   ```
   https://console.firebase.google.com/
   ```

2. **Select Your Project**
   - Choose your Firebase project

3. **Navigate to Authentication**
   ```
   Authentication → Templates
   ```

4. **Update Each Template**
   - **Password Reset** → Edit → Set Action URL
   - **Email Verification** → Edit → Set Action URL  
   - **Email Change** → Edit → Set Action URL
   - **Email Recovery** → Edit → Set Action URL

5. **Save Changes**
   - Click "Save" for each template

</details>

---

## 🔧 **Supported Authentication Actions**

<table>
<tr>
<th width="25%">Action Type</th>
<th width="25%">Firebase Mode</th>
<th width="25%">When Used</th>
<th width="25%">User Experience</th>
</tr>
<tr>
<td><strong>Password Reset</strong></td>
<td><code>resetPassword</code></td>
<td>User forgot password</td>
<td>Secure password update form</td>
</tr>
<tr>
<td><strong>Email Verification</strong></td>
<td><code>verifyEmail</code></td>
<td>New account signup</td>
<td>One-click email confirmation</td>
</tr>
<tr>
<td><strong>Email Change</strong></td>
<td><code>verifyAndChangeEmail</code></td>
<td>User changes email</td>
<td>Verify new email address</td>
</tr>
<tr>
<td><strong>Email Recovery</strong></td>
<td><code>recoverEmail</code></td>
<td>Account compromise</td>
<td>Restore original email</td>
</tr>
</table>

---

## 🌐 **URL Structure & Parameters**

### **📝 Example URLs**

```bash
# Password Reset
https://your-domain.com/auth-action?mode=resetPassword&oobCode=ABC123&continueUrl=https://your-app.com

# Email Verification  
https://your-domain.com/auth-action?mode=verifyEmail&oobCode=XYZ789&continueUrl=https://your-app.com

# Email Change
https://your-domain.com/auth-action?mode=verifyAndChangeEmail&oobCode=DEF456&continueUrl=https://your-app.com
```

### **🔍 Parameter Reference**

| Parameter | Required | Description | Example |
|:---|:---:|:---|:---|
| `mode` | ✅ | Authentication action type | `resetPassword` |
| `oobCode` | ✅ | One-time action code from Firebase | `ABC123...` |
| `continueUrl` | ❌ | Redirect URL after completion | `https://your-app.com` |
| `lang` | ❌ | Language code for localization | `en` |

---

## 💻 **Development**

### **📁 Project Structure**

```
src/
├── components/
│   ├── AuthAction.tsx      # Main auth action handler
│   ├── AuthHandler.tsx     # URL parameter parser
│   ├── DarkModeToggle.tsx  # Theme switcher
│   └── NotFound.tsx        # 404 page
├── firebase/
│   └── config.ts           # Firebase configuration
├── hooks/
│   └── useDarkMode.ts      # Dark mode logic
├── App.tsx                 # Main application
└── main.tsx               # Entry point
```

### **🚀 Development Commands**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🚀 **Deployment**

### **📦 Netlify (Recommended)**

This project is optimized for Netlify with automatic SPA routing:

```bash
# Build the project
npm run build

# Deploy to Netlify
# The netlify.toml file handles all configuration
```

### **🔧 Other Platforms**

- **Vercel**: Works out of the box
- **GitHub Pages**: Requires additional SPA routing setup
- **Firebase Hosting**: Perfect integration with Firebase

---

## 🔒 **Security Features**

<div align="center">

| 🛡️ **Security Layer** | ✅ **Implementation** |
|:---|:---|
| **HTTPS Required** | All production URLs use HTTPS |
| **Firebase Validation** | All action codes validated before processing |
| **No Data Exposure** | Sensitive data never exposed in errors |
| **Secure Redirects** | Only trusted domains for redirects |
| **Input Validation** | All form inputs properly validated |

</div>

---

## 🎨 **Design System**

### **🌓 Theme Colors**

<table>
<tr>
<td width="50%">

#### **🌞 Light Mode**
- **Background:** Pure White
- **Cards:** White with Gray Borders
- **Text:** Black Headings, Gray Body
- **Buttons:** Black with White Text
- **Icons:** Black Backgrounds

</td>
<td width="50%">

#### **🌙 Dark Mode**
- **Background:** Pure Black
- **Cards:** Dark Gray with Gray Borders  
- **Text:** White Headings, Light Gray Body
- **Buttons:** White with Black Text
- **Icons:** White Backgrounds

</td>
</tr>
</table>

### **📱 Responsive Design**

- **Mobile First**: Optimized for mobile devices
- **Flexible Layouts**: Adapts to all screen sizes
- **Touch Friendly**: Large tap targets for mobile
- **Fast Loading**: Optimized images and assets

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

### **🐛 Bug Reports**
1. Check existing issues first
2. Use the issue template
3. Include screenshots
4. Provide reproduction steps

### **✨ Feature Requests**
1. Describe the use case
2. Explain the expected behavior
3. Consider backward compatibility

### **🔧 Pull Requests**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 **Browser Support**

| Browser | Version | Status |
|:---|:---:|:---:|
| **Chrome** | 90+ | ✅ Fully Supported |
| **Firefox** | 88+ | ✅ Fully Supported |
| **Safari** | 14+ | ✅ Fully Supported |
| **Edge** | 90+ | ✅ Fully Supported |

---

## 🔗 **Related Projects**

- [Firebase Documentation](https://firebase.google.com/docs/auth) - Official Firebase Auth docs
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) - React hooks for Firebase
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

## 📞 **Support & Community**

<div align="center">

### **Need Help?**

| 📧 **Issues** | 💬 **Discussions** | 🌟 **Star** |
|:---:|:---:|:---:|
| [Report Bug](https://github.com/your-username/firebase-auth-handler/issues) | [Join Discussion](https://github.com/your-username/firebase-auth-handler/discussions) | [Star Repo](https://github.com/your-username/firebase-auth-handler) |

</div>

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

### **⭐ Star this repository if it helped you!**

**Made with ❤️ for the Firebase community**

[🔝 Back to Top](#-firebase-authentication-action-handler)

</div>
