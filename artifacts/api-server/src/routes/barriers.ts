import { Router, type IRouter } from "express";
import { ListBarriersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/barriers", async (_req, res): Promise<void> => {
  const barriers = [
    {
      id: 1,
      category: "Economic",
      title: "Poverty and Child Labour",
      description: "Poverty forces children into labour or prevents families from affording uniforms, books, and indirect costs of schooling. Low-income and landless families have far higher dropout rates. Even 'free' education has hidden costs that price out the poorest.",
      affectedGroups: ["Rural poor", "Urban slum children", "Landless labourers", "SC/ST families"],
      severity: "critical" as const,
    },
    {
      id: 2,
      category: "Economic",
      title: "Low Government Spending",
      description: "India's latest comparable public-spending estimate remains well below the NEP 2020 target of 6% of GDP. State budgets often favor urban schools, leaving marginalized rural areas underfunded. Per-student spending remains uneven across states.",
      affectedGroups: ["Rural school children", "Government school students"],
      severity: "high" as const,
    },
    {
      id: 3,
      category: "Social & Cultural",
      title: "Gender Discrimination and Early Marriage",
      description: "Gender norms in conservative communities hinder girls' education. Early marriage, safety concerns, long distances to school, and lack of menstrual hygiene resources cause high female dropout rates. Girls are deprioritized when family resources are scarce.",
      affectedGroups: ["Girls", "Adolescent females", "Rural girls"],
      severity: "critical" as const,
    },
    {
      id: 4,
      category: "Social & Cultural",
      title: "Caste and Community Discrimination",
      description: "SC, ST, and other minority children often attend poorer-quality schools and face discrimination from peers and teachers. Studies show high attrition among low-caste and Muslim students, driven by hostile school environments and lack of representation.",
      affectedGroups: ["Scheduled Castes", "Scheduled Tribes", "Muslim minority", "OBC communities"],
      severity: "critical" as const,
    },
    {
      id: 5,
      category: "Social & Cultural",
      title: "Language Barriers",
      description: "UNESCO data shows 40% of Indian children do not learn in their mother tongue. Tribal communities often cannot follow instruction in Hindi or a state language, leading to early comprehension failure and eventual dropout. Linguistic exclusion is a critical hidden barrier.",
      affectedGroups: ["Tribal children", "Linguistic minorities", "Northeastern communities"],
      severity: "high" as const,
    },
    {
      id: 6,
      category: "Geographic",
      title: "Remote and Rural Access",
      description: "Thousands of villages lack a proximate school, forcing children to travel long distances or leave school entirely. Hilly terrain, forest regions, and conflict-affected areas (Kashmir, Naxal-affected zones) see frequent school closures and teacher absenteeism.",
      affectedGroups: ["Rural children", "Hill tribe children", "Children in conflict zones"],
      severity: "high" as const,
    },
    {
      id: 7,
      category: "Geographic",
      title: "Seasonal Migration",
      description: "Migrant families following agricultural or construction work cycles disrupt their children's schooling repeatedly. Children of sugarcane cutters in Maharashtra, brick kiln workers, and seasonal labourers are among the most affected, losing months of schooling annually.",
      affectedGroups: ["Migrant worker children", "Nomadic communities", "Agricultural laborer families"],
      severity: "medium" as const,
    },
    {
      id: 8,
      category: "Infrastructure",
      title: "Poor School Facilities",
      description: "UDISE+ 2024-25 reports that 63.5% of schools have internet access, while gaps remain in functional toilets, electricity, libraries, and reliable WASH facilities. These gaps are concentrated in remote and disadvantaged communities and directly affect attendance and girls' retention.",
      affectedGroups: ["Girls", "Rural students", "Students with disabilities"],
      severity: "high" as const,
    },
    {
      id: 9,
      category: "Infrastructure",
      title: "Teacher Shortages and Absenteeism",
      description: "Remote areas suffer from severe teacher shortages. Even where teachers are present, multi-grade classrooms with untrained teachers deliver poor-quality education. Teacher absenteeism rates in some states exceed 25%, particularly in Uttar Pradesh, Bihar, and Jharkhand.",
      affectedGroups: ["Rural children", "Tribal children", "Children in BIMARU states"],
      severity: "critical" as const,
    },
    {
      id: 10,
      category: "Policy & Governance",
      title: "Incomplete RTE Implementation",
      description: "While the Right to Education Act guarantees free schooling for ages 6-14, implementation is incomplete. Some states charge indirect fees; enforcement of norms like pupil-teacher ratios and infrastructure standards is weak. Children below 6 and above 14 have no legal guarantee.",
      affectedGroups: ["All unprivileged children", "Children above 14", "ECCE-age children"],
      severity: "high" as const,
    },
    {
      id: 11,
      category: "Policy & Governance",
      title: "Weak Monitoring and Data Gaps",
      description: "Historically inadequate data collection on marginalized groups hampered targeting. While UDISE+ is improving, granular data on learning outcomes for SC/ST/minority children remains sparse. Without good data, policy interventions are poorly targeted.",
      affectedGroups: ["SC/ST children", "Minority groups", "Children with disabilities"],
      severity: "medium" as const,
    },
    {
      id: 12,
      category: "Infrastructure",
      title: "Digital Divide and AI-Era Exclusion",
      description: "UDISE+ 2024-25 shows 63.5% of schools have internet access, but access is not the same as reliable, classroom-ready connectivity. As private school students benefit from AI tutoring tools and digital learning, government school children — overwhelmingly from disadvantaged backgrounds — risk exclusion from the 21st-century skills revolution.",
      affectedGroups: ["Rural children", "Tribal children", "Urban slum students", "Government school students"],
      severity: "critical" as const,
    },
    {
      id: 13,
      category: "Economic",
      title: "Post-COVID Learning Loss",
      description: "ASER 2024 data shows significant but uneven recovery. During COVID school closures (2020–21), Grade 5 children able to read Grade 2 text fell from 55.5% to 42.8% in government schools. By 2024, recovery reached 73.8% overall, but government school children and SC/ST students remain 12–15 percentage points behind private school peers. The COVID gap has become a structural equity gap that conventional schooling alone cannot close.",
      affectedGroups: ["Government school children", "SC/ST students", "Girls in rural areas", "Children without smartphones"],
      severity: "critical" as const,
    },
    {
      id: 14,
      category: "Social & Cultural",
      title: "Mental Health and School Stress",
      description: "A 2023 NCERT survey found that 81% of secondary students reported significant academic stress. Examination pressure, fear of failure, and stigma around learning difficulties cause rising anxiety and school refusal among adolescents. For first-generation learners from marginalized families, this stress is compounded by economic insecurity and family expectations. Counselling services exist in fewer than 8% of government secondary schools.",
      affectedGroups: ["Adolescent students", "First-generation learners", "Girls", "Children from low-income families"],
      severity: "high" as const,
    },
  ];
  res.json(ListBarriersResponse.parse(barriers));
});

export default router;
