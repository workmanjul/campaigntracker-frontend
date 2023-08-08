const Header = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 py-4 px-2 rounded-[15px]">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button type="button" className="bg-white p-2 rounded-full">
            <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24"></svg>
          </button>
          <div className="absolute top-0 right-0 rounded-full bg-red-500 text-white px-2 py-1 text-xs">
            3
          </div>
        </div>
        <div className="relative">
          <button type="button" className="bg-white p-2 rounded-full">
            <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24"></svg>
          </button>
          <div className="absolute top-0 right-0 rounded-full bg-red-500 text-white px-2 py-1 text-xs">
            7
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Header;
