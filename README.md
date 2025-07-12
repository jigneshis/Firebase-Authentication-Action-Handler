# Firebase Authentication with Custom Action URLs

This project demonstrates how to set up Firebase Authentication with custom action URLs for handling password resets, email verification, and other authentication actions.

## 🚀 Features

- **Password Reset**: Secure password reset flow with email verification
- **Email Verification**: Verify user email addresses after signup
- **Email Recovery**: Recover email addresses for account security
- **Custom Action URLs**: Handle all Firebase auth actions through your own domain
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Error Handling**: Comprehensive error handling and user feedback
- **TypeScript**: Full TypeScript support for better development experience

## 📋 Setup Instructions

### 1. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Navigate to **Authentication** > **Sign-in method**
4. Enable **Email/Password** authentication
5. Go to **Authentication** > **Templates** > **Email address verification**
6. Click **Edit** (pencil icon) for the email template you want to customize
7. Set the **Action URL** to: `https://your-domain.com/auth-action`
   - For local development: `http://localhost:5173/auth-action`
   - For production: `https://yourdomain.com/auth-action`

### 2. Firebase Configuration

1. Go to **Project Settings** > **General** > **Your apps**
2. Click **Add app** and select **Web**
3. Register your app and copy the configuration object
4. Update `src/firebase/config.ts` with your Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 3. Custom Action URL Setup

The custom action URL allows you to handle Firebase auth actions (like password resets) through your own domain instead of Firebase's default domain.

**In Firebase Console:**
1. Go to **Authentication** > **Templates**
2. For each email template (Password reset, Email verification, etc.):
   - Click the **Edit** (pencil) icon
   - Set the **Action URL** to your domain + `/auth-action`
   - Save the changes

**Supported Modes:**
- `resetPassword` - Password reset functionality
- `verifyEmail` - Email verification after signup
- `recoverEmail` - Email recovery for account security

### 4. URL Structure

The auth action URLs will have this structure:
```
https://yourdomain.com/auth-action?mode=resetPassword&oobCode=ABC123&continueUrl=https://yourdomain.com
```

**Parameters:**
- `mode`: The action type (resetPassword, verifyEmail, recoverEmail)
- `oobCode`: The one-time action code from Firebase
- `continueUrl`: Where to redirect after successful action
- `lang`: Language code (optional)

## 🛠️ Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Test the authentication flows:
   - Use the demo interface to send password reset emails
   - Create new accounts and verify emails
   - Test the custom action URLs

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthAction.tsx      # Handles auth actions (reset, verify, etc.)
│   ├── AuthHandler.tsx     # URL parameter parser and router
│   └── AuthDemo.tsx        # Demo interface for testing
├── firebase/
│   └── config.ts           # Firebase configuration
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## 🎨 UI Features

- **Responsive Design**: Works perfectly on desktop and mobile
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Clear error messages and recovery options
- **Success States**: Confirmation messages and next steps
- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Accessibility**: Proper form labels and keyboard navigation

## 🔒 Security Features

- **Code Verification**: Validates action codes before processing
- **Password Requirements**: Enforces minimum password length
- **Error Prevention**: Prevents common user errors with validation
- **Secure Handling**: Proper error handling without exposing sensitive data
- **HTTPS Required**: Production deployment requires HTTPS

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your hosting provider (Netlify, Vercel, etc.)

3. Update Firebase Console with your production domain

4. Test all authentication flows in production

## 📝 Common Issues

1. **Invalid Action Code**: Usually means the link has expired or been used
2. **CORS Issues**: Make sure your domain is authorized in Firebase
3. **Email Not Sent**: Check spam folder and Firebase quotas
4. **Redirect Issues**: Verify the `continueUrl` parameter is correct

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.