import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const MOBILEMENU = gql`
query getMobileMenu {
    mainNavigations {
        data {
          id
          attributes {
            LinkTitle
            LinkURL
            dropdown_navigations {
              data {
                id
                attributes {
                  LinkTitle
                  LinkURL
                }
              }
            }
          }
        }
      }
}
`

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
//   const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const toggleSubmenu = (submenuId) => {
    if (openSubmenu === submenuId) {
      setOpenSubmenu(null); // Close the submenu if it's already open
    } else {
      setOpenSubmenu(submenuId); // Open the clicked submenu
    }
  };

  const backToMain = () => {
    setOpenSubmenu(null); // Go back to the main menu
  };
  const Submenu = ({ isOpen, children, onBack, onClose }) => {
    return (
      <div className={`submenu ${isOpen ? 'open' : ''}`}>
        <button onClick={onBack} className="back-btn">&larr; Back</button>
        {children}
      </div>
    );
  };
  const { loading, error, data } = useQuery(MOBILEMENU)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  let counter = 0
//   const resetcounter = () => {
//     counter = 0
//   }
  const addcounter = () => {
    counter = counter + 1
  }
  //console.log(data)

  return (
    <nav className="mobile-menu">
        <div className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
        <button  onClick={() => setIsOpen(!isOpen)} className="close-btn">X</button>
          <ul className='top-level'>
            {data.mainNavigations.data.map((nav) => (
              <div>

                {nav.attributes.dropdown_navigations.data.length !== 0 && 
                    <li key={nav.id} className='top-level-li'><Link aria-haspopup="true" className='top-level-link right-arrow' to={nav.attributes.LinkURL} onClick={() => toggleSubmenu(nav.id)}>{nav.attributes.LinkTitle}</Link>
                        <Submenu  isOpen={openSubmenu === nav.id}
                        onBack={backToMain}>
                            <div className='subdropdown'>
                                
                                <ul className='dropdown'>
                                    <li><Link to={nav.attributes.LinkURL} onClick={() => setIsOpen(!isOpen)}>{nav.attributes.LinkTitle}</Link></li>
                                    {nav.attributes.dropdown_navigations.data.map((dropdown) => (
                                        <li key={dropdown.id}><Link to={dropdown.attributes.LinkURL} onClick={() => setIsOpen(!isOpen)}>{dropdown.attributes.LinkTitle}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </Submenu>
                        {addcounter()}
                    </li>
                }
                {nav.attributes.dropdown_navigations.data.length === 0 && 
                    <li key={nav.id} className='top-level-li'><Link aria-haspopup="true" className='top-level-link right-arrow' to={nav.attributes.LinkURL} onClick={() => setIsOpen(!isOpen)}>{nav.attributes.LinkTitle}</Link>
                        {addcounter()}
                    </li>
                }
            </div>
                
            ))}
            <li className='top-level-li'><Link className='top-level-link' to="https://forms.fivision.com/ccbank/oa2/default.aspx" onClick={() => setIsOpen(!isOpen)}>OPEN AN ACCOUNT</Link></li>
            <li className='top-level-li'><Link className='top-level-link' to="https://cibng.ibanking-services.com/eAM/Credential/Index?%20FIORG=18U&orgId=18U_124302927&FIFID=124302927&brand=18U_124302927&appId=ceb" onClick={() => setIsOpen(!isOpen)}>LOGIN</Link></li>
            <li className='top-level-li'><Link className='top-level-link' to="https://b124302927.flex.online-banking-services.com/cuFlexEnrollment/#!/selfEnrollment/home" onClick={() => setIsOpen(!isOpen)}>ENROLL NOW</Link></li>
          </ul>
        </div>
    </nav>
  )
}
