const Footer = () => {
  return (
    <footer className="dark:bg-gray-900">
      <div className="container py-12">
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-900 dark:text-gray-200">
            © {new Date().getFullYear()} Faris Ihsan. All rights reserved.
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-300 mt-4 md:mt-0">
            Designed and built with passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
