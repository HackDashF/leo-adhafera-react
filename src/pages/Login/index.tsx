import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { authAPI } from "../../services/api/auth";
import { TextInput } from "../../components/input/TextInput";
import { Button } from "../../components/Button";
import { colors } from "../../TEMP_CSS";

interface LoginErrors {
  username?: string[];
  password?: string[];
  non_field_errors?: string[];
}

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setTokens } = useContext(AuthContext);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const tokenResponse = await authAPI.login(formData);
    if (!tokenResponse.success) {
      setErrors(
        tokenResponse.error.fields || {
          non_field_errors: ["Login failed"],
        },
      );
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

  const pageErrorStyles: React.CSSProperties = {
    color: colors.errorText,
    marginBottom: "15px",
    fontSize: "1.2rem",
  };

  const inputContainerstyles: React.CSSProperties = {
    marginBottom: "1rem",
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={pageTitleStyles}>Login</h2>

      {errors.non_field_errors && (
        <div style={pageErrorStyles}>{errors.non_field_errors.join(", ")}</div>
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
          borderColor={colors.inputBorder}
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
          borderColor={colors.inputBorder}
        />
      </div>

      <Button
        type="submit"
        text="Login"
        // icon={}
        // onClick={() => {}} // required?
      />
    </form>
  );
};

export default Login;
