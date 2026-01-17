

const Navbar = () => {
    const user=localStorage.getItem("user");
  return (
    <div className="">
      {" "}
      {/* //navbar */}
      <div className="">
        <div className="py-4 text-lg flex justify-end border-b border-gray-300 shadow-sm ">
          <p className="mr-6 text-gray-600 font-medium ">{user}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar