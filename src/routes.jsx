import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Resume from "./pages/Resume.jsx";
import Archive from "./pages/Archive.jsx";
import SmartParking from "./pages/SmartParking.jsx";
import Workshop from "./pages/Workshop.jsx";
import LabPage from "./pages/LabPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SIH2019 from "./pages/certificates/SIH2019.jsx";
import IITBombay from "./pages/certificates/IITBombay.jsx";
import IITGuwahati from "./pages/certificates/IITGuwahati.jsx";
import VNIT from "./pages/certificates/VNIT.jsx";

/* Every path here is prerendered to real HTML at build time, so the site
   still reads and indexes without JavaScript. */
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "resume", element: <Resume /> },
      { path: "archive", element: <Archive /> },

      { path: "work/smart-parking", element: <SmartParking /> },
      { path: "events/robotics-workshop", element: <Workshop /> },

      { path: "lab/flappy-bird", element: <LabPage slug="flappy-bird" /> },
      { path: "lab/maze-solver", element: <LabPage slug="maze-solver" /> },
      { path: "lab/smart-rockets", element: <LabPage slug="smart-rockets" /> },
      { path: "lab/snake", element: <LabPage slug="snake" /> },

      { path: "credentials/sih-2019", element: <SIH2019 /> },
      { path: "credentials/iit-bombay", element: <IITBombay /> },
      { path: "credentials/iit-guwahati", element: <IITGuwahati /> },
      { path: "credentials/vnit", element: <VNIT /> },

      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> }
    ]
  }
];

export default routes;
