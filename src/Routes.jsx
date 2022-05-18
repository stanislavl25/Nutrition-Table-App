// import React from "react";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// // import { Switch } from "react-router-dom";
// import { ClientRouter, RoutePropagator } from "@shopify/app-bridge-react";
// // import CustomFieldsPage from "./components/CustomFieldsPage";
// import { useRoutePropagation } from "@shopify/app-bridge-react";
// import { useClientRouting } from "@shopify/app-bridge-react";
// import MyLables from "./components/MyLables";
// import CreateLabel from "./components/CreateLabel";
// import LanguagePage from "./components/Language";
// import { withRouter } from "./RoutePropagator";

// function RoutesComponent(props) {
//   const { history, location } = props;
//   useRoutePropagation(location);
//   useClientRouting(history);
//   console.log("working");
//   return (
//     <BrowserRouter>
//       <ClientRouter history={history} />
//       <RoutePropagator location={location} />
//       <Routes>
//         <Route path="/MyLables" element={<MyLables />} />
//         <Route path="/CreateLabel" element={<CreateLabel />} />
//         <Route path="/LanguagePage" element={<LanguagePage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default withRouter(RoutesComponent);
