import React from "react";
import PromoCard from "../../base/PromoCard/PromoCard";

const PromoCardWraper: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <PromoCard
        image="" 
        title="Fresh Fruits"
        subtitle="Healthy Products"
        discountText="30% off sale Hurry up!!!"
        buttonText="Shop now"
      />
    </div>
  );
};

export default PromoCardWraper;
