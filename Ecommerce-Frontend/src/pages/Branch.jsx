import Branch from "../components/Branch";

function BranchPage() {
  return (
    <div className="page-content">

      {/* Header */}
      <section className="page-header">
        <div className="container">

          <h1>
            Our Branch
          </h1>

          <p>
            Visit Suvarna Lakshmi Gold Buyers.
          </p>

        </div>
      </section>

      {/* Branch */}
      <section className="section-padding">
        <div className="container">

          <div className="section-heading">
            <span>Visit Us</span>

            <h2>
              Suvarna Lakshmi Gold Buyers
            </h2>

            <p>
              Our current branch information.
            </p>
          </div>

          <div className="row justify-content-center">

            <div className="col-lg-7">
              <Branch />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default BranchPage;