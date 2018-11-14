import React, { Component } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { connect } from "react-redux";

import BarcodeScanner, {
  Exception,
  FocusMode,
  CameraFillMode,
  FlashMode,
  BarcodeType,
  pauseScanner,
  resumeScanner
} from "react-native-barcode-scanner-google";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import { article } from "../../store/actions/actionTypes";

class QRscanner extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  static navigationOptions = {
    header: null
  };

  qrCodeOnReadHandler = ({ data }) => {
    if (!this.props.navigation.isFocused()) {
      return;
    }

    fetch(data)
      .then(response => response.json())
      .then(json => {
        console.log(json),
          this.props.onQRRead(
            json[0],
            json[1],
            json[2],
            json[3],
            json[4],
            json[5]
          );
        // this.props.navigation.navigate("InfoScreen");
      })
      .catch(err => {
        alert("Nesto nije u redu. Pokusajte ponovo!");
        console.log(err);
      })
      .then(response => {
        this.props.navigation.navigate("InfoScreen");
      });
  };

  signOutHandler = () => {
    const { navigation } = this.props;
    const onPress = navigation.getParam("onPress", "Nedostupno");
    onPress();
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CustomButton
          color="#1DA1F2"
          width={"20%"}
          onPress={this.signOutHandler}
        >
          Log Out
        </CustomButton>
        <BarcodeScanner
          style={styles.qr}
          onBarcodeRead={this.qrCodeOnReadHandler}
          focusMode={FocusMode.AUTO}
          cameraFillMode={CameraFillMode.FIT}
          barcodeType={
            BarcodeType.CODE_128 |
            BarcodeType.EAN_13 |
            BarcodeType.EAN_8 |
            BarcodeType.QR_CODE
          }
          FlashMode={FlashMode.OFF}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  qr: {
    flex: 1,
    backgroundColor: "white"
  }
});

const mapStateToProps = state => {
  return {
    art: state.articles.article
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onQRRead: (art, brnd, typ, qtity, prc, iurl) =>
      dispatch(article(art, brnd, typ, qtity, prc, iurl))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRscanner);
