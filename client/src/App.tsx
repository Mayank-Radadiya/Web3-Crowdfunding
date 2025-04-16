import { Route, Routes, useLocation } from "react-router-dom";
import {
  CampaignDetails,
  CreateCampaign,
  Home,
  Profile,
  LandingPage,
} from "./pages";
import { Navbar, Sidebar } from "./components/index";

export function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/landing";

  return (
    <>
      <div className={`relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row`}>
        {!isLandingPage && (
          <div className="sm:flex hidden mr-10 relative">
            <Sidebar />
          </div>
        )}

        <div
          className={`flex-1 max-sm:w-full  mx-auto ${
            !isLandingPage ? "sm:pr-5 max-w-[1280px]" : "w-full scroll-smooth "
          }`}
        >
          {!isLandingPage && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
