export const validateEmail = (email) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  return validEmail ? null : 'Please enter a valid email address.';
};

export const validatePassword = (password) => {
  const missing = [];
  if (password.length < 8) missing.push('at least 8 characters');
  if (!/[a-z]/.test(password)) missing.push('one lowercase letter');
  if (!/[A-Z]/.test(password)) missing.push('one uppercase letter');
  if (!/\d/.test(password)) missing.push('one number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) missing.push('one special character');
  if (missing.length === 0) return null;
  return `Password must contain ${missing.join(', ')}.`;
};

export const validateDetails = (email, password) =>
  validateEmail(email) || validatePassword(password);

const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use':
    'An account with this email already exists. Try signing in instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password is too weak. Please choose a stronger password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed':
    'Network error. Please check your connection and try again.',
};

export const getAuthErrorMessage = (errorCode) =>
  AUTH_ERROR_MESSAGES[errorCode] || 'Something went wrong. Please try again.';
