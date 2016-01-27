var React = require('react'),
    ApiUtil = require('../util/api_util'),
    RestaurantStore = require('../stores/restaurantStore');


var CityIndexItem = React.createClass({
  getInitialState: function () {
    return { restaurants: {} };
  },

  _onChange: function () {
    this.setState({ restaurants: RestaurantStore.all() });
  },

  componentDidMount: function () {
    this.token = RestaurantStore.addListener(this._onChange);
    ApiUtil.fetchRestaurants(this.props.params.city_id);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  render: function () {
    var restaurantCount = this.props.location.state.count;

    var list = Object.keys(this.state.restaurants).map(function (key) {
      var restaurant = this.state.restaurants[key].restaurant,
          name = restaurant.name,
          address = restaurant.address;

      var priceCt = parseInt(restaurant.price);
      var pricing = [];
      for (var i = 0; i < 4; i++) {
        var klass;
        if (priceCt > 0) {
          klass = "selected";
        } else {
          klass = "";
        }
        pricing.push(<span key={i} className={klass}>$</span>);
        priceCt--;
      }

      return (
        <li className="restaurant-item group" key={key}>
          <img className="restaurant-item-photo" src="http://placehold.it/80x80"/>
          <div className="restaurant-item-details">
            <h3 className="restaurant-item-name">{name}</h3>
            <span className="restaurant-item-address">{address}</span>
          </div>
          <div className="price">{pricing}</div>
        </li>
      );
    }.bind(this));

    return(
      <div className="restaurant-list-container">
        <h2 className="restaurant-count">{restaurantCount} tables available</h2>
        <ul className="restaurant-list">{list}</ul>
      </div>
    );
  }
});

module.exports = CityIndexItem;
