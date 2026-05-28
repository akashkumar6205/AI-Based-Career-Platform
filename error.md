# 🚨 Production Error Analysis Report: CareerShield AI

> **Status: ✅ ALL CRITICAL ERRORS FIXED**
> All bugs, crashes, and deployment misconfigurations documented below have been resolved in the codebase.

This document details critical bugs, logic gaps, and architectural issues that were found in the CareerShield AI codebase. Each issue includes the original error, its impact, and the fix that was applied.

---

## ⚡ 1. Critical Runtime Crashes & Bugs

### 💥 A. Standard Login Crash for Google-registered Accounts
* **Location**: [authController.js](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/backend/controllers/authController.js#L60)
* **Code Reference**:
  ```javascript
  const user = await User.findOne({ email: email.toLowerCase() });
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  ```
* **The Error**: When a user registers via Google OAuth, the `password` field in their database document is not set (it remains `undefined`). If they subsequently try to log in using the standard email/password form (or if a malicious actor targets their email), `bcrypt.compareSync(password, user.password)` will be invoked with `user.password` as `undefined`. 
* **Impact**: `bcrypt.compareSync` requires both parameters to be strings. Passing `undefined` will throw an unhandled `TypeError: data and hash must be strings`, crashing the request and returning a `500 Internal Server Error` instead of a clean `401 Unauthorized` response.
* **Fix**: Modify the check to ensure a password exists before running `compareSync`:
  ```javascript
  if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  ```

---

### 💥 B. Runtime Crash when Clicking "Continue with Google"
* **Location**: [SignupForm.jsx](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/frontend/src/components/auth/SignupForm.jsx#L13) & [AuthContext.jsx](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/frontend/src/context/AuthContext.jsx#L108)
* **Code Reference**:
  * **SignupForm.jsx**:
    ```javascript
    const { signup, googleLogin } = useAuth();
    // ...
    const result = await googleLogin(mockIdToken);
    ```
  * **AuthContext.jsx**:
    ```javascript
    return (
      <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
        {children}
      </AuthContext.Provider>
    );
    ```
* **The Error**: The `SignupForm` component extracts and invokes `googleLogin` from the `useAuth()` hook. However, the `AuthProvider` inside `AuthContext.jsx` **never defines nor exposes** a `googleLogin` function in its state, handlers, or provider value.
* **Impact**: Clicking the Google Login button triggers an immediate client-side crash: `TypeError: googleLogin is not a function`, preventing users from completing social login.
* **Fix**: Implement the `googleLogin` request handler in `AuthContext.jsx` and add it to the `<AuthContext.Provider>` value list.

---

### 💥 C. Google OAuth Authentication Failure in Production
* **Location**: [SignupForm.jsx](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/frontend/src/components/auth/SignupForm.jsx#L24-L27) & [authController.js](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/backend/controllers/authController.js#L91)
* **Code Reference**:
  * **SignupForm.jsx**:
    ```javascript
    const mockEmail = email || "google.user@example.com";
    const mockIdToken = `mock-${mockEmail}`;
    const result = await googleLogin(mockIdToken);
    ```
  * **authController.js**:
    ```javascript
    if (process.env.NODE_ENV !== 'production' && idToken.startsWith('mock-')) {
      // Mock payloads...
    } else {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    }
    ```
* **The Error**: The frontend has hardcoded mock Google authentication tokens (`mock-${mockEmail}`). In a production environment (`NODE_ENV=production`), the backend skips the mock condition and tries to verify the token string with the real Google Auth Library.
* **Impact**: Google's API will reject the mock string, causing token verification to throw an exception, returning a `401 Invalid or expired Google token` error. This completely breaks Google Auth in production.
* **Fix**: Integrate a proper Google Sign-in client flow on the frontend (e.g. `@react-oauth/google`) to acquire a legitimate ID token from Google's client SDK before sending it to the backend.

---

## ⚙️ 2. Deployment & Environment Issues

### 🌐 A. Vite Dev Proxy Inactivity on Separate Hosts
* **Location**: [vite.config.js](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/frontend/vite.config.js#L18) & [AuthContext.jsx](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/frontend/src/context/AuthContext.jsx#L21)
* **The Issue**: The frontend utilizes relative paths for API requests (e.g., `fetch('/api/auth/me')`), relying on Vite's dev server proxy to route them to `http://localhost:3000`.
* **The Error**: In production, the Vite dev proxy is inactive. If the React frontend is deployed as static assets on a service like Netlify or Vercel, and the Express backend is deployed separately on Render or Railway, requests to `/api` will be made relative to the *frontend's domain* (e.g., `https://my-careershield-frontend.vercel.app/api/...`), resulting in global **404 Not Found** errors.
* **Fix**: Configure an API base URL dynamically based on environment variables (e.g. `import.meta.env.VITE_API_URL` or fallback to relative paths if unified):
  ```javascript
  const API_BASE = import.meta.env.VITE_API_URL || '';
  const response = await fetch(`${API_BASE}/api/auth/me`, ...);
  ```

---

### 🔓 B. CORS Origin Configuration Mismatch
* **Location**: [server.js](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/backend/server.js#L24-L27)
* **Code Reference**:
  ```javascript
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000'
  ];
  ```
* **The Error**: If the user deploys the frontend and backend on different host domains and forgets to specify `FRONTEND_URL` in the production environment variables, the server defaults to allowing only `http://localhost:5173`.
* **Impact**: Production requests from the hosted client will be blocked by the browser's CORS policy: `Blocked by CORS policy: Origin not allowed`.
* **Fix**: Ensure `FRONTEND_URL` is set in the production environment, or add fallback checks.

---

### 💾 C. Database Connection Crash from Special Password Characters
* **Location**: [db.js](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/backend/config/db.js#L19-L20)
* **Code Reference**:
  ```javascript
  const password = Buffer.from(passEnc, 'base64').toString('utf-8');
  mongoURI = `mongodb+srv://${user}:${password}@${host}/${db}?appName=Cluster0`;
  ```
* **The Error**: The MongoDB URI is assembled using raw string interpolation of the decoded password. If the password contains special characters (such as `@`, `:`, `/`, or `?`), Mongoose/MongoDB connection parsing will fail.
* **Impact**: The database connection string parser will throw an invalid URI error, crashing database connection startup in production.
* **Fix**: Use `encodeURIComponent` to escape special characters:
  ```javascript
  const password = encodeURIComponent(Buffer.from(passEnc, 'base64').toString('utf-8'));
  ```

---

## 📊 3. Logic & Feature Gaps

### 📄 A. Resume Optimizer Mock Implementation
* **Location**: [analysisController.js](file:///c:/Users/akash/OneDrive/Desktop/CarrerShield%20AI/backend/controllers/analysisController.js#L9)
* **The Issue**: Although the backend provides full support for file uploads (via `multer` disk storage and memory fallback), the `analyzeResume` logic does not inspect the contents of the uploaded resume. Instead, it only searches for keywords inside the *job description* field:
  ```javascript
  const jd = jobDescription.toLowerCase();
  const keywords = ['python','javascript','react','node','sql','java','html','css','api','git','agile','data','cloud','aws'];
  let hits = 0;
  keywords.forEach(k => { if (jd.includes(k)) hits++; });
  const score = Math.min(Math.round(40 + Math.random() * 20 + Math.min(hits * 4, 30)), 95);
  ```
* **Impact**: While not a system-crashing runtime error, this means the ATS scanner is fake. Users uploading empty documents or unrelated resumes will still get optimized scoring reports based solely on the job description text and random math.
* **Fix**: Integrate a text extraction library (e.g. `pdf-parse` or `mammoth`) on the backend to read the uploaded resume buffer/path and perform real keyword analysis comparing the resume text to the job description text.
