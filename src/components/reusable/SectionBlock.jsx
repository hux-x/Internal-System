const SectionBlock = ({ fields }) => {
  const handleTextareaChange = (e) => {
    const textarea = e.target;
    const lines = textarea.value.split('\n').map(line => {
      // Trim leading spaces and check if it starts with hyphen
      const trimmedLine = line.trimStart();
      if (trimmedLine.startsWith('- ')) {
        return '• ' + trimmedLine.slice(2); // Replace '- ' with '• '
      }
      return line;
    });
    
    // Update the textarea value
    textarea.value = lines.join('\n');
    
    // Move cursor to the end of the text
    const newCursorPos = textarea.value.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  };

  return (
    <div className="mb-8">
      <div className="space-y-5">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="text-base font-semibold text-black block mb-1">
              {field.heading}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full bg-gray-50 rounded-xl text-sm font-medium text-gray-700 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder:text-center"
                style={{ 
                  height: field.height, 
                  minHeight: field.height,
                  resize: 'none', // Prevent textarea resizing
                  textAlign: 'left' // Text starts from left when typing
                }}
                placeholder={field.placeholder || "Eg. Feature"}
                onChange={handleTextareaChange}
              />
            ) : (
              <input
                type={field.type || 'text'}
                className="w-full bg-gray-50 rounded-xl text-sm font-medium text-gray-700 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder:text-center"
                style={{ 
                  height: field.height,
                  textAlign: 'left' // Text starts from left when typing
                }}
                placeholder={field.placeholder || "Eg. Feature"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionBlock;