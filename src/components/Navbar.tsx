import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface navlinksModel {
  title: string,
  url: string,
}

const navLinks: navlinksModel[] = [
  {title: 'Products', url: '/'},
  {title: 'Login', url: '/login'},
  {title: 'Register', url: '/register'}
];

const modalColor: string = 'bg-gray-900';

const MyNavbar = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {setIsMobile(window.innerWidth < 769)};
    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize)};
  },[]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBarsIconClick = () => {
    toggleModal();
  };
  
  return (
      <div>
      {!isMobile ? (
        <nav className='h-auto bg-slate-700'>
          <div className='flex justify-between mx-auto items-center py-4 px-4'>
            <div className='text-white font-bold text-xl'>BasStore</div>
            <ul className='flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer'>
              {navLinks.map((link, index) => (
                <li 
                  key={index}
                  className='text-white text-sm'
                >
                  <Link to={link.url}>
                    <span className='font-semibold text-gray-400 hover:text-white'>
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : (
        <nav className='h-auto py-4 px-4 bg-slate-700'>
          <div className='mx-auto flex justify-between items-center'>
            <div className='text-white font-bold text-xl'>BasStore</div>
            <div className='flex justify-end items-center gap-6 text-white cursor-pointer'>
              <FaBars onClick={handleBarsIconClick} className="text-white cursor-pointer" />
            </div>
          </div>
          {showModal && (
            <div className='fixed inset-0 flex justify-center items-center'>
              <div className={`absolute inset-0 ${modalColor}`}>
                <FaTimes
                  className="absolute top-6 right-4 text-white cursor-pointer"
                  onClick={toggleModal}
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div className='relative bg-gray-900 w-full'>
                <div className='flex flex-col gap-8 items-center justify-center h-full'>
                  {navLinks.map((link, index) => (
                    <span 
                      key={index}
                      className='text-white font-light text-2xl cursor-pointer'
                    >
                      <Link to={link.url}>{link.title}</Link>
                    </span>
                  ))};
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
)};

export default MyNavbar;