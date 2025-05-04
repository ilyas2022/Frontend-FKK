import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logoImage from '../assets/images/logo.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../services/authentication';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      //Inicializar Firestore
      const db = getFirestore(app);

      //Verificar si el usuario ya existe en Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if(!userSnap.exists()){
        //Si el usuario no existe, crearlo en Firestore y asignarle 2 créditos
        await setDoc(userRef, {
          email: user.email,
          credits: 2,
          createdAt: new Date()
        });
      }
      
      //Crear o actualizar el documento userTest para este usuario
      const userTestRef = doc(db, "userTests", user.uid);
      await setDoc(userTestRef, {
        email: user.email,
        credits: 2
      });

      // No usamos localStorage, confiamos en la sesión de Firebase
      navigate('/generate');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError('Error de inicio de sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-page">
      {/* Header - Same as HomePage */}
      <header className="roomgpt-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="RoomioAI" className="logo-image" />
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/login" className="login-button">Login</Link>
          </div>
        </div>
      </header>

      {/* Main Login Content */}
      <div className="login-container">
        <div className="login-content">
          <div className="users-badge">
            Over <span className="highlight">2 million users</span> have used roomGPT so far
          </div>
          
          <h1 className="login-title">
            Redesign your <span className="highlight">room</span><br />
            in seconds
          </h1>
          
          <p className="login-description">
            Sign in with Google to create a free account<br />
            and redesign your room today. You'll get <span className="highlight">2 generation</span> for free.
          </p>
          
          <button onClick={handleGoogleSignIn} className="google-signin-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
          
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
