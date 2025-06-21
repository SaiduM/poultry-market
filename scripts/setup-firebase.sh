#!/bin/bash

# Create Firebase environment file
cat > apps/frontend/.env.local << 'EOF'
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDLdMInQmvKkXo3HiB-TLx99YBqBe2ufiE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=poultry-market-d4639.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=poultry-market-d4639
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=poultry-market-d4639.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1076699712223
NEXT_PUBLIC_FIREBASE_APP_ID=1:1076699712223:web:dc697a2d1e47260353376a

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5001
EOF

echo "✅ Firebase environment file created at apps/frontend/.env.local"
echo "🔥 Firebase configuration is now ready!" 