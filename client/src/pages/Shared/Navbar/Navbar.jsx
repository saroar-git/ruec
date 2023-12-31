import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from '../../../components/Container';
import { BiMenu,  BiXCircle } from "react-icons/bi";
import logo from '/logo1.png';
import useAuth from '../../../hooks/useAuth';
import Button from '../../../components/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showCommunitySubLinks, setShowCommunitySubLinks] = useState(false);
  const { user } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const handleClose = () => setOpen(false);

  const Links = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blogs" },
    { name: "Gallery", link: "/gallery" },
    { name: "Events", link: "/events" },
    { name: "Community", link: "/community", subLinks: ["Advisories", "Executive Committee"] },
    { name: "Features", link: "/features" },
    { name: "About Us", link: "/about" },
  ];

  if (user && !isAdmin) {
    Links.push({ name: "Profile", link: "/profile" });
  }

  if (!isAdminLoading && isAdmin) {
    Links.push({ name: "Dashboard", link: "/dashboard" });
  }

  return (
    <div className='shadow-sm w-full border-b-[1px] bg-white'>
      <Container>
        <div className='lg:flex items-center justify-between bg-white py-1 lg:px-10 px-6'>
          <div className='font-bold text-2xl cursor-pointer flex items-center py-2'>
            <Link to='/' >
              <LazyLoadImage effect="blur" loading='lazy' src={logo} width={200} alt="" />
            </Link>
          </div>

          <div onClick={() => setOpen(!open)}
            className='text-3xl absolute right-8 top-5 cursor-pointer lg:hidden bg-white'>
            {open ? <BiXCircle /> : <BiMenu />}
          </div>

          <ul className={`lg:flex lg:items-center pb-6 lg:pb-0 absolute lg:static bg-white lg:z-auto z-10 left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'left- opacity-100' : 'left-[-490px]'} lg:opacity-100 opacity-0`}>
            {
              Links.map((link, index) => (
                <li key={index} className='lg:mr-5 text-lg my-4 lg:my-0 nav bg-white group'>
                  {link.name === 'Community' ? (
                    <div
                      onMouseEnter={() => setShowCommunitySubLinks(true)}
                      onMouseLeave={() => setShowCommunitySubLinks(false)}
                      className='hover:text-[#59BB4D] duration-500 font-semibold cursor-pointer'
                      onClick={handleClose}
                    >
                      {link.name}
                      {showCommunitySubLinks && (
                        <div className='pt-20 space-y-2 flex items-center absolute z-20 w-full'>
                          <div className="absolute top-1 hidden group-hover:lg:block hover:lg:block shadow-2xl">
                            <div className="py-3">
                              <div className="w-4 h-4 left-3  absolute mt-1 bg-white border-l border-t border-[#59BB4D] rotate-45"></div>
                            </div>
                            <div className="bg-white p-3 border-t border-[#59BB4D]">
                              {link.subLinks.map((subLink, idx) => (
                                <NavLink
                                  key={idx}
                                  to={`${link.link}/${subLink.toLowerCase().replace(/\s+/g, '-')}`}
                                  onClick={handleClose}
                                  className='block space-y-2 text-gray-600 hover:text-[#59BB4D] text-base'
                                >
                                  ●  {subLink}
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* medium to small device */}
                      <div className='lg:hidden space-y-3 mt-3 ml-5 pl-2 border-l-[0.5px] border-[#0f170e] '>
                        {link.subLinks.map((subLink, idx) => (
                          <NavLink
                            key={idx}
                            to={`${link.link}/${subLink.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={handleClose}
                            className='block space-y-2 text-gray-600 hover:text-[#59BB4D] text-base'
                          >
                            ●  {subLink}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink to={link.link} className='hover:text-[#59BB4D] duration-500 font-semibold' onClick={handleClose}>
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))
            }
            <Button />
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
