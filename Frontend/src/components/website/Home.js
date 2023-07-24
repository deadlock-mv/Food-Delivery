import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="container-mt-4 ms-5 me-5">    
        {/* Cuisines */}
        <h3 className="pb-1 mb-4">Cuisines</h3>
        <div className="row">
            <div className="col-md-3 ">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/1'><img src="chinese.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/1'>Chinese</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/2'><img src="south.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/2'>South Indian</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/3'><img src="punjabi.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/3'>Punjabi</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/4'><img src="italian.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/4'>Italian</Link></h5>
                </div>
            </div>
        </div>
        {/* End Cuisines */}

        {/* Popular Dishes */}
        <div className="row">
        <h3 className="pb-1 mb-4 mt-5">Popular Dishes</h3>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/1'><img src="chinese.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/1'>Chinese</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/2'><img src="south.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/2'>South Indian</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/3'><img src="punjabi.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/3'>Punjabi</Link></h5>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card text-bg-dark" style={{boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}>
                    <Link to='/detail/4'><img src="italian.jpg" className="card-img" alt="..."/></Link>
                    <h5 className="card-title"><Link to='/detail/4'>Italian</Link></h5>
                </div>
            </div>
        </div>
        {/* End Popular Dishes */}

    </div>
  );
}

export default Home;