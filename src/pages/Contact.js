import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BottomSection from '../components/BottomSection'

const CONTACTQUERY = gql`
    query GetContact {
        contact {
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
export default function Contact() {
    const { loading, error, data } = useQuery(CONTACTQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            <div className='sub-banner' style={{backgroundImage: `url(${data.contact.data.attributes.TopSection.BackgroundImage.data.attributes.url})`}}>
                
            </div>
            <div className='gradient-border'></div>
            <div className='container mg-top-50'>
                <div className='breadcrumbs'><Link to='/'>Home</Link> / <Link to='/services'>Services</Link> / {data.contact.data.attributes.TopSection.PageTitle}</div>
                <div className='flex col-2'>
                    <div className='pageTitle'><h1>{data.contact.data.attributes.TopSection.PageTitle}</h1></div>
                    <div className='titleButtons'>
                        {data.contact.data.attributes.TopSection.Button1Title !== null &&
                            <div className='btn-orange'><Link to={data.contact.data.attributes.TopSection.Button1URL}>{data.contact.data.attributes.TopSection.Button1Title}</Link></div>
                        }
                        {data.contact.data.attributes.TopSection.Button2Title !== null &&
                            <div className='btn-orange'><Link to={data.contact.data.attributes.TopSection.Button2URL}>{data.contact.data.attributes.TopSection.Button2Title}</Link></div>
                        }
                    </div>
                </div>
                <div className='top-section-main flex mg-top-50'>
                    <div className='content'>
                        <h2>{data.contact.data.attributes.TopSection.SubHeader}</h2>
                        <div><BlocksRenderer content={data.contact.data.attributes.TopSection.Description} /></div>
                    </div>
                    <div>
                        <div className='box-cta'>
                            <img src={data.contact.data.attributes.TopSection.SideCTAImage.data.attributes.url} alt={data.contact.data.attributes.TopSection.SideCTAImage.data.attributes.url} />
                            <div className='box-content'>
                                <h3 className='orange'>{data.contact.data.attributes.TopSection.SideCTATitle}</h3>
                                <p>{data.contact.data.attributes.TopSection.SideCTADescription}</p>
                                <div className='btn-green'><Link to={data.contact.data.attributes.TopSection.SideCTAButtonURL}>{data.contact.data.attributes.TopSection.SideCTAButtonTitle}</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSection />
      </main>
    )
}
