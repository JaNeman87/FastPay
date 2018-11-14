import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { withNavigation } from "react-navigation";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { connect } from "react-redux";
import { deleteArticleInCart } from "../../store/actions/actionTypes";
import { Fonts } from "../../Utility/Fonts";

class CartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    // const { navigation } = this.props;
    // const total = navigation.getParam("totalPrice", "Nedostupno");
    // const articleToCart = navigation.getParam("articleToCart", "Nedostupno");
    // const deletee = navigation.getParam("deletee", "Nedostupno");

    let articleOutput = this.props.article.map((article, i) => (
      <TouchableOpacity key={i} onPress={() => this.props.deleteArticle(i)}>
        <View style={styles.article}>
          <Text style={styles.text}>{article}</Text>
        </View>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.qr}>
        <View style={{ flex: 9 }}>
          <ScrollView>
            <View>{articleOutput}</View>
          </ScrollView>
        </View>
        <View style={styles.info}>
          <View style={styles.total}>
            <Text style={styles.text}>
              Ukupno: {this.props.totalPrice.reduce((a, b) => a + b, 0)} DIN
            </Text>
          </View>
          {/* <View style={styles.total}>
            <Text style={styles.text}>{articleToCart}</Text>
          </View> */}
        </View>

        <View style={styles.buttons}>
          <CustomButton
            color="#1DA1F2"
            width={150}
            onPress={() => this.props.navigation.goBack()}
          >
            Nazad
          </CustomButton>

          <CustomButton color="#1DA1F2" width={150} onPress={() => {}}>
            Kupi
          </CustomButton>
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
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 5,
    height: "10%"
  },

  info: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    height: "90%"
  },
  text: {
    fontSize: 20,
    color: "#1DA1F2",
    fontFamily: Fonts.PTSerifIta
  },

  total: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1DA1F2",
    padding: 10,
    borderRadius: 10
  },
  article: {
    flexDirection: "column",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1DA1F2",
    borderRadius: 10,
    margin: 2
  }
});

const mapStateToProps = state => {
  return {
    totalPrice: state.cartTotalSum,
    article: state.cartArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteArticle: id => dispatch(deleteArticleInCart(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);
