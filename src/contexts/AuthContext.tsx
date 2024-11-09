import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null!);

function getInitialUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}



function getInitialToken() {
  const token = sessionStorage.getItem("token");
  return token ? token : null;
}

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(getInitialUser);
  const [token, setToken] = useState<any>(getInitialToken);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  const navigate = useNavigate();

  const signinUser = (payload: any) => {
    const { user, token } = payload;
    if (token) {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token",token);
      setUser(user);
      setToken(token)
      navigate('/dashboard')
      message.success("Logged in successfully");
    }
  };

  const updateUser = (user: any) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const signoutUser = () => {
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("token", "");
    setUser(null);
    setToken(null);
    navigate("/signin");
    message.success("Logged out successfully");
  };

  const handleFetchAuth = async () => {
    if (token) {
      setToken(token);
    }
  };

  let value = {
    user,
    setUser,
    token,
    menuOpen,
    setMenuOpen,
    setToken,
    signinUser,
    signoutUser,
    updateUser,
  };

  useEffect(() => {
    handleFetchAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context: any = useContext(AuthContext);
  console.log(context, "context :::::::>>>>>")
  context.signoutUser()
  return;
};

export { AuthContext, AuthProvider };
