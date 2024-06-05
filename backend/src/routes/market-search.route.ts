import { Router } from "express";
import { marketSearch } from "../controllers/market-search";

const marketSearchRouter = Router();

//Post request to search for market
marketSearchRouter.post('/search', marketSearch);

export default marketSearchRouter;