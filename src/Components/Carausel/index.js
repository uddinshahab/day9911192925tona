import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from '../Heading';
import './index.scss';
class Carousel extends Component{
    constructor(props){
        super();
        this.state = {
            isLoading: true,
            items: [],
            error: null
          }
    }
    
    componentDidMount() {
        fetch('https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images/list')
          .then(response => response.json())
          .then(data =>
            this.setState({
                items: data,
                isLoading: false,
            })
          )
          .catch(error => this.setState({ error, isLoading: false }));
    }
    render(){
        const { isLoading, items } = this.state;
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 320,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        };
        return (
            <React.Fragment>
                <Heading heading="Images" />
                {!isLoading ? (
                    <Slider {...settings} className="image-carousel">
                        {items.map((user, index) => {
                            const { id, url } = user;
                            return (
                                <div key={id} id={id} onClick={e=>this.props.clickEvent(user)}>
                                    <img src={url} alt="" />
                                </div>
                            );
                        })
                        }
                    </Slider>
                    ) : ( <h3>Loading...</h3>)
                }
            </React.Fragment>
        )
    }
}
export default Carousel;