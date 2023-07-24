import Card from 'react-bootstrap/Card';

function NotFound() {
    return (
        <div className='d-flex justify-content-center' >
        <Card style={{width:"500px",boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"}}className="bg-dark text-dark mt-5 d-flex justify-content-center">
          <Card.Img src="/404_not_found.gif" alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title>404 Not Found</Card.Title>
          </Card.ImgOverlay>
        </Card>
        </div>
      );

}

export default NotFound;