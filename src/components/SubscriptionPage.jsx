import React from "react";
import "../assets/subscriptionPage.css";
export function SubscriptionPage() {
  return (
    <div className="pricingTbles_container">
      <div className="pricing-table">
        <div>
          <div>
            <div className="price-header">
              <h3 className="title">Basic plan</h3>
            </div>
            <div className="price">
              <span className="dollar">$</span>5
              <span className="month">/Mo</span>
            </div>
            <div className="price-body">
              <ul className="ul">
                <li className="li">
                  <b>No more</b> than 999 products.
                </li>
                <li className="li">
                  <b>European and American</b> Styles table
                </li>
                <li className="li">
                  <b>Unlimited</b> Security Service
                </li>
                <li className="li">
                  <b>Bulk edit add</b> and delete of data
                </li>
              </ul>
            </div>
            <div className="price-footer">
              <a className="order-btn" href="">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="pricing-table">
          <div className="price-header">
            <h3 className="title">Advanced</h3>
          </div>
          <div className="price">
            <span className="dollar">$</span>
            20
            <span className="month">/Mo</span>
          </div>
          <div>
            <ul className="ul">
              <li className="li">
                <b> No more </b>than 999 products.
              </li>
              <li className="li">
                <b>Add custom </b> fields to the table
              </li>
              <li className="li">
                <b> Custom editing </b>of the serving %es.
              </li>
              <li className="li">
                <b>1x</b> Dashboard Access
              </li>
              <li className="li">
                <b> % from the recommended</b> daily intake per Serving
              </li>
            </ul>
          </div>
          <div className="price-footer ">
            <a className="order-btn" href="">
              Buy Now
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className=" pricing-table">
          <div className="price-header">
            <h3 className="title">Enterprise</h3>
          </div>
          <div className="price">
            <span className="dollar">$</span>
            100
            <span className="month">/Mo</span>
          </div>
          <div>
            <ul className="ul">
              <li className="li">
                <b> Same functions</b> as the advanced plan
              </li>
              <li className="li">
                <b>more</b> then 1000 products
              </li>
            </ul>
          </div>
          <div className="price-footer">
            <a className="order-btn" href="">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
