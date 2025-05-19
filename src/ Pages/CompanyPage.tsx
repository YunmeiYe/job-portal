import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import Company from "../components/CompanyProfile/Company";
import SimilarCompanies from "../components/CompanyProfile/SimilarCompanies";
import AccentButton from "../components/AccentButton";

const CompanyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] p-4">
      <AccentButton onClick={() => navigate(-1)} my="md" leftSection={<IconArrowLeft size={20} />} variant="light">Back</AccentButton>
      <div className="flex justify-between gap-5">
        <Company />
        <SimilarCompanies />
      </div>
    </div>
  )
}

export default CompanyPage