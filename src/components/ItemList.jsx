import PropTypes from "prop-types";

export default function ItemList({ items, editItem, deleteItem }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs md:table-sm w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">No</th>
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Email</th>
            <th className="px-4 py-2 text-left border-b">Body</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.body}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => editItem(item.id)}
                  className="btn btn-active btn-warning text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="btn btn-active btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
