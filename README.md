# POP Devotional Platform

A modern, mobile-first devotional web platform for Place of Pentecost (POP).

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a Firebase project and enable Auth (Email/Password), Firestore, and Storage.
4. Copy `.env.example` to `.env.local` and fill in your Firebase config.
5. Run `npm run dev` to start.

## Firestore Setup

- Create `admins`, `series`, `devotionals`, `media`, `settings` collections.
- Deploy Firestore and Storage security rules (see `firestore.rules` and `storage.rules`).
- Create an admin user: Use Firebase console to create a user, then add a document in `admins` collection with the UID.

## Bulk Import

Use the admin dashboard to import devotionals via JSON or CSV.

## Deployment

Deploy to Vercel or Firebase Hosting. Set environment variables. For auto-publishing, deploy the included Cloud Function.