import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [image, setImage] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("Male");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [edit, setEdit] = useState(null);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const password = useRef(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      data.some(
        (item) => item.username === username && (!edit || edit.id !== item.id)
      )
    ) {
      alert("Username must be unique.");
      return;
    }

    if (password.current.value.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const newUser = {
      id: edit ? edit.id : uuidv4(),
      image,
      firstname,
      lastname,
      username,
      password: password.current.value,
      country,
      gender,
      birthdate,
      phone
    };

    if (edit) {
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? newUser : item))
      );
      setEdit(null);
    } else {
      setData((prev) => [...prev, newUser]);
    }

    setImage(null);
    setFirstname("");
    setLastname("");
    setUsername("");
    setCountry("");
    setGender("Male");
    setBirthdate("");
    setPhone("");
    password.current.value = "";
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setImage(item.image);
    setFirstname(item.firstname);
    setLastname(item.lastname);
    setUsername(item.username);
    setCountry(item.country);
    setGender(item.gender);
    setBirthdate(item.birthdate);
    setPhone(item.phone);
    password.current.value = item.password;
    setEdit(item);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5">
      <form
        className="w-full md:w-80 bg-slate-200 p-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-3">
          {edit ? "Edit User" : "Create User"}
        </h2>
        <input
          className="w-full h-10 px-3 mb-3"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="Firstname"
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="Lastname"
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          required
          className="w-full h-10 px-3 mb-3"
          ref={password}
          type="password"
          placeholder="Password"
        />
        <input
          className="w-full h-10 px-3 mb-3"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          type="text"
          placeholder="Country"
        />
        <select
          className="w-full h-10 px-3 mb-3"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          className="w-full h-10 px-3 mb-3"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          type="date"
        />
        <input
          className="w-full h-10 px-3 mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="Tel"
        />
        <button className="w-full h-10 bg-blue-400 text-white">
          {edit ? "Update" : "Create"}
        </button>
      </form>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <div key={item.id} className="p-5 bg-white shadow rounded">
            {item.image && (
              <img
                src={item.image}
                alt="Profile"
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="font-semibold text-lg">
              {item.firstname} {item.lastname}
            </h3>
            <p className="text-sm text-gray-600">@{item.username}</p>
            <p className="text-sm">Country: {item.country}</p>
            <p className="text-sm">Gender: {item.gender}</p>
            <p className="text-sm">Birthdate: {item.birthdate}</p>
            <p className="text-sm">Phone: {item.phone}</p>
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 bg-green-400 text-white py-1 px-2 rounded"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-red-400 text-white py-1 px-2 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
