import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { authAPI } from "../../services/api/auth";
import { TextInput } from "../../components/input/TextInput";
import { Button } from "../../components/Button";
import { colors } from "../../TEMP_CSS";

interface RegisterErrors {
  username?: string[];
  email?: string[];
  password?: string[];
  first_name?: string[];
  last_name?: string[];
  non_field_errors?: string[];
}

const NewAccount = () => {
  const navigate = useNavigate();
  const { setUser, setTokens } = useContext(AuthContext);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const registerResponse = await authAPI.register(formData);
    if (!registerResponse.success) {
      setErrors(
        registerResponse.error.fields || {
          non_field_errors: ["Registration failed"],
        },
      );
      return;
    }

    const tokenResponse = await authAPI.login({
      username: formData.username,
      password: formData.password,
    });
    if (!tokenResponse.success) {
      setErrors({ non_field_errors: ["Login after registration failed"] });
      return;
    }

    const userResponse = await authAPI.getCurrentUser(
      tokenResponse.data.access,
    );
    if (!userResponse.success) {
      setErrors({ non_field_errors: ["Failed to get user data"] });
      return;
    }

    setTokens(tokenResponse.data);
    setUser(userResponse.data);
    navigate("/lists");
  };

  const pageTitleStyles: React.CSSProperties = {
    padding: "2rem 0rem",
    fontSize: "revert",
    color: colors.titleText,
  };

  const inputContainerstyles: React.CSSProperties = {
    marginBottom: "1rem",
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={pageTitleStyles}>Create Account</h2>

      {errors.non_field_errors && (
        <div className="error">{errors.non_field_errors.join(", ")}</div>
      )}

      <div style={inputContainerstyles}>
        <TextInput
          label="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          error={errors.username?.join(", ")}
        />
      </div>

      <div style={inputContainerstyles}>
        <TextInput
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          error={errors.email?.join(", ")}
        />
      </div>

      <div style={inputContainerstyles}>
        <TextInput
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          error={errors.password?.join(", ")}
        />
      </div>

      <div style={inputContainerstyles}>
        <TextInput
          label="First Name (optional)"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
          error={errors.first_name?.join(", ")}
        />
      </div>

      <div style={inputContainerstyles}>
        <TextInput
          label="Last Name (optional)"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
          error={errors.last_name?.join(", ")}
        />
      </div>

      <Button
        type="submit"
        label="Create Account"
        // icon={}
      />
    </form>
  );
};

export default NewAccount;
