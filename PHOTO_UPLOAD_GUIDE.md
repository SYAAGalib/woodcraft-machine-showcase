# Photo Upload Feature Documentation

## Overview
This application now supports uploading photos directly from the admin panel. Photos are stored locally in the `storage/uploads` folder and served by the backend server.

## Setup

### 1. Install Dependencies
```bash
npm install
```

This will install the following new dependencies:
- `express`: Backend server framework
- `multer`: Middleware for handling file uploads
- `cors`: Enable cross-origin requests
- `concurrently`: Run multiple npm scripts concurrently

### 2. Start the Development Servers
```bash
npm run dev
```

This command starts both:
- **Frontend** (Vite): `http://localhost:8080`
- **Backend** (Express): `http://localhost:3001`

You can also run them separately:
- Frontend only: `npm run dev:frontend`
- Backend only: `npm run dev:backend`

## Features

### Multi-Photo Upload
- Upload multiple photos at once (up to 10 files)
- Supports image formats: JPG, PNG, GIF, etc.
- Maximum file size: 10MB per file

### Photo Management
- Preview photos before upload
- Remove photos before submitting
- Edit existing products and add more photos
- Remove existing photos from products

### Storage
- Photos are stored in `storage/uploads/`
- Files are automatically renamed with unique timestamps
- Served via `/uploads/<filename>` URL path

## API Endpoints

### Upload Photos
**POST** `/api/upload`
- Content-Type: `multipart/form-data`
- Field name: `images` (multiple files)
- Returns: Array of file paths

### Delete Photo
**DELETE** `/api/upload/:filename`
- Removes a specific file from the uploads directory

### Health Check
**GET** `/api/health`
- Returns server status

## File Structure

```
woodcraft-machine-showcase-main/
├── server/
│   └── index.js              # Express backend server
├── storage/
│   └── uploads/              # Uploaded photos storage
│       └── .gitkeep         # Ensures directory exists in git
├── src/
│   └── pages/
│       └── admin/
│           └── AdminProducts.tsx  # Updated with file upload UI
└── vite.config.ts           # Configured with proxy settings
```

## Important Notes

1. **Storage Folder**: The `storage/uploads` folder is gitignored (except `.gitkeep`) to prevent committing uploaded files to version control.

2. **Development vs Production**: This setup is for development. For production:
   - Consider using cloud storage (AWS S3, Cloudinary, etc.)
   - Implement proper authentication
   - Add file validation and security measures
   - Set up proper error handling and logging

3. **Image Paths**: Images are stored with paths like `/uploads/filename-timestamp.jpg` and work seamlessly with both new uploads and existing URL references.

## Usage in Admin Panel

1. Navigate to the Admin Products page
2. Click "Add Product" or edit an existing product
3. In the modal, you'll see:
   - **Current Images**: Existing photos (can be removed)
   - **Upload Area**: Click to select multiple files
   - **Preview**: See selected files before upload
4. Selected files are uploaded when you click "Create Product" or "Update Product"

## Troubleshooting

### Backend server not starting
- Check if port 3001 is available
- Ensure all dependencies are installed: `npm install`

### Photos not appearing
- Verify both servers are running: `npm run dev`
- Check browser console for errors
- Ensure the `storage/uploads` directory exists and has write permissions

### Upload errors
- Check file size (max 10MB)
- Verify file format is an image
- Check server logs in the terminal
