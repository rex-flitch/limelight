import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import MobileMenu from './MobileMenu'

const HEADERQUERY = gql`
    query GetHeader {
        topNavigations {
            data {
              id
              attributes {
                LinkTitle
                LinkURL
              }
            }
          }
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

export default function SiteHeader() {
    const { loading, error, data } = useQuery(HEADERQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div className='site-header'>
        <div className='top-nav-bar'>
            <div className='container flex-end'>
                <ul>
                {data.topNavigations.data.map((top) => (
                    <li key={top.id}><Link to={top.attributes.LinkURL}>{top.attributes.LinkTitle}</Link></li>
                ))}
                </ul>
            </div>
        </div>
        <div className='main-nav-bar'>
            <div className='container flex-nav'>
                <div className='logo'><Link to="/"><img src="https://res.cloudinary.com/limelightbank/image/upload/v1715619127/LIMELIGHT_POWERED_BY_CCBANK_LOGO_6cf026a241.png" alt="Limelight Logo" /></Link></div>
                <nav className='main-nav'>
                    <ul>
                    {data.mainNavigations.data.map((main) => (
                        <li key={main.id} className='reg-link'><Link to={main.attributes.LinkURL}>{main.attributes.LinkTitle}</Link>
                        {main.attributes.dropdown_navigations.data.length !== 0 && 
                            <ul className='dropdown'>
                                {main.attributes.dropdown_navigations.data.map((dropdown) => (
                                    <li key={dropdown.id}><Link to={dropdown.attributes.LinkURL}>{dropdown.attributes.LinkTitle}</Link></li>
                                ))}
                            </ul>
                        }
                        </li>
                    ))}
                        <li className='btn-orange'><Link to="/">OPEN AN ACCOUNT</Link></li>
                        <li className='btn-ghost-green'><Link to="/"><i className="glyphicon fa-lock fas" aria-hidden="true"></i> LOGIN</Link></li>
                        <li className='btn-ghost-orange'><Link to="/">ENROLL NOW</Link></li>
                    </ul>
                </nav>
                <MobileMenu />
            </div>
        </div>
    </div>
  )
}
