# Downloadable Documents Feature Guide

## Overview
The downloadable documents feature allows admins to upload forms and documents that customers can download, fill out, and upload back to the tax preparer. This streamlines the document collection process and ensures customers have all necessary forms.

## How It Works

### For Admins:
1. **Navigate to Admin Dashboard** → Services tab
2. **Find the service** you want to add documents to
3. **Click "Manage"** next to "Downloadable Documents"
4. **Add New Document:**
   - Enter a descriptive title (e.g., "Tax Information Organizer 2024")
   - Add a description explaining what the form is for
   - Upload the PDF/Word document
   - Click "Add Document"

### For Customers:
1. **Visit a service page** (e.g., Current Year Tax Preparation)
2. **See "Forms to Download & Complete"** section
3. **Download forms** by clicking the download button
4. **Fill out forms** offline
5. **Upload completed forms** using the document upload section
6. **Track status** of uploaded documents in their dashboard

## Recommended Documents to Upload

### Individual Tax Services:
- **Tax Information Organizer**: Checklist of all documents needed
- **Direct Deposit Authorization**: For refund direct deposit
- **Spouse Authorization**: If filing jointly and spouse can't be present
- **Prior Year Summary**: For returning clients

### Business Tax Services:
- **Business Information Worksheet**: Company details and structure
- **Expense Categories Checklist**: Organized expense tracking
- **Depreciation Asset List**: For business assets
- **Quarterly Payment Tracker**: Estimated tax payment records

### Notary Services:
- **Document Preparation Checklist**: What to bring for notarization
- **ID Requirements Guide**: Acceptable forms of identification
- **Notary Service Request Form**: Pre-appointment information

## File Requirements
- **Supported formats**: PDF, DOC, DOCX, XLS, XLSX
- **File size limit**: 10MB per file
- **Recommended**: PDF format for best compatibility

## Best Practices

### Document Naming:
- Use clear, descriptive titles
- Include the year if applicable
- Example: "Individual Tax Organizer 2024"

### Descriptions:
- Explain what the form is for
- Include instructions on how to fill it out
- Mention if it's required or optional

### Organization:
- Group related documents together
- Update forms annually for tax documents
- Remove outdated forms regularly

## Customer Experience Flow

1. **Service Discovery**: Customer browses services
2. **Form Download**: Downloads required forms from service page
3. **Form Completion**: Fills out forms at their convenience
4. **Document Upload**: Uploads completed forms securely
5. **Status Tracking**: Monitors document review status
6. **Appointment**: Comes prepared with all necessary information

## Technical Details

### Database Schema:
```typescript
downloadableDocuments: v.optional(v.array(v.object({
  title: v.string(),
  description: v.string(),
  storageId: v.id("_storage"),
  fileName: v.string(),
  fileType: v.string(),
  uploadedAt: v.number(),
})))
```

### API Functions:
- `addDownloadableDocument`: Add new document to service
- `removeDownloadableDocument`: Remove document from service
- `getDownloadUrl`: Get secure download URL for document

## Security Features
- **Secure file storage**: All files stored in Convex secure storage
- **Access control**: Only authenticated users can download
- **Admin only uploads**: Only admins can add/remove documents
- **Audit logging**: All document management actions are logged

## Future Enhancements
- **Form templates**: Pre-built templates for common tax forms
- **Digital signatures**: Allow customers to sign forms digitally
- **Form validation**: Check if required fields are completed
- **Automatic reminders**: Email reminders for missing documents
- **Bulk upload**: Upload multiple documents at once