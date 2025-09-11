function ErrorPage({ retry }) {
  return (
    <div className="bg-Neutral-700 h-full w-full">
      <span className="w-64 h-64">🚫</span>
      <header className="text-white font-bricolage font-bold text-6xl">
        Something Went Wrong!
      </header>
      <p className="text-white font-bricolage font-semibold text-3xl">
        we could'nt connect to the server(API error).Please try again after
        sometime..
      </p>
      <button
        className="bg-gray-700 text-2xl p-4 font-bricolage text-white"
        onClick={retry}
      >
        <span>↪️</span>Retry
      </button>
    </div>
  );
}

export default ErrorPage;
