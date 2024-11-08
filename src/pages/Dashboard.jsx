import { useState, useEffect } from "react";
import data from "../data/data.json";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    body: "",
  });
  const [editing, setEditing] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addItem = () => {
    setLoading(true); 
    setTimeout(() => {
      setItems([{ ...formData, id: items.length + 1 }, ...items]);
      setFormData({ id: "", name: "", email: "", body: "" });
      setFormVisible(false);
      setLoading(false);
    }, 3000);
  };

  const editItem = (id) => {
    const item = items.find((item) => item.id === id);
    setFormData({ ...item });
    setEditing(true);
    setFormVisible(true);
  };

  const updateItem = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedItems = items.map((item) =>
        item.id === formData.id ? formData : item
      );
      setItems(updatedItems);
      setFormData({ id: "", name: "", email: "", body: "" });
      setEditing(false);
      setFormVisible(false);
      setLoading(false);
    }, 3000);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setItems(data);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 container">
      <h1 className="text-3xl font-bold text-center mb-5">CRUD Application</h1>

      <button
        onClick={() => setFormVisible(!formVisible)}
        className="w-full mb-4 px-4 py-2 btn btn-active btn-success text-white font-semibold rounded-lg focus:outline-none hover:bg-green-600"
      >
        {formVisible ? "Cancel" : "Add Item"}
      </button>

      {formVisible && (
        <form
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            editing ? updateItem() : addItem();
          }}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Body"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none hover:bg-blue-600"
          >
            {editing ? "Update Item" : "Add Item"}
          </button>
        </form>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <table className="table table-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Email</th>
              <th className="px-4 py-2 text-left border-b">Body</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.body}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => editItem(item.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
