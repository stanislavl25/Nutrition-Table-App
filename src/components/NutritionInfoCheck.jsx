import React from "react";
import NutritionInfoEU from "./NutritionInfoEU";
import NutritionInfoCA from "./NutritionInfoCA";
import NutritionInfoNA from "./NutritionInfoNA";
function NutritionInfoCheck({
  locationPlan,
  formValues,
  setFormValues,
  formLables,
  handleOrderChange,
  newFormSet,
}) {
  return (
    <div>
      {/* {locationPlan.location === "EU" ? ( */}
      <NutritionInfoEU
        formValues={formValues}
        setFormValues={setFormValues}
        formLables={
          locationPlan.location === "EU"
            ? formLables.formLablesEU
            : formLables.formLablesCA_NA
        }
        handleOrderChange={handleOrderChange}
        newFormSet={newFormSet}
      />
      {/* ) : (
        <></>
      )}
      {locationPlan.location === "CA" ? <NutritionInfoCA /> : <></>}
      {locationPlan.location === "NA" ? <NutritionInfoNA /> : <></>} */}
    </div>
  );
}

export default NutritionInfoCheck;
