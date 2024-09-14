import React from 'react'
import { Link } from 'react-scroll'
import './Navbar.css';
import logo from '../assets/taz b.jpg'
import menu_icon from '../assets/menu_icon.png'
import { useState,useEffect } from 'react';


const Navbar = () => {

  const[sticky, setSticky]= useState(false);


  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      window.scrollY > 50 ? setSticky(true) : setSticky(false) ;
    })
  }, []);
  const [mobileMenu,setMobileMenu] = useState(false);
  const toggleMenu =()=>{
    mobileMenu? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <nav className= {`container ${sticky ? 'dark-nav': ''}`}>   
      <Link to='home' smooth={true} offset={0} duration={500}><img src={logo} alt="logo" className='logo' /></Link>
      
       <ul className={mobileMenu? '': 'hide-mobile-menu'}>
            <li><Link to='home' smooth={true} offset={0} duration={500}>Home</Link> </li>
            <li><Link to='about' smooth={true} offset={-260} duration={500}>Products</Link> </li>
            
            <li><Link to='work' smooth={true} offset={-260} duration={500}>About Us</Link></li>
            <li className='Con'><Link to='contact' smooth={true} offset={-260} duration={500}className='btn'>Contact</Link> </li>
            
            
      </ul>
     <div></div>
    
      <img src={menu_icon} alt="" className='menu-icon'  onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar