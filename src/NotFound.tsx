const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">
          404
        </h1>
        <h2 className="text-4xl font-semibold text-gray-600 dark:text-gray-300 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 mb-8">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/70 dark:hover:bg-primary/50 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
