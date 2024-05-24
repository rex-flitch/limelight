import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BottomSection from '../components/BottomSection'

const FAQQUERY = gql`
    query GetFAQ {
        faq {
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
          ratesFaqSecurities {
            data {
              id
              attributes {
                Icon {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                Title
                Description
                FAQ {
                  id
                  Title
                  Description
                }
              }
            }
          }
    }
`
export default function Faq() {
    const { loading, error, data } = useQuery(FAQQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            <div className='sub-banner' style={{backgroundImage: `url(${data.faq.data.attributes.TopSection.BackgroundImage.data.attributes.url})`}}>
                
            </div>
            <div className='gradient-border'></div>
            <div className='container mg-top-50'>
                <div className='breadcrumbs'><Link to='/'>Home</Link> / <Link to='/about'>About</Link> / {data.faq.data.attributes.TopSection.PageTitle}</div>
                <div className='flex col-2'>
                    <div className='pageTitle'><h1>{data.faq.data.attributes.TopSection.PageTitle}</h1></div>
                    <div className='titleButtons'>
                        {data.faq.data.attributes.TopSection.Button1Title !== null &&
                            <div className='btn-orange'><Link to={data.faq.data.attributes.TopSection.Button1URL}>{data.faq.data.attributes.TopSection.Button1Title}</Link></div>
                        }
                        {data.faq.data.attributes.TopSection.Button2Title !== null &&
                            <div className='btn-orange'><Link to={data.faq.data.attributes.TopSection.Button2URL}>{data.faq.data.attributes.TopSection.Button2Title}</Link></div>
                        }
                    </div>
                </div>
                <div className='top-section-main flex mg-top-50'>
                    <div className='content'>
                        <h2>{data.faq.data.attributes.TopSection.SubHeader}</h2>
                        <div><BlocksRenderer content={data.faq.data.attributes.TopSection.Description} /></div>
                        {data.ratesFaqSecurities.data.map((entry) => (
                            <div>
                            {entry.attributes.Title === 'FAQs' &&
                                <div>
                                    {entry.attributes.FAQ.map((faq) => (
                                        <div key={faq.id}>
                                            <details>
                                                <summary>{faq.Title}</summary>
                                                <div className='answer'><BlocksRenderer content={faq.Description} /></div>
                                            </details>
                                        </div>
                                    ))}
                                </div>
                            }
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className='box-cta'>
                            <img src={data.faq.data.attributes.TopSection.SideCTAImage.data.attributes.url} alt={data.faq.data.attributes.TopSection.SideCTAImage.data.attributes.url} />
                            <div className='box-content'>
                                <h3 className='orange'>{data.faq.data.attributes.TopSection.SideCTATitle}</h3>
                                <p>{data.faq.data.attributes.TopSection.SideCTADescription}</p>
                                <div className='btn-green'><Link to={data.faq.data.attributes.TopSection.SideCTAButtonURL}>{data.faq.data.attributes.TopSection.SideCTAButtonTitle}</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSection />
      </main>
    )
}
