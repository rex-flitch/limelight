import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const FOOTERQUERY = gql`
    query GetFooter {
        siteSettings {
            data {
              attributes {
                Logo {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                PhoneNumber
                RoutingNumber
                Facebook
                Twitter
                LinkedIn
                Instagram
              }
            }
          }
    }
`

export default function SiteFooter() {

    const { loading, error, data } = useQuery(FOOTERQUERY)

    if (loading) return <p></p>
    if (error) return <p>Error :(</p>

    console.log(data)

  return (
    <footer className='site-footer'>
        <div className='gradient-border-large'></div>
        <div className='container'>
            <ul className='footer-top-links'>
                <li><Link to="">Sitemap</Link></li>
                <li><Link to={`tel:${data.siteSettings.data[0].attributes.PhoneNumber}`}>{data.siteSettings.data[0].attributes.PhoneNumber}</Link></li>
                <li><Link to="">Website Accessibility</Link></li>
            </ul>
            <ul className='footer-social'>
                <li className='footer-logo'><img src={data.siteSettings.data[0].attributes.Logo.data.attributes.url} alt={data.siteSettings.data[0].attributes.Logo.data.attributes.alternativeText} /></li>
                {data.siteSettings.data[0].attributes.Facebook !== null &&
                    <li><Link to={data.siteSettings.data[0].attributes.Facebook}><img src='https://res.cloudinary.com/limelightbank/image/upload/v1715618523/fb_ec0cc5faa1.png' alt='Facebook Icon' /></Link></li>
                }
                {data.siteSettings.data[0].attributes.Twitter !== null &&
                    <li><Link to={data.siteSettings.data[0].attributes.Twitter}><img src='https://res.cloudinary.com/limelightbank/image/upload/v1715619127/tw_3f5b4475ac.png' alt='Twitter Icon' /></Link></li>
                }
                {data.siteSettings.data[0].attributes.LinkedIn !== null &&
                    <li><Link to={data.siteSettings.data[0].attributes.LinkedIn}><img src='https://res.cloudinary.com/limelightbank/image/upload/v1715619207/li_55a3948efe.png' alt='LinkedIn Icon' /></Link></li>
                }
                {data.siteSettings.data[0].attributes.Instagram !== null &&
                    <li><Link to={data.siteSettings.data[0].attributes.Instagram}><img src='https://res.cloudinary.com/limelightbank/image/upload/v1715619207/li_55a3948efe.png' alt='Instagram Icon' /></Link></li>
                }
            </ul>
            <div>Routing & Transit Number: {data.siteSettings.data[0].attributes.RoutingNumber}</div>
            <div className='copyright'>Copyright &copy; 2024 Limelight Bank. All rights reserved</div>
            <div className='equal'><Link to="https://www.fdic.gov/"><img src='https://res.cloudinary.com/limelightbank/image/upload/v1719415668/Equal_Housing_Lender_bcad51c65f.svg' alt='Equal Housing Lender Logo' /></Link></div>
        </div>
    </footer>
  )
}