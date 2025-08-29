export default function ESignDocumentsDefaultPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-gray-400 text-6xl mb-4">📄</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">No Documents Specified</h1>
        <p className="text-gray-600 mb-4">
          This page is for viewing shared documents. Please use the link provided in your email to access the documents.
        </p>
        <p className="text-sm text-gray-500">
          If you received a link to view documents, make sure you&apos;re using the complete URL that was sent to you.
        </p>
      </div>
    </div>
  );
}
