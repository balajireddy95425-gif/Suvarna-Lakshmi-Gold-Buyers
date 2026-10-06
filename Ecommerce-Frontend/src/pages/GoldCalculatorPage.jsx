import GoldCalculator from "../components/GoldCalculator";

function GoldCalculatorPage() {
  return (
    <div className="page-content">

      {/* Header */}
      <section className="page-header">
        <div className="container">

          <h1>
            Gold Calculator
          </h1>

          <p>
            Estimate the value of your gold.
          </p>

        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding">
        <div className="container">

          <div className="section-heading">
            <span>Calculate</span>

            <h2>
              Estimate Your Gold Value
            </h2>

            <p>
              Select the purity and enter the weight
              of your gold.
            </p>
          </div>

          <div className="row justify-content-center">

            <div className="col-lg-8">
              <GoldCalculator />
            </div>

          </div>

          <div className="calculator-note mt-4 mx-auto">
            <strong>Important:</strong> The calculator
            provides an approximate value based on the
            selected rate. The final value may differ
            after physical evaluation of the gold.
          </div>

        </div>
      </section>

    </div>
  );
}

export default GoldCalculatorPage;