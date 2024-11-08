// Dashboard.js
import { useState, useEffect } from "react";
import data from "../data/data.json";
import Form from "../components/Form";
import ItemList from "../components/ItemList";
import LoadingSpinner from "../components/Loading";

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
    <div className="container mx-auto mt-10">
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="w-full mb-4 px-4 py-2 btn btn-active btn-success text-white font-semibold rounded-lg focus:outline-none hover:bg-green-800"
      >
        {formVisible ? "Cancel" : "Add Item"}
      </button>

      {formVisible && (
        <Form
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={editing ? updateItem : addItem}
          editing={editing}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ItemList items={items} editItem={editItem} deleteItem={deleteItem} />
      )}
    </div>
  );
}
