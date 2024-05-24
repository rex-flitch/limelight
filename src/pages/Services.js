import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BottomSection from '../components/BottomSection'

const SERVICESQUERY = gql`
    query GetServices {
        service {
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
export default function Services() {
    const { loading, error, data } = useQuery(SERVICESQUERY)
    const [activeId, setActiveId] = useState(null)

    useEffect(() => {
        if (data && data.ratesFaqSecurities && data.ratesFaqSecurities.data.length > 0) {
            // Set the first entry as active by default
            setActiveId(data.ratesFaqSecurities.data[0].id);
          }
      }, [data]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            <div className='sub-banner' style={{backgroundImage: `url(${data.service.data.attributes.TopSection.BackgroundImage.data.attributes.url})`}}>
                
            </div>
            <div className='gradient-border'></div>
            <div className='container mg-top-50'>
                <div className='breadcrumbs'><Link to='/'>Home</Link> / {data.service.data.attributes.TopSection.PageTitle}</div>
                <div className='flex col-2'>
                    <div className='pageTitle'><h1>{data.service.data.attributes.TopSection.PageTitle}</h1></div>
                    <div className='titleButtons'>
                        {data.service.data.attributes.TopSection.Button1Title !== null &&
                            <div className='btn-orange'><Link to={data.service.data.attributes.TopSection.Button1URL}>{data.service.data.attributes.TopSection.Button1Title}</Link></div>
                        }
                        {data.service.data.attributes.TopSection.Button2Title !== null &&
                            <div className='btn-orange'><Link to={data.service.data.attributes.TopSection.Button2URL}>{data.service.data.attributes.TopSection.Button2Title}</Link></div>
                        }
                    </div>
                </div>
                <div className='top-section-main flex mg-top-50'>
                    <div className='content'>
                        <h2>{data.service.data.attributes.TopSection.SubHeader}</h2>
                        <div><BlocksRenderer content={data.service.data.attributes.TopSection.Description} /></div>
                    </div>
                    <div>
                        <div className='box-cta'>
                            <img src={data.service.data.attributes.TopSection.SideCTAImage.data.attributes.url} alt={data.service.data.attributes.TopSection.SideCTAImage.data.attributes.url} />
                            <div className='box-content'>
                                <h3 className='orange'>{data.service.data.attributes.TopSection.SideCTATitle}</h3>
                                <p>{data.service.data.attributes.TopSection.SideCTADescription}</p>
                                <div className='btn-green'><Link to={data.service.data.attributes.TopSection.SideCTAButtonURL}>{data.service.data.attributes.TopSection.SideCTAButtonTitle}</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSection />
      </main>
    )
}
