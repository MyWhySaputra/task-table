import PropTypes from "prop-types";

export default function Form({
  formData,
  handleInputChange,
  handleSubmit,
  editing,
}) {
  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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
  );
}

Form.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
}
