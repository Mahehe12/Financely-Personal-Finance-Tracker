import React from 'react';
import './styles.css';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import defaultImg from '../../assets/user.svg';

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out Successfully!!");
          navigate("/");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className='navbar'>
      <p className='logo'>
        Financely
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {user ? (
          <>
            <img
              src={user.photoURL ? user.photoURL : defaultImg}
              style={{ borderRadius: "50%", height: "1.5rem", width: "1.5rem" }}
              alt="User"
            />
            <p className='logo link' onClick={logoutFnc}>
              Logout
            </p>
          </>
        ) : (
          <img
            src={defaultImg}
            style={{ borderRadius: "50%", height: "1.5rem", width: "1.5rem" }}
            alt="Default User"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
