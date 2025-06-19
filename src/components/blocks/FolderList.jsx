import { FaFolder } from 'react-icons/fa';


const folders = [
  { name: 'Performance Reviews', id: '1TuVtpk3IYO9j2_9X9HiamvZLeOG5Unxn' },
  { name: 'Code Reviews', id: '1MCtUX3v3-Z17fHKaFivpcXWaF0g3wn_1' },
  { name: 'Post Code Documentation', id: '1hMrTO91nqR2erYPEcR7g-ps7hDAyeYrF' }
];

const FolderList = () => {
    
    const handleSendTemplate = (folderid)=>{}
  return (
  <div className="bg-white p-6 rounded-2xl shadow-md w-[320px]">
      <h2 className="text-2xl font-bold mb-6">Folder List</h2>
      <ul className="space-y-5">
        {folders.map((folder, idx) => (
          <li key={idx} className="flex items-center text-gray-500 font-semibold text-lg" onClick={()=>handleSendTemplate(folder.id)}>
            <FaFolder className="mr-3 text-gray-500" />
            <a
              
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {folder.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
