import { Router, type IRouter } from "express";
import { ListFundingMechanismsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/funding/mechanisms", async (_req, res): Promise<void> => {
  const mechanisms = [
    {
      id: 1,
      name: "Samagra Shiksha (Integrated Education Scheme)",
      type: "government" as const,
      description: "The flagship centrally-sponsored scheme integrating pre-school to senior secondary education. Funds infrastructure, teacher salaries, mid-day meals, uniforms, and quality improvement. Requires state matching contributions (60:40 central:state ratio, 90:10 for NE states).",
      examples: ["School building construction", "Teacher training programs", "ICT infrastructure in schools", "Inclusive education units"],
      scale: "INR 37,000 crore (~$4.5B) annual budget; covers all 1.5 million+ government schools",
      websiteUrl: "https://samagrashiksha.in",
      institutionLinks: [
        { name: "Samagra Shiksha Official Portal", url: "https://samagrashiksha.in" },
        { name: "Ministry of Education, India", url: "https://www.education.gov.in" },
        { name: "NCERT (National Council of Educational Research)", url: "https://ncert.nic.in" },
        { name: "UDISE+ Data Portal", url: "https://udiseplus.gov.in" },
      ],
    },
    {
      id: 2,
      name: "Corporate Social Responsibility (CSR) Mandated Spending",
      type: "csr" as const,
      description: "The Companies Act 2013 mandates 2% of net profits for qualifying companies to be spent on CSR activities. Education is one of the priority areas. CSR funding has grown significantly, reaching INR 26,000 crore ($3.1B) in 2022-23 with education receiving 20-25% of all CSR.",
      examples: ["Tata Trusts school programs", "HDFC Bank Parivartan", "Wipro Foundation", "Microsoft India Education"],
      scale: "INR 5,000-6,500 crore annually dedicated to education via CSR",
      websiteUrl: "https://www.mca.gov.in/content/mca/global/en/acts-rules/ebooks/acts.html",
      institutionLinks: [
        { name: "Tata Trusts", url: "https://www.tatatrusts.org" },
        { name: "HDFC Bank Parivartan (CSR)", url: "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?folderName=/OurCSRActivities" },
        { name: "Wipro Foundation", url: "https://www.wiprofoundation.org" },
        { name: "Microsoft India Education", url: "https://www.microsoft.com/en-in/education" },
        { name: "MCA CSR Portal (Government)", url: "https://www.csr.gov.in" },
      ],
    },
    {
      id: 3,
      name: "Development Impact Bonds (DIBs)",
      type: "impact_bond" as const,
      description: "Outcomes-based financing where private investors fund NGO programs; government or philanthropic outcome funders repay with returns only if verified results are achieved. The Educate Girls DIB was the world's first in education, proving the model. Currently emerging across 3-4 new programs in India.",
      examples: ["Educate Girls DIB (Rajasthan)", "Quality Education India DIB (UP)", "Emerging literacy DIBs"],
      scale: "INR 10-50 crore per DIB; small but growing segment with proof of concept established",
      websiteUrl: "https://www.educategirls.ngo",
      institutionLinks: [
        { name: "Educate Girls (DIB Pioneer)", url: "https://www.educategirls.ngo" },
        { name: "British Asian Trust (DIB Facilitator)", url: "https://www.britishasiantrust.org" },
        { name: "UBS Optimus Foundation (Investor)", url: "https://www.ubs.com/microsites/optimus-foundation/en/home.html" },
        { name: "Social Finance (Impact Bond Adviser)", url: "https://socialfinance.org" },
      ],
    },
    {
      id: 4,
      name: "International Aid and Multilateral Funding",
      type: "international_aid" as const,
      description: "World Bank, UNICEF, DFID/FCDO, USAID, EU, and bilateral donors have funded Indian education programs. As India grew to lower-middle-income status, international bilateral aid has declined but multilateral (World Bank) remains significant for specific programs.",
      examples: ["World Bank Bihar Education Project ($600M)", "UNICEF learning programs", "EU vocational training support", "USAID digital literacy"],
      scale: "INR 2,000-5,000 crore annually from multilateral and bilateral sources",
      websiteUrl: "https://www.worldbank.org/en/country/india",
      institutionLinks: [
        { name: "World Bank – India Education", url: "https://www.worldbank.org/en/country/india/overview" },
        { name: "UNICEF India", url: "https://www.unicef.org/india" },
        { name: "US Foreign Assistance to India", url: "https://foreignassistance.gov/cd/india/" },
        { name: "EU Delegation to India", url: "https://www.eeas.europa.eu/delegations/india_en" },
        { name: "FCDO (UK Foreign Aid)", url: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office" },
      ],
    },
    {
      id: 5,
      name: "Large-Scale Philanthropy",
      type: "ngo" as const,
      description: "Major Indian philanthropists have created endowed foundations specifically for education. Azim Premji Foundation ($2B+ endowment) is the largest. Rohini Nilekani Philanthropies, Tata Trusts, and emerging family foundations like the HCL Foundation contribute significantly.",
      examples: ["Azim Premji Foundation", "Rohini Nilekani Philanthropies", "Tata Trusts Education", "HCL Foundation"],
      scale: "INR 3,000-8,000 crore annually from major Indian philanthropists",
      websiteUrl: "https://azimpremjifoundation.org",
      institutionLinks: [
        { name: "Azim Premji Foundation", url: "https://azimpremjifoundation.org" },
        { name: "Rohini Nilekani Philanthropies", url: "https://rohininilekani.org" },
        { name: "Tata Trusts", url: "https://www.tatatrusts.org" },
        { name: "HCL Foundation", url: "https://www.hclfoundation.org" },
        { name: "GiveIndia", url: "https://www.giveindia.org" },
      ],
    },
    {
      id: 6,
      name: "Community and Village-Level Fundraising",
      type: "mixed" as const,
      description: "Local community mobilization, school management committees (SMCs), and gram panchayats contribute resources for school maintenance, teacher salaries for additional teachers, and learning materials. School Management Committees are mandated by RTE and have community oversight role.",
      examples: ["Gram panchayat contributions to school maintenance", "Community construction of school rooms", "Parent-Teacher Association funds", "Local entrepreneur scholarships"],
      scale: "Highly variable; estimated INR 500-1,500 crore in aggregate community contributions",
      websiteUrl: "https://panchayat.gov.in",
      institutionLinks: [
        { name: "Ministry of Panchayati Raj", url: "https://panchayat.gov.in" },
        { name: "RTE Forum (Civil Society)", url: "https://rteforumindia.org" },
        { name: "National Coalition for Education (NCE India)", url: "https://www.nceindia.org" },
        { name: "Pratham (Community Programs)", url: "https://www.pratham.org" },
      ],
    },
  ];
  res.json(ListFundingMechanismsResponse.parse(mechanisms));
});

export default router;
