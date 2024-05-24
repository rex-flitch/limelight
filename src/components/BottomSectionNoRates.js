import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const BOTTOMQUERY = gql`
    query GetBottom {
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
          cdCertificatesOfDeposit {
            data {
              attributes {
                BottomSection {
                  Icon {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  Title
                  Text
                }
              }
            }
          }
          about {
            data {
              attributes {
                BottomSection {
                  Icon {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  Title
                  Text
                }
              }
            }
          }
          resource {
            data {
              attributes {
                BottomSection {
                  Icon {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  Title
                  Text
                }
              }
            }
          }
          service {
            data {
              attributes {
                BottomSection {
                  Icon {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  Title
                  Text
                }
              }
            }
          }
    }
`
export default function BottomSection() {
    const { loading, error, data } = useQuery(BOTTOMQUERY)
    const [activeId, setActiveId] = useState(null)
    const uri = window.location.pathname
    console.log(uri) // Outputs the URI part of the URL

    useEffect(() => {
        if (data && data.ratesFaqSecurities && data.ratesFaqSecurities.data.length > 0) {
            // Set the first entry as active by default
            setActiveId(data.ratesFaqSecurities.data[1].id);
          }
      }, [data]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
      <div className='bottomSectionContainer'>
          <div className='container'>
            <div className='bottomSectionClick'>
                <div className='clickSection'>

                {data.ratesFaqSecurities.data.map((entry) => {
                  if (entry.attributes.Title !== 'Rates') {
                    return (
                      <div key={entry.id}>
                        <span>
                          <h3 onClick={() => setActiveId(entry.id)}
                              className={activeId === entry.id ? 'active' : ''}
                          >
                          {entry.attributes.Icon.data && entry.attributes.Icon.data.attributes.url &&
                              <img src={entry.attributes.Icon.data.attributes.url} alt="Icon" />}
                          <br />
                          {entry.attributes.Title}
                          </h3>
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
                    
                </div>
            </div>
            </div>
            <div className='bottomSectionGrad'></div>
            <div className='bottomSection'>
              <div className='container'>
                {data.ratesFaqSecurities.data.map((entry) => {
                  if (activeId === entry.id) {
                    if (entry.attributes.Title !== 'Rates') {
                      return (
                        <div key={`desc-${entry.id}`}>
                          <div>
                            {entry.attributes.Description && <BlocksRenderer content={entry.attributes.Description} />}
                          </div>
                          {entry.attributes.Title === 'Rates' && (
                            <div className='rates-table'>
                              <table>
                                <thead>
                                  <tr className='tableHeader'>
                                    <th>PRODUCT</th>
                                    <th>RATE</th>
                                    <th>TERMS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.rates.data.map((rate) => (
                                    <tr key={rate.id}>
                                      <td>{rate.attributes.Product}</td>
                                      <td>{rate.attributes.Rate}</td>
                                      <td>{rate.attributes.Terms}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                          {entry.attributes.Title === 'FAQs' && (
                            <div>
                              {entry.attributes.FAQ.map((faq) => (
                                <div key={faq.id}>
                                  <details>
                                    <summary>{faq.Title}</summary>
                                    <div className='answer'>
                                      <BlocksRenderer content={faq.Description} />
                                    </div>
                                  </details>
                                </div>
                              ))}
                            </div>
                          )}
                          {entry.attributes.Title === 'Mobile Banking' && (
                            <div className='flex'>
                              <div><Link to='https://play.google.com/store/apps/details?id=com.mfoundry.mb.android.mb_18u'><img src='https://res.cloudinary.com/limelightbank/image/upload/v1716588906/footer_apps_google_46793bd5b3.png' alt='Get it on Google Play' /></Link></div>
                              <div><Link to='https://apps.apple.com/us/app/ccbankutah/id1511763497?ls=1'><img src='https://res.cloudinary.com/limelightbank/image/upload/v1716588930/footer_apps_apple_a47bd1d0f9.png' alt='Download on the App Store' /></Link></div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </div>

            
            {uri.includes('certificates-of-deposit') &&
            <div className='mobileBankingSection container'>
              <div className='flexRight'>
              <div className='pd-right-10'><img src={data.cdCertificatesOfDeposit.data.attributes.BottomSection.Icon.data.attributes.url} alt={data.cdCertificatesOfDeposit.data.attributes.BottomSection.Icon.data.attributes.alternativeText} /></div>
                <div><h3>{parse(data.cdCertificatesOfDeposit.data.attributes.BottomSection.Title)}</h3></div>
              </div>
              <div className='leftBorder'>
                <div className='bottomRightSection'><BlocksRenderer content={data.cdCertificatesOfDeposit.data.attributes.BottomSection.Text} /></div>
              </div>
            </div>
            }
            {uri.includes('about') &&
            <div className='mobileBankingSection container'>
              <div className='flexRight'>
                <div className='pd-right-10'><img src={data.about.data.attributes.BottomSection.Icon.data.attributes.url} alt={data.about.data.attributes.BottomSection.Icon.data.attributes.alternativeText} /></div>
                <div><h3>{parse(data.about.data.attributes.BottomSection.Title)}</h3></div>
              </div>
              <div className='leftBorder'>
                <div className='bottomRightSection'><BlocksRenderer content={data.about.data.attributes.BottomSection.Text} /></div>
              </div>
            </div>
            }
            {uri.includes('resources') &&
            <div className='mobileBankingSection container'>
              <div className='flexRight'>
                <div className='pd-right-10'><img src={data.resource.data.attributes.BottomSection.Icon.data.attributes.url} alt={data.resource.data.attributes.BottomSection.Icon.data.attributes.alternativeText} /></div>
                <div><h3>{parse(data.resource.data.attributes.BottomSection.Title)}</h3></div>
              </div>
              <div className='leftBorder'>
                <div className='bottomRightSection'><BlocksRenderer content={data.resource.data.attributes.BottomSection.Text} /></div>
              </div>
            </div>
            }
            {uri.includes('services') &&
            <div className='mobileBankingSection container'>
              <div className='flexRight'>
                <div className='pd-right-10'><img src={data.service.data.attributes.BottomSection.Icon.data.attributes.url} alt={data.service.data.attributes.BottomSection.Icon.data.attributes.alternativeText} /></div>
                <div><h3>{parse(data.service.data.attributes.BottomSection.Title)}</h3></div>
              </div>
              <div className='leftBorder'>
                <div className='bottomRightSection'><BlocksRenderer content={data.service.data.attributes.BottomSection.Text} /></div>
              </div>
            </div>
            }
            
            <div className='apy'>*Annual Percentage Yield (APY). Fees could reduce earnings on the account. An early withdrawal penalty may apply.</div>
            <div className='contactUsToday'>
              <div className='contactUsFlex mg-auto max-800'>
                <div><h3>CONTACT US TODAY</h3></div>
                <div className='btn-white'><Link to='tel:18006396015'>1-800-639-6015</Link></div>
                <div className='btn-white'><Link to='mailto:customercare@limelightbank.com'>EMAIL US</Link></div>
              </div>
            </div>
          </div>
          
    )
}
