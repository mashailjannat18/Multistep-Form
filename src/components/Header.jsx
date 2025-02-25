import React from 'react';
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="bg-[white] text-gray-800 py-[18px] px-[3px] w-[1200px] rounded-[16px] fixed top-[13px] left-[35px] z-10 h-[65px] flex items-center justify-center">
        <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between">
            <div className="flex items-center ml-[-25px]">
                <img
                    src={logo}
                    alt="Medicuro Logo"
                    className="h-[75px] w-[75px]"
                />
                <p className="text-[22px] font-bold ml-[-3px]">Create Profile</p>
            </div>
        </div>
    </header>
  );
};

export default Header;