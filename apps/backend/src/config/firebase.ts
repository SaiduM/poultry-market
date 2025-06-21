import * as admin from 'firebase-admin';

let firebaseAuth: admin.auth.Auth | null = null;

const serviceAccountKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_PROJECT_ID;

if (serviceAccountKey && clientEmail && projectId) {
  try {
    const privateKey = serviceAccountKey.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    firebaseAuth = admin.auth();
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
} else {
  console.warn('⚠️  Firebase configuration not found. Authentication will be disabled.');
  console.warn('Please set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL environment variables.');
}

export { firebaseAuth }; 