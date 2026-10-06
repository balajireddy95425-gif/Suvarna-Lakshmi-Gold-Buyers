import Service from "../components/Service";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="page-content">

      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>

          <p>
            Convenient gold buying and valuation services
            designed for a simple customer experience.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container">

          <div className="section-heading">
            <span>WHAT WE OFFER</span>

            <h2>
              Gold Buying & Valuation Services
            </h2>

            <p>
              Click any service below to learn more about
              how we can assist you.
            </p>
          </div>

          <div className="row g-4">

            {/* Gold Buying */}
            <div className="col-md-6 col-lg-4">
              <Service
                icon="💰"
                title="Gold Buying"
                description="Sell your old, unused or unwanted gold jewellery through a simple evaluation process."
                details={[
                  {
                    heading: "What We Offer",
                    text:
                      "We assist customers who wish to sell old, unused or unwanted gold jewellery."
                  },
                  {
                    heading: "Evaluation Process",
                    text:
                      "The gold item can be physically examined and evaluated based on relevant factors such as purity and weight."
                  },
                  {
                    heading: "Final Valuation",
                    text:
                      "The final value is determined after physical evaluation and verification of the gold item."
                  }
                ]}
              />
            </div>

            {/* Gold Evaluation */}
            <div className="col-md-6 col-lg-4">
              <Service
                icon="⚖️"
                title="Gold Evaluation"
                description="Understand how purity and weight are considered during the evaluation of your gold."
                details={[
                  {
                    heading: "Purity Verification",
                    text:
                      "Gold purity is an important factor when evaluating a jewellery item."
                  },
                  {
                    heading: "Weight Verification",
                    text:
                      "Accurate weighing helps determine the quantity of gold being evaluated."
                  },
                  {
                    heading: "Physical Assessment",
                    text:
                      "A physical assessment helps verify the details needed for the final valuation."
                  }
                ]}
              />
            </div>

            {/* Market Rate */}
            <div className="col-md-6 col-lg-4">
              <Service
                icon="📈"
                title="Market Rate Based Valuation"
                description="Understand how the applicable gold buying rate can be considered along with purity and weight."
                details={[
                  {
                    heading: "Applicable Gold Rate",
                    text:
                      "The applicable gold buying rate is one part of the valuation calculation."
                  },
                  {
                    heading: "Combined Calculation",
                    text:
                      "The rate is considered together with verified purity and weight."
                  },
                  {
                    heading: "Indicative Value",
                    text:
                      "Online calculations can provide an indicative estimate, while the final amount depends on physical verification."
                  }
                ]}
              />
            </div>

            {/* Gold Calculator */}
            <div className="col-md-6 col-lg-4">
              <Service
                icon="🧮"
                title="Gold Value Calculator"
                description="Use our online calculator to get an indicative estimate based on gold purity, weight and available rate."
                details={[
                  {
                    heading: "Select Purity",
                    text:
                      "Choose the applicable gold purity such as 24K, 22K or 18K."
                  },
                  {
                    heading: "Enter Weight",
                    text:
                      "Enter the approximate weight of your gold in grams."
                  },
                  {
                    heading: "Get an Estimate",
                    text:
                      "The calculator provides an indicative value using the available gold buying rate."
                  }
                ]}
              />
            </div>

            {/* Customer Enquiry */}
            <div className="col-md-6 col-lg-4">
              <Service
                icon="📞"
                title="Customer Enquiry"
                description="Send your enquiry through our website and our team can contact you for further assistance."
                details={[
                  {
                    heading: "Submit Your Details",
                    text:
                      "Enter your name, phone number and other requested information through the enquiry form."
                  },
                  {
                    heading: "Share Your Requirement",
                    text:
                      "Tell us whether you need information about gold selling, valuation or another service."
                  },
                  {
                    heading: "Team Follow-Up",
                    text:
                      "Your submitted enquiry can be reviewed by the team for follow-up."
                  }
                ]}
              />
            </div>

            {/* Branch Assistance */}
            <div className="col-md-6 col-lg-4">
              <Service
                icon="🏪"
                title="Branch Assistance"
                description="Visit our branch to discuss your gold-selling requirements and continue with physical evaluation."
                details={[
                  {
                    heading: "Visit the Branch",
                    text:
                      "Customers can visit the branch to discuss their gold-selling requirements."
                  },
                  {
                    heading: "Physical Evaluation",
                    text:
                      "Gold can be physically examined and verified as part of the valuation process."
                  },
                  {
                    heading: "Further Assistance",
                    text:
                      "Our team can explain the valuation process and help with your enquiry."
                  }
                ]}
              />
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">

          <h2>
            Ready to Know Your Gold Value?
          </h2>

          <p>
            Use our calculator or contact us for
            further assistance.
          </p>

          <div className="mt-4">

            <Link
              to="/calculator"
              className="btn btn-warning me-2"
            >
              Calculate Value
            </Link>

            <Link
              to="/contact"
              className="btn btn-outline-light"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Services;