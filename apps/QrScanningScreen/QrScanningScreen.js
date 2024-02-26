import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import images from '../../assests/index';
import colors from '../config/colors.js';

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    overflow: 'hidden',
  },
  insideContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  angleLeftIcon: {
    width: 30,
    height: 30,
  },
  pageName: {
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: '800',
    alignSelf: 'center',
    color: colors.black,
  },
  pageNameContainer: {
    width: '100%',
    paddingEnd: 50,
  },
  popup: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  popupText: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: colors.red,
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  scanAgainText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
});

const QRCodeScanner = ({ navigation }) => {
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const cameraRef = useRef(null);

  const startScan = () => {
    setScanning(true);
    setScanSuccess(false);
  };

  const stopScan = () => {
    setScanning(false);
  };

  const showSuccessAlert = (data) => {
    setScanSuccess(true);
    setShowPopup(true);
    setScannedData(data);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const showFailureAlert = () => {
    Alert.alert(
      'Failed',
      'Failed to scan QR Code. Please try again.',
      [
        {
          text: 'OK',
          onPress: () => {
            startScan();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const onBarCodeRead = (e) => {
    if (scanning && !scanSuccess) {
      if (e.data) {
        console.log('Scanned data:', e.data);
        stopScan();
        showSuccessAlert(e.data);
      } else {
        showFailureAlert();
      }
    }
  };

  useEffect(() => {
    startScan(); // Start scanning initially
  }, []);

  const handleScanAgain = () => {
    if (cameraRef.current) {
      startScan();
    }
  };

  return (
    <SafeAreaView style={myStyles.container}>
      <View style={myStyles.insideContainer}>
        <View style={myStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.angleLeft} style={myStyles.angleLeftIcon} />
          </TouchableOpacity>
          <View style={myStyles.pageNameContainer}>
            <Text style={myStyles.pageName}>QR Code Scanner</Text>
          </View>
        </View>
      </View>
      <RNCamera
        ref={cameraRef}
        style={myStyles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
      />
      {showPopup && (
        <View style={myStyles.popup}>
          <Text style={myStyles.popupText}>{`Scanned QR Code: ${scannedData}`}</Text>
          <TouchableOpacity style={myStyles.closeButton} onPress={closePopup}>
            <Text style={myStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      {!showPopup && (
        <TouchableOpacity style={myStyles.scanAgainButton} onPress={handleScanAgain}>
          <Text style={myStyles.scanAgainText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default QRCodeScanner;
