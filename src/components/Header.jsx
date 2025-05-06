import React, {useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../styles/Header.css';
import '../styles/HeaderLoged.css';
import logoImage from '../assets/images/logo.png';
import { getAuth, signOut } from 'firebase/auth';
import  {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';
import {app} from '../services/authentication';


const Header = ({ userCredits }) => {
  const[user, setUser] = useState(null);
  const[credits, setCredits] = useState(0);
  const[showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  
  useEffect(() => {
    // Get user from Firebase Auth
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Get credits from Firestore only if not provided as prop
        if (userCredits === undefined) {
          const db = getFirestore(app);
          const userRef = doc(db, "users", authUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setCredits(userDoc.data().credits || 0);
          }
        }
      } else {
        setUser(null);
        setCredits(0);
      }
    });
    
    return () => unsubscribe();
  }, [auth, userCredits]);
  
  // Actualizar los créditos cuando cambia la prop userCredits
  useEffect(() => {
    if (userCredits !== undefined) {
      setCredits(userCredits);
    }
  }, [userCredits]);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="roomgpt-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logoImage} alt="RoomioAI" className="logo-image" />
          </Link>
        </div>
        
        {user ? (
          <div className="loged-nav-links">
            <div className="loged-nav-menu">
              <Link to="/generate" className="loged-nav-link">Redesign</Link>
              <Link to="/pricing" className="loged-nav-link">Pricing</Link>
              <span className="loged-credits-display">{credits} credits</span>
            </div>
            <div className="loged-user-avatar" onClick={() => setShowDropdown(!showDropdown)}>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email?.charAt(0)}&background=random`} 
                alt="User"
                className="loged-avatar-image"
              />
              {showDropdown && (
                <div className="loged-dropdown-menu">
                  <div className="loged-user-info">
                    <span className="loged-user-email">{user.email}</span>
                    <span className="loged-user-credits">({credits} credits)</span>
                  </div>
                  <button onClick={handleLogout} className="loged-logout-button">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login" className="login-button">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header
