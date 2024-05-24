import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BottomSection from '../components/BottomSection'

const RATESQUERY = gql`
    query GetRates {
        pagerate {
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
          rates {
            data {
              id
              attributes {
                Product
                Rate
                Terms
              }
            }
          }
    }
`
export default function Rates() {
    const { loading, error, data } = useQuery(RATESQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            <div className='sub-banner' style={{backgroundImage: `url(${data.pagerate.data.attributes.TopSection.BackgroundImage.data.attributes.url})`}}>
                
            </div>
            <div className='gradient-border'></div>
            <div className='container mg-top-50'>
                <div className='breadcrumbs'><Link to='/'>Home</Link> / <Link to='/services'>Services</Link> / {data.pagerate.data.attributes.TopSection.PageTitle}</div>
                <div className='flex col-2-30-70'>
                    <div className='pageTitle'><h1>{data.pagerate.data.attributes.TopSection.PageTitle}</h1></div>
                    <div className='titleButtons'>
                        {data.pagerate.data.attributes.TopSection.Button1Title !== null &&
                            <div className='btn-orange'><Link to={data.pagerate.data.attributes.TopSection.Button1URL}>{data.pagerate.data.attributes.TopSection.Button1Title}</Link></div>
                        }
                        {data.pagerate.data.attributes.TopSection.Button2Title !== null &&
                            <div className='btn-orange'><Link to={data.pagerate.data.attributes.TopSection.Button2URL}>{data.pagerate.data.attributes.TopSection.Button2Title}</Link></div>
                        }
                        <div className='btn-orange'><Link to='https://apps.apple.com/us/app/ccbankutah-for-ipad/id1511763796?ls=1'>IPAD DOWNLOAD</Link></div>
                    </div>
                </div>
                <div className='top-section-main flex mg-top-50'>
                    <div className='content'>
                        <h2>{data.pagerate.data.attributes.TopSection.SubHeader}</h2>
                        <div><BlocksRenderer content={data.pagerate.data.attributes.TopSection.Description} /></div>
                        <div className='rates-table'>
                            <table>
                                <tr className='tableHeader'>
                                    <th>PRODUCT</th>
                                    <th>RATE</th>
                                    <th>TERMS</th>
                                </tr>
                                
                                {data.rates.data.map((rate) => (
                                    <tr key={rate.id}>
                                        <td>{rate.attributes.Product}</td>
                                        <td>{rate.attributes.Rate}</td>
                                        <td>{rate.attributes.Terms}</td>
                                    </tr>
                                ))}
                                
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className='box-cta'>
                            <img src={data.pagerate.data.attributes.TopSection.SideCTAImage.data.attributes.url} alt={data.pagerate.data.attributes.TopSection.SideCTAImage.data.attributes.url} />
                            <div className='box-content'>
                                <h3 className='orange'>{data.pagerate.data.attributes.TopSection.SideCTATitle}</h3>
                                <p>{data.pagerate.data.attributes.TopSection.SideCTADescription}</p>
                                <div className='btn-green'><Link to={data.pagerate.data.attributes.TopSection.SideCTAButtonURL}>{data.pagerate.data.attributes.TopSection.SideCTAButtonTitle}</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSection />
      </main>
    )
}
