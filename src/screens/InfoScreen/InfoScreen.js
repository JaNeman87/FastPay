import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { connect } from "react-redux";
import { priceToCart, articleToCart } from "../../store/actions/actionTypes";
import { Fonts } from "../../Utility/Fonts";
class InfoScreen extends Component {
  state = {
    resStyles: {
      imageFlex: Dimensions.get("window").height > 500 ? "column" : "row",
      imageHeight: Dimensions.get("window").height > 500 ? "50%" : "100%",
      infoHeight: Dimensions.get("window").height > 500 ? "50%" : "100%",
      infoWidth: Dimensions.get("window").height > 500 ? "100%" : "50%"
    },
    mounted: false
  };

  updateDimensions = () => {
    this.setState({
      resStyles: {
        imageFlex: Dimensions.get("window").height > 500 ? "column" : "row",
        imageHeight: Dimensions.get("window").height > 500 ? "50%" : "100%",
        infoHeight: Dimensions.get("window").height > 500 ? "50%" : "100%",
        infoWidth: Dimensions.get("window").height > 500 ? "100%" : "50%"
      }
    });
  };

  componentWillUnmount() {
    console.log("Unmounted");
    Dimensions.removeEventListener("change", this.updateDimensions);
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  static navigationOptions = {
    header: null
  };

  addToCartHandler = () => {
    this.props.articleToCart(
      this.props.brand,
      this.props.type,
      this.props.quantity,
      this.props.price
    );
  };

  goBackHandler = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.qr}>
        <View
          style={{
            flexDirection: this.state.resStyles.imageFlex,
            flex: 1,
            height: this.state.resStyles.imageHeight,
            justifyContent: "center"
          }}
        >
          <View style={styles.image}>
            <Image
              source={{
                uri: this.props.imageUrl
              }}
              style={{
                width: 300,
                height: 300
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              height: this.state.resStyles.infoHeight,
              width: this.state.resStyles.infoWidth
            }}
          >
            <View style={styles.info}>
              <Text style={styles.text}>Proizvod: {this.props.article}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Proizvodjac: {this.props.brand}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Vrsta: {this.props.type}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Kolicina: {this.props.quantity} </Text>
            </View>
            <View style={styles.info1}>
              <Text style={styles.text}>Cena: {this.props.price} DIN</Text>
            </View>

            <View style={styles.buttons}>
              <CustomButton color="#1DA1F2" onPress={this.goBackHandler}>
                Nazad
              </CustomButton>

              <CustomButton color="#1DA1F2" onPress={this.addToCartHandler}>
                Dodaj u Korpu
              </CustomButton>

              <CustomButton
                color="#1DA1F2"
                onPress={() => this.props.navigation.navigate("CartScreen")}
              >
                Korpa
              </CustomButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  qr: {
    flex: 1,
    backgroundColor: "white"
  },

  buttons: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    // marginBottom: 15,
    marginTop: 10,

    width: "100%"
  },
  button: {
    margin: 5
  },
  info: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1DA1F2",
    borderRadius: 10,
    margin: 2
  },
  info1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1DA1F2",
    borderRadius: 10,

    margin: 2
  },
  text: {
    fontSize: 20,
    color: "#1DA1F2",
    fontFamily: Fonts.PTSerifIta
  },
  textStyle: {
    fontSize: 20,
    textAlign: "center"
  },

  buttonStyle: {
    padding: 10,
    borderColor: "#1DA1F2",

    borderRadius: 15,
    margin: 5
  },
  image: {
    borderWidth: 1,
    borderColor: "#1DA1F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 3
  }
});

const mapStateToProps = state => {
  return {
    article: state.articles.article,
    brand: state.articles.brand,
    type: state.articles.type,
    quantity: state.articles.quantity,
    price: state.articles.price,
    imageUrl: state.articles.imageUrl,
    totalSum: state.cartTotalSum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: totalSum => dispatch(priceToCart(totalSum)),
    articleToCart: (brnd, typ, qtity, prc) =>
      dispatch(articleToCart(brnd, typ, qtity, prc))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(InfoScreen));
