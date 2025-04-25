import { similarCompanies } from '../../data/CompanyData'
import CompanyCard from './CompanyCard'

const SimilarCompanies = () => {
  return (
    <div className='w-1/4'>
    <div className="text-xl font-semibold mb-5">
      Similiar Companies
    </div>
    <div className="flex flex-col flex-wrap gap-5">
      {similarCompanies.map((company, index) => index < 10 &&
        <CompanyCard key={index} {...company} />
      )}
    </div>
  </div>
  )
}

export default SimilarCompanies