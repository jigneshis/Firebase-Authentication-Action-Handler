# Firebase Authentication Action Handler

This site handles Firebase authentication actions (password reset, email verification) for the Turri platform at `auth.turri.in.net`.

## 🎯 Purpose

When users click on "forgot password" or email verification links, they are redirected to this custom domain instead of Firebase's default pages, providing a branded experience.

## 🚀 How It Works

1. **User requests password reset** in your main app
2. **Firebase sends email** with custom action URL pointing to `auth.turri.in.net/auth-action`
3. **User clicks link** and is redirected here with authentication parameters
4. **This site handles the action** (password reset form, email verification, etc.)
5. **User is redirected back** to the main app after completion

## 📋 Firebase Console Setup

### Action URL Configuration

Set the following Action URL in Firebase Console:

**https://auth.turri.in.net/auth-action**

### Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** > **Templates**
4. For each email template:
   - Click **Edit** (pencil icon)
   - Set **Action URL** to: `https://auth.turri.in.net/auth-action`
   - Save changes

### Supported Actions:
- **Password Reset** (`mode=resetPassword`)
- **Email Verification** (`mode=verifyEmail`) 
- **Email Change Verification** (`mode=verifyAndChangeEmail`)
- **Email Recovery** (`mode=recoverEmail`)

## 🔧 Technical Details

### URL Structure
```
https://auth.turri.in.net/auth-action?mode=resetPassword&oobCode=ABC123&continueUrl=https://turri.in.net
https://auth.turri.in.net/auth-action?mode=verifyAndChangeEmail&oobCode=XYZ789&continueUrl=https://turri.in.net
```

**Parameters:**
- `mode`: Action type (resetPassword, verifyEmail, verifyAndChangeEmail, recoverEmail)
- `oobCode`: One-time action code from Firebase
- `continueUrl`: Redirect URL after completion (optional)
- `lang`: Language code (optional)

### Firebase Configuration
Update `src/firebase/config.ts` with your Firebase project credentials:

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

## 🎨 Features

- **Branded Experience**: Custom domain instead of Firebase's generic pages
- **Responsive Design**: Works on all devices
- **Error Handling**: Clear error messages and recovery options
- **Security**: Validates action codes before processing
- **User Feedback**: Loading states and success confirmations
- **Automatic Redirects**: Returns users to main app after completion

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your hosting provider

3. Point `auth.turri.in.net` to your deployment

4. Update Firebase Console with the production URL

## 🔒 Security

- All action codes are validated with Firebase before processing
- HTTPS required for production
- Proper error handling without exposing sensitive data
- Password requirements enforced (minimum 6 characters)

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthAction.tsx      # Handles password reset, email verification
│   └── AuthHandler.tsx     # URL parameter parser and router
├── firebase/
│   └── config.ts           # Firebase configuration
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 Notes

- The site automatically detects if it's handling an auth action based on URL parameters
- If no auth parameters are present, it shows a simple landing page
- All successful actions redirect back to `https://turri.in.net` by default
- The `continueUrl` parameter can override the default redirect