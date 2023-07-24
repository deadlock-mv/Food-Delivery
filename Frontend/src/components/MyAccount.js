// import './CSS/MyAccount.css';

function MyAccount() {
    return(
        <div className="wrapper">
        <div className="container">
            <img src="https://i.imgur.com/fR2RIvG.jpg" alt="" className="profile-img"/>
            
            <div className="content">
            <div className="sub-content">
                <h1>BhaiSahab</h1>
                <span>@MerabhaiSexy</span>
                <p>Professional Playboy</p>
                <span className="location"><i className="fa fa-map-marker" aria-hidden="true"></i>Nepal</span>
                <a href="http://www.rogerfederer.com/">GuptaJi</a>
            </div>
            <div className="data">
                <div className="inner-data">
                <span><i className="fa fa-users" aria-hidden="true"></i></span>
                <p>11M</p>
                </div>
                <div className="inner-data">
                <span><i className="fa fa-twitter-square" aria-hidden="true"></i></span>
                <p>1,470</p>
                </div>
                <div className="inner-data">
                <span><i className="fa fa-user-plus" aria-hidden="true"></i></span>
                <p>80</p>
                </div>
            </div>
            <div className="btn">follow me</div>
            </div>
        </div>
        </div>
      
    );
}

export default MyAccount;