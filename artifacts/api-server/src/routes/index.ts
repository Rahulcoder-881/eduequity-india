import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import barriersRouter from "./barriers";
import interventionsRouter from "./interventions";
import caseStudiesRouter from "./case-studies";
import fundingRouter from "./funding";
import donateRouter from "./donate";
import stateStatsRouter from "./state-stats";
import institutionsRouter from "./institutions";
import examsRouter from "./exams";

const router: IRouter = Router();

function staticCache(maxAgeSeconds: number) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.set("Cache-Control", `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 2}`);
    next();
  };
}

const ONE_HOUR = 3600;
const ONE_DAY = 86400;

router.use(healthRouter);
router.use(staticCache(ONE_HOUR), statsRouter);
router.use(staticCache(ONE_DAY), stateStatsRouter);
router.use(staticCache(ONE_DAY), institutionsRouter);
router.use(staticCache(ONE_DAY), examsRouter);
router.use(staticCache(ONE_DAY), barriersRouter);
router.use(staticCache(ONE_DAY), interventionsRouter);
router.use(staticCache(ONE_DAY), caseStudiesRouter);
router.use(staticCache(ONE_DAY), fundingRouter);
router.use(donateRouter);

export default router;
