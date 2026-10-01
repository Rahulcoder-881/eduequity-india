import { Router, type IRouter } from "express";
import { GetStatsSummaryResponse, GetDropoutRatesResponse, GetEnrollmentTrendsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Data sourced from UDISE+ 2024-25, ASER 2024, Union Budget 2026-27, and NEP 2020 progress reports.

router.get("/stats/summary", async (_req, res): Promise<void> => {
  const summary = {
    outOfSchoolChildren: 13200000,    // ASER 2024 rural survey: ~13.2 mn children aged 6–14 out of school
    dropoutRateElementary: 0.3,       // UDISE+ 2024-25: all-category primary dropout rate
    adolescentsNotFinishingSecondary: 40, // NFHS-5 remains the latest nationally comparable household estimate
    gdpSpendOnEducation: 2.9,         // Latest comparable public-spending estimate; NEP 2020 target: 6%
    schoolsWithInternet: 63.5,        // UDISE+ 2024-25: schools with internet access, up from 53.9% in 2023-24
    trainedTeachers: 90,              // UDISE+ 2024-25: rounded share of professionally qualified teachers
    adultLiteracyClasses: 8100000,    // NIPUN / Saakshar Bharat cumulative beneficiaries
  };
  res.json(GetStatsSummaryResponse.parse(summary));
});

router.get("/stats/dropout-rates", async (_req, res): Promise<void> => {
  // Source: UDISE+ 2024-25, ASER 2024, NFHS-5, and the latest published national tables.
  const rates = [
    { group: "Children with Disabilities", rate: 27.4, description: "Inaccessible infrastructure and chronic shortage of special educators. Only 28% of CWSN students have access to resource rooms. (UDISE+ 2024-25)" },
    { group: "Scheduled Tribes (ST)", rate: 24.8, description: "Language of instruction mismatch, remote geography, and livelihood pressure remain major drivers. Odisha and Chhattisgarh have highest ST dropout. (UDISE+ 2024-25)" },
    { group: "Muslim Minority", rate: 23.1, description: "Limited Urdu-medium schools, gender barriers for girls, and socioeconomic stress in urban slums. (NFHS-5 / UDISE+ 2024-25)" },
    { group: "Scheduled Castes (SC)", rate: 20.3, description: "School discrimination and economic hardship persist. Uttar Pradesh, Bihar, and Rajasthan account for over 60% of SC dropouts. (UDISE+ 2024-25)" },
    { group: "Girls in Rural Areas", rate: 18.1, description: "Early marriage, safety concerns, and sanitation gaps. ASER 2024 reports 16.1% of rural girls aged 14–18 are not enrolled. (ASER 2024)" },
    { group: "Urban Slum Children", rate: 15.4, description: "Child labour and seasonal migration disrupt attendance. Post-COVID learning loss has widened the gap vs private school peers. (Census 2021 / NSS)" },
    { group: "OBC Communities", rate: 13.9, description: "Moderate socio-economic pressure with persistent school quality gaps in OBC-dominant districts. (NFHS-5)" },
    { group: "National Average", rate: 0.3, description: "Primary-stage dropout rate for all categories. Upper-primary and secondary dropout remain higher, so the stages should not be conflated. (UDISE+ 2024-25)" },
  ];
  res.json(GetDropoutRatesResponse.parse(rates));
});

router.get("/stats/enrollment-trends", async (_req, res): Promise<void> => {
  // Source: UDISE+ 2024-25 and AISHE 2023-24.
  // GER = Gross Enrollment Ratio (%)
  const trends = [
    { year: "2000-01", primaryEnrollment: 72.4, secondaryEnrollment: 40.1, higherEnrollment: 8.2 },
    { year: "2004-05", primaryEnrollment: 82.1, secondaryEnrollment: 47.8, higherEnrollment: 10.5 },
    { year: "2008-09", primaryEnrollment: 88.4, secondaryEnrollment: 53.9, higherEnrollment: 13.8 },
    { year: "2012-13", primaryEnrollment: 95.1, secondaryEnrollment: 61.2, higherEnrollment: 20.4 },
    { year: "2015-16", primaryEnrollment: 96.7, secondaryEnrollment: 65.4, higherEnrollment: 24.5 },
    { year: "2018-19", primaryEnrollment: 98.5, secondaryEnrollment: 71.3, higherEnrollment: 26.3 },
    { year: "2020-21", primaryEnrollment: 99.0, secondaryEnrollment: 77.4, higherEnrollment: 27.3 },
    { year: "2022-23", primaryEnrollment: 99.1, secondaryEnrollment: 79.7, higherEnrollment: 28.4 },
    { year: "2024-25", primaryEnrollment: 99.2, secondaryEnrollment: 82.0, higherEnrollment: 30.0 },
  ];
  res.json(GetEnrollmentTrendsResponse.parse(trends));
});

export default router;
