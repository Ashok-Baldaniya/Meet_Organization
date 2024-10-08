import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:9000/api/user/register', {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response)
          .then((data) => {
            if (data.status === 200) {
                navigateTo("/login");
              } 
          })
          .catch((error) => {
            throw error;
          });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>

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

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
