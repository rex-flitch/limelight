import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BottomSection from '../components/BottomSection'

const ACCESSIBILITYQUERY = gql`
    query GetPrivacy {
        websiteAccessibility {
            data {
              attributes {
                TopSection {
                  PageTitle
                  Description
                  Button1URL
                  Button1Title
                  Button2URL
                  Button2Title
                  SubHeader
                  SideCTAImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  SideCTATitle
                  SideCTADescription
                  SideCTAButtonURL
                  SideCTAButtonTitle
                  BackgroundImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                }
              }
            }
          } 
    }
`
export default function WebAccessibility() {
    const { loading, error, data } = useQuery(ACCESSIBILITYQUERY)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            <div className='sub-banner' style={{backgroundImage: `url(${data.websiteAccessibility.data.attributes.TopSection.BackgroundImage.data.attributes.url})`}}>
                
            </div>
            <div className='gradient-border'></div>
            <div className='container mg-top-50'>
                <div className='breadcrumbs'><Link to='/'>Home</Link> / <Link to='/about'>About</Link> / {data.websiteAccessibility.data.attributes.TopSection.PageTitle}</div>
                <div className='flex col-2'>
                    <div className='pageTitle'><h1>{data.websiteAccessibility.data.attributes.TopSection.PageTitle}</h1></div>
                    <div className='titleButtons'>
                        {data.websiteAccessibility.data.attributes.TopSection.Button1Title !== null &&
                            <div className='btn-orange'><Link to={data.websiteAccessibility.data.attributes.TopSection.Button1URL}>{data.websiteAccessibility.data.attributes.TopSection.Button1Title}</Link></div>
                        }
                        {data.websiteAccessibility.data.attributes.TopSection.Button2Title !== null &&
                            <div className='btn-orange'><Link to={data.websiteAccessibility.data.attributes.TopSection.Button2URL}>{data.websiteAccessibility.data.attributes.TopSection.Button2Title}</Link></div>
                        }
                    </div>
                </div>
                <div className='top-section-main flex mg-top-50'>
                    <div className='content'>
                        <h2>{data.websiteAccessibility.data.attributes.TopSection.SubHeader}</h2>
                        <div><BlocksRenderer content={data.websiteAccessibility.data.attributes.TopSection.Description} /></div>
                    </div>
                    <div>
                        <div className='box-cta'>
                            <img src={data.websiteAccessibility.data.attributes.TopSection.SideCTAImage.data.attributes.url} alt={data.websiteAccessibility.data.attributes.TopSection.SideCTAImage.data.attributes.url} />
                            <div className='box-content'>
                                <h3 className='orange'>{data.websiteAccessibility.data.attributes.TopSection.SideCTATitle}</h3>
                                <p>{data.websiteAccessibility.data.attributes.TopSection.SideCTADescription}</p>
                                <div className='btn-green'><Link to={data.websiteAccessibility.data.attributes.TopSection.SideCTAButtonURL}>{data.websiteAccessibility.data.attributes.TopSection.SideCTAButtonTitle}</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSection />
      </main>
    )
}
