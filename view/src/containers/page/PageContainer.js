//-------------------------- Import Modules --------------------------


// ----------------------- Import components -----------------------
import Page from "../../components/page/Page";
import usePageStates from "./pageStates";
import usePageHandlers from "./pageHandlers";
import usePageData from "./pageData";
import usePageEffect from "./pageEffect";


// ----------------------- Page Container -----------------------
const PageContainer = () => {

  //Component States
  const pageStates = usePageStates();
  //Component Handlers
  const pageHandlers = usePageHandlers();
  //Component Data
  const pageData = usePageData(pageHandlers);
  //Component Effect
  usePageEffect();

  return (
    <Page {...pageData} />
  );
};

export default PageContainer;