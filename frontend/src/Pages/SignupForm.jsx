import { useState } from "react";

const SignupForm = () => {
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
        // You can handle the form submission here, e.g., make an API request to create a user.

        // Example: send the formData to an API
        // fetch("/api/signup", {
        //   method: "POST",
        //   body: JSON.stringify(formData),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // Handle the response, e.g., show a success message or redirect to a new page
        //   })
        //   .catch((error) => {
        //     // Handle errors
        //   });
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
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
