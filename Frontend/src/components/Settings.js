import { Link } from "react-router-dom";


function Settings(){
    return(
        // <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
        <body>
        <div className="main-content">
          <div className="container mt-7">
            {/* <!-- Table --> */}
            <h2 className="mb-5">My Account Card</h2>
            <div className="row">
              <div className="col-xl-8 m-auto order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">My account</h3>
                      </div>
                      
                    </div>
                  </div>
                  <div className="card-body">
                    <form>
                      <h6 className="heading-small text-muted mb-4">User information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" for="input-username">Username</label>
                              <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" for="input-email">Email address</label>
                              <input type="email" id="input-email" className="form-control form-control-alternative" placeholder="abc@example.com"/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" for="input-first-name">First name</label>
                              <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" for="input-last-name">Last name</label>
                              <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4"/>
                      {/* <!-- Address --> */}
                      <h6 className="heading-small text-muted mb-4">Contact information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group focused">
                              <label className="form-control-label" for="input-address">Address</label>
                              <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" type="text"/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group focused">
                              <label className="form-control-label" for="input-city">City</label>
                              <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group focused">
                              <label className="form-control-label" for="input-country">Country</label>
                              <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country"/>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label className="form-control-label" for="input-country">Postal code</label>
                              <input type="number" id="input-postal-code" className="form-control form-control-alternative" placeholder="Postal code"/>
                            </div>
                          </div>
                        </div>
                      </div>
            
                      <hr className="my-4"/>
                      {/* <!-- Description --> */}
                      <h6 className="heading-small text-muted mb-4">About me</h6>
                      <div className="pl-lg-4">
                        <div className="form-group focused">
                          <label>About Me</label>
                          <textarea rows="4" className="form-control form-control-alternative" placeholder="A few words about you ..."></textarea>
                        </div>
                      </div>
                      
                    </form>
                  </div>
                  <div className="text-center mb-3">
                        <a href="#!" className="btn btn-sm btn-primary">Update</a>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>    
        
    );
}

export default Settings;