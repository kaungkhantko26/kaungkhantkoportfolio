import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
  checkActionCode
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCa5_Kohkqd___s2b8peZNCS5xD5hj9Yq8",
  authDomain: "kaungkhantkotop.firebaseapp.com",
  projectId: "kaungkhantkotop",
  storageBucket: "kaungkhantkotop.firebasestorage.app",
  messagingSenderId: "223908771252",
  appId: "1:223908771252:web:d2d0cabd50df6347eeeee1",
  measurementId: "G-53ZVHK6NZX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const statusEl = document.querySelector(".action-status");
const messageEl = document.querySelector(".action-message");
const form = document.querySelector(".action-form");

const setStatus = text => {
  if (statusEl) statusEl.textContent = text;
};

const setMessage = text => {
  if (messageEl) messageEl.textContent = text;
};

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const actionCode = params.get("oobCode");

const showForm = show => {
  if (form) form.hidden = !show;
};

const handleVerifyEmail = async () => {
  if (!actionCode) {
    setStatus("Invalid request.");
    return;
  }
  try {
    await applyActionCode(auth, actionCode);
    setStatus("Email verified.");
    setMessage("Your email has been verified. You can now sign in.");
  } catch (err) {
    setStatus("Verification failed.");
    setMessage("This link may have expired or already been used.");
  }
};

const handleRecoverEmail = async () => {
  if (!actionCode) {
    setStatus("Invalid request.");
    return;
  }
  try {
    const info = await checkActionCode(auth, actionCode);
    await applyActionCode(auth, actionCode);
    setStatus("Email restored.");
    setMessage(`Your email was restored to ${info.data.email}. Please sign in again.`);
  } catch (err) {
    setStatus("Recovery failed.");
    setMessage("This link may have expired or already been used.");
  }
};

const handleResetPassword = async () => {
  if (!actionCode) {
    setStatus("Invalid request.");
    return;
  }
  try {
    await verifyPasswordResetCode(auth, actionCode);
    setStatus("Reset your password");
    showForm(true);
  } catch (err) {
    setStatus("Reset link invalid.");
    setMessage("This password reset link is invalid or expired.");
  }
};

if (form) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const data = new FormData(form);
    const newPassword = String(data.get("newPassword") || "").trim();
    const confirmPassword = String(data.get("confirmPassword") || "").trim();
    if (!newPassword || newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      setStatus("Password updated.");
      setMessage("Your password has been reset. You can now sign in.");
      showForm(false);
    } catch (err) {
      setMessage("Unable to reset password. Try again later.");
    }
  });
}

if (!mode) {
  setStatus("Invalid request.");
  setMessage("No action specified.");
} else if (mode === "verifyEmail") {
  handleVerifyEmail();
} else if (mode === "resetPassword") {
  handleResetPassword();
} else if (mode === "recoverEmail") {
  handleRecoverEmail();
} else {
  setStatus("Unsupported action.");
  setMessage("This action is not supported.");
}
