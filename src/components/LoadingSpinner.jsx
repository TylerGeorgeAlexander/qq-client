// components/LoadingSpinner.jsx

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-t-4 border-blue-500 rounded-full animate-spin w-12 h-12"></div>
    </div>
  );
};

export default LoadingSpinner;
