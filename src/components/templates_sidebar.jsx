const Sidebar = ({ items}) => {


  return (
    <div className="w-[265px] min-w-[20vw] h-[91vh] overflow-y-hidden bg-white shadow-sm border-r ">
      <ul className="flex flex-col space-y-2 p-4">
        {items.map((item, index) => (
          <li key={index} onClick={item.onClick} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 ${item.active ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
            {item.icon && <span className="">{item.icon}</span>}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
