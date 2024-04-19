import React, { useEffect } from 'react';

const HeaderWrapper = ({ children }) => {
  useEffect(() => {
    const button = document.getElementById('dropdown-button');
    button.addEventListener('click', () => {
      const dropdown = document.getElementById('dropdown');
      dropdown.classList.toggle(dropdown.style === 'hidden' ? 'block' : 'hidden');
    });

    //sticky header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 0) {
        header.classList.add('header-sticky');
      } else {
        header.classList.remove('header-sticky');
      }
    });
  }, []);

  return (
    <>
      <header className="header">
        {children}
      </header>
    </>
  );
};

export default HeaderWrapper;
