import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import parse from 'html-react-parser'


const TERMSANDCONDITIONQUERY = gql`
    query GetPrivacy {
        termsAndCondition {
            data {
              attributes {
                    TermsDownloadLinkTitle
                    TermsDownloadLinkURL
                    TermsAndConditionsYourAccount
                    ElectronicFundsTransfer
                    ImportantInformation
                    LimelightBankSection
                    DisclosureFees {
                        id
                        FirstColumn
                        SecondColumn
                    }
                    Facts {
                        id
                        FirstColumn
                        SecondColumn
                    }
                    ReasonsCanShare {
                        id
                        FirstColumn
                        SecondColumn
                        ThirdColumn
                    }
                    PersonalInformation {
                        id
                        FirstColumn
                        SecondColumn
                    }
                    Definitions {
                        id
                        FirstColumn
                        SecondColumn
                    }
                    OtherImportantInformation
                }
            }
          } 
    }
`
export default function TermsAndConditions() {
    const { loading, error, data } = useQuery(TERMSANDCONDITIONQUERY)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

    return (
        <main className='wrapper' id='main' tabIndex="-1">
            
            <div className='container mg-top-50'>
                <div className='btn-orange'><Link to={data.termsAndCondition.data.attributes.TermsDownloadLinkURL}>{data.termsAndCondition.data.attributes.TermsDownloadLinkTitle}</Link></div>
                <div>
                    {parse(data.termsAndCondition.data.attributes.TermsAndConditionsYourAccount)}
                </div>
                <div className='mg-top-50'>
                    {parse(data.termsAndCondition.data.attributes.ElectronicFundsTransfer)}
                </div>
                <div className='mg-top-50'>
                    {parse(data.termsAndCondition.data.attributes.ImportantInformation)}
                </div>
                <div className='mg-top-50'>
                    {parse(data.termsAndCondition.data.attributes.LimelightBankSection)}
                </div>
                <h3 className='mg-top-50'>Disclosure of Fees for Deposit Accounts</h3>
                <div className='rates-table'>
                    <table>
                    {data.termsAndCondition.data.attributes.DisclosureFees.map((fees) => (
                    <tr key={fees.id} className='rate'>
                        <td>{parse(fees.FirstColumn)}</td>
                        <td>{parse(fees.SecondColumn)}</td>
                    </tr>
                    ))}
                    </table>
                </div>
                <div className='facts-table mg-top-50'>
                    <table>
                    {data.termsAndCondition.data.attributes.Facts.map((fact) => (
                    <tr key={fact.id} className='rate'>
                        <td>{parse(fact.FirstColumn)}</td>
                        <td>{parse(fact.SecondColumn)}</td>
                    </tr>
                    ))}
                    </table>
                </div>
                <div className='rates-table mg-top-50'>
                    <table>
                    {data.termsAndCondition.data.attributes.ReasonsCanShare.map((reasons, index) => (
                        <tr key={reasons.id} className='rate'>
                        {index === 0 ? (
                            <>
                            <th>{parse(reasons.FirstColumn)}</th>
                            <th>{parse(reasons.SecondColumn)}</th>
                            <th>{parse(reasons.ThirdColumn)}</th>
                            </>
                        ) : (
                            <>
                            <td>{parse(reasons.FirstColumn)}</td>
                            <td>{parse(reasons.SecondColumn)}</td>
                            <td>{parse(reasons.ThirdColumn)}</td>
                            </>
                        )}
                        </tr>
                    ))}
                    </table>

                </div>
                <h3 className='mg-top-50'>What We Do With Your Personal Information</h3>
                <div className='rates-table'>
                    <table>
                    {data.termsAndCondition.data.attributes.PersonalInformation.map((fees) => (
                    <tr key={fees.id} className='rate'>
                        <td>{parse(fees.FirstColumn)}</td>
                        <td>{parse(fees.SecondColumn)}</td>
                    </tr>
                    ))}
                    </table>
                </div>
                <h3 className='mg-top-50'>Definitions</h3>
                <div className='rates-table'>
                    <table>
                    {data.termsAndCondition.data.attributes.Definitions.map((fees) => (
                    <tr key={fees.id} className='rate'>
                        <td>{parse(fees.FirstColumn)}</td>
                        <td>{parse(fees.SecondColumn)}</td>
                    </tr>
                    ))}
                    </table>
                </div>
                <div className='mg-top-50 mg-bottom-50'>
                    {parse(data.termsAndCondition.data.attributes.OtherImportantInformation)}
                </div>
            </div>
      </main>
    )
}
