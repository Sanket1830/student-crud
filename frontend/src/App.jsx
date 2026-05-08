import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    age: "",
    address: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/students";

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post(API, formData);
    }

    setFormData({
      name: "",
      email: "",
      mobile: "",
      course: "",
      age: "",
      address: "",
    });

    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditId(student._id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white flex justify-center items-center gap-3">
            <FaUserGraduate />
            Student CRUD System
          </h1>

          <p className="text-gray-300 mt-4">
            Three Tier Docker Application
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/20 text-white outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/20 text-white outline-none"
              required
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/20 text-white outline-none"
              required
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/20 text-white outline-none"
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/20 text-white outline-none"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/20 text-white outline-none"
              required
            />

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-bold transition-all duration-300 md:col-span-2"
            >
              {editId ? "Update Student" : "Add Student"}
            </button>

          </form>
        </div>

        <div className="mt-10 overflow-x-auto">

          <table className="w-full text-white rounded-2xl overflow-hidden">

            <thead className="bg-purple-700">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Course</th>
                <th className="p-4">Age</th>
                <th className="p-4">Address</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student._id}
                  className="bg-white/10 border-b border-white/10 text-center"
                >
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.mobile}</td>
                  <td className="p-4">{student.course}</td>
                  <td className="p-4">{student.age}</td>
                  <td className="p-4">{student.address}</td>

                  <td className="p-4 flex justify-center gap-4">

                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 hover:bg-red-600 p-3 rounded-full"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;
