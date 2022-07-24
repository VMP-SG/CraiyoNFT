import React from 'react';
import Logo from '../assets/Logo.svg';
import { NavLink } from 'react-router-dom';
import P from '../constants/paths';
import PrimaryButton from '../components/PrimaryButton';
import WalletButton from '../components/WalletButton';

const MainHeader = () => {
  return (
    <nav className='flex w-full justify-center drop-shadow-md bg-white h-[57.6px] sticky'>
      <div className='flex items-center max-w-[var(--max-screen-width)] w-full'>
        <NavLink to={P.PATH_HOME}>
          <div className='flex ml-[80px] bg-white-pale items-center font-logo text-[17.07px]'>
            <img src={Logo} alt='Logo' className='h-[32px]' />
            <span className='h-[19.65px] leading-[20.48px] text-primary ml-[4.27px]'>Craiyo</span>
            <span className='h-[19.65px] leading-[20.48px] text-secondary'>NFT</span>
          </div>
        </NavLink>
        <ul className='flex ml-[230.67px] mr-[242.32px] gap-[23.47px] text-gray-dark font-secondary text-[11.33px] h-full items-center'>
          <li className='h-full flex items-center'>
            <NavLink to={P.PATH_GALLERY} className={(navData) => (navData.isActive ? 'border-b text-blue-dark border-blue-dark' : 'hover:border-b hover:text-secondary border-secondary') + ' h-full flex items-center'}>
              Discover
            </NavLink>
          </li>
          <li className='h-full flex items-center'>
            <NavLink to={P.PATH_ABOUT} className={(navData) => (navData.isActive ? 'border-b text-blue-dark border-blue-dark' : 'hover:border-b hover:text-secondary border-secondary') + ' h-full flex items-center'}>
              About
            </NavLink>
          </li>
          <li className='h-full flex items-center'>
            <NavLink to={P.PATH_ABOUT} className={(navData) => (navData.isActive ? 'border-b text-blue-dark border-blue-dark' : 'hover:border-b hover:text-secondary border-secondary') + ' h-full flex items-center'}>
              Contact Us
            </NavLink>
          </li>
          <li className='h-full flex items-center'>
            <NavLink to={P.PATH_MINT} className={(navData) => (navData.isActive ? 'border-b text-blue-dark border-blue-dark' : 'hover:border-b hover:text-secondary border-secondary') + ' h-full flex items-center'}>
              How it works
            </NavLink>
          </li>
        </ul>
        <PrimaryButton text="Create" tw='mr-[12.73px]' />
        <WalletButton />
      </div>
    </nav>
  );
};

export default MainHeader;
