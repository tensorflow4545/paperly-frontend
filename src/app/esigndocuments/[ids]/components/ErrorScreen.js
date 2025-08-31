export default function ErrorScreen({ error }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Documents</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>If this error persists, please contact support.</p>
          <p>URL: {window.location.href}</p>
        </div>
      </div>
    </div>
  );
}

