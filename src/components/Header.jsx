import Units from "./Units";
function Header({ children }) {
  return (
    <>
      <div className="header p-6 flex justify-between">
        <img
          src="/assets/images/logo.svg"
          alt="logo"
          className="ml-4 max-sm:w-1/2 max-sm:ml-0"
        ></img>
        {children}
      </div>
      <h1 className="text-5xl text-white font-bricolage font-bold mt-6 flex justify-center items-center max-sm:text-2xl">
        How's the sky looking today?
      </h1>
    </>
  );
}

export default Header;
