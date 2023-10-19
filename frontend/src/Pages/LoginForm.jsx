import { useState } from "react";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:9000/api/user/login', {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
