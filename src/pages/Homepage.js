import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import parse from 'html-react-parser'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const HOMEPAGEQUERY = gql`
    query GetHomepage {
      homepage {
        data {
          id
          attributes {
            Title
            Description
            Hero {
              id
              Title
              Description
              ButtonURL
              ButtonTitle
              Background {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
            RatesButton {
              ButtonURL
              ButtonTitle
            }
            HomepageAccess {
              Title
              Description
              ButtonURL
              ButtonTitle
              Image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
            FeaturedBenefits
            BenefitsDescription
            IconCTA {
              id
              Title
              Description
              Image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
            }
            HomepagePictures {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            QuoteTitle
            Quote
            QuotePerson
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
export default function Homepage() {
    const { loading, error, data } = useQuery(HOMEPAGEQUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            <div className='hero-banner banner-slider'>
            {data.homepage.data.attributes.Hero.map((hero) => (
                <div key={hero.id} className='hero' id={`hero-id-${hero.id}`} style={{backgroundImage: `url(${hero.Background.data.attributes.url})`}}>
                    <div className='grad-overlay'></div>
                    <div className='inner-container'>
                        <div className='login-container'></div>
                        <div className='inner-hero'>
                            <h1>{hero.Title}</h1>
                            {hero.Description !== null &&
                                <p><BlocksRenderer content={hero.Description} /></p>
                            }
                            {hero.ButtonTitle !== null &&
                                <div className='btn-ghost-white'><Link to={hero.ButtonURL}>{hero.ButtonTitle}</Link></div>
                            }
                        </div>
                    </div>
                </div>
            ))}
            <div className='gradient-border'></div>
            </div>
            <div className='rates bk-lightgrey'>
                <div className='container flex'>
                    {data.rates.data.map((rate) => (
                    <div key={rate.id} className='rate'>
                        <h4 className='dark-green'>{rate.attributes.Product}</h4>
                        <h2 className='orange'>{rate.attributes.Rate}</h2>
                    </div>
                    ))}
                </div>
            </div>
            <div className='rates-button-container'>
                <div className='rates-button'><Link to={data.homepage.data.attributes.RatesButton.ButtonURL}>{data.homepage.data.attributes.RatesButton.ButtonTitle}</Link></div>
            </div>
            <div className='container center mg-top-50 mg-bottom-50'>
                <h2>{data.homepage.data.attributes.Title}</h2>
                <p><BlocksRenderer content={data.homepage.data.attributes.Description} /></p>
            </div>
            <div className='access bk-lightgrey pd-top-50 pd-bottom-50'>
                <div className='container flex-center col-2'>
                    <div className='text pd-right-50'>
                        <h2>{data.homepage.data.attributes.HomepageAccess.Title}</h2>
                        <p><BlocksRenderer content={data.homepage.data.attributes.HomepageAccess.Description} /></p>
                        <div className='btn-ghost-orange'><Link to={data.homepage.data.attributes.HomepageAccess.ButtonURL}>{data.homepage.data.attributes.HomepageAccess.ButtonTitle}</Link></div>
                    </div>
                    <div className='images'><img src={data.homepage.data.attributes.HomepageAccess.Image.data.attributes.url} alt={data.homepage.data.attributes.HomepageAccess.Image.data.attributes.alternativeText} /></div>
                </div>
            </div>
            <div className='container center mg-top-50 mg-bottom-50'>
              <h2>{data.homepage.data.attributes.FeaturedBenefits}</h2>
              <p className='max-800 mg-auto'>{data.homepage.data.attributes.BenefitsDescription}</p>
              <div className='flex-justify-center gap-50 mg-top-50'>
                {data.homepage.data.attributes.IconCTA.map((iconcta) => (
                <div key={iconcta.id} className='icon-cta'>
                    <img src={iconcta.Image.data.attributes.url} alt={iconcta.Image.data.attributes.alternativeText} />
                    <h3 className='dark-green'>{iconcta.Title}</h3>
                    <div><BlocksRenderer content={iconcta.Description} /></div>
                </div>
                ))}
              </div>
            </div>
            <div className='homepage-images flex'>
              {data.homepage.data.attributes.HomepagePictures.data.map((pictures) => (
                <div className='mg-bottom-6'><img className='img-auto' src={pictures.attributes.url} alt={pictures.attributes.alternativeText} /></div>
              ))}
            </div>
            <div className='gradient-border'></div>
            <div className='container center mg-top-50 flex'>
              <div><img className='img-height-auto' src='https://res.cloudinary.com/limelightbank/image/upload/v1715618950/homepage_brand_statement_quote_cd10b23b1c.png' alt='quote' /></div>
              <div>
                <h2>{data.homepage.data.attributes.QuoteTitle}</h2>
                <p className='quote-text max-1000 mg-auto'>{data.homepage.data.attributes.Quote}</p>
                <p className='quote-name'>{data.homepage.data.attributes.QuotePerson}</p>
              </div>
              <div className='flex-self-end'><img src='https://res.cloudinary.com/limelightbank/image/upload/v1715618950/homepage_brand_statement_quote_rght_510483c5e0.png' alt='quote' /></div>
            </div>
      </main>
    )
}
