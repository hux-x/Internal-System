
export function getSidebarItemClass(key,selected) {
    const base = 'font-semibold flex gap-2 items-center py-1 px-2 rounded cursor-pointer';
    const active = 'text-red-500 ';
    const hover = 'hover:text-red-500';
    return `${base} ${selected === key ? active : hover}`;
  }
export function getsubSidebarItemClass(key,selected) {
    const base = 'font-semibold flex gap-2 items-center py-1 px-2 rounded cursor-pointer capitalize ';
    const active = 'text-blue-500 ';
    const hover = 'hover:text-blue-500';
    return `${base} ${selected === key ? active : hover}`;
  }
export const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-green-100 text-green-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

export const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In progress':
        return 'bg-blue-100 text-blue-800';
      case 'Needs Review':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Task':
        return 'bg-green-100 text-green-800';
      case 'Performance':
        return 'bg-green-100 text-green-800';
      case 'Ticket':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
